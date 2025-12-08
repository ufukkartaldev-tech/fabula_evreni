/**
 * Prediction Service - Hikaye Kehanetleri
 * Firestore işlemleri
 */

import {
    collection,
    doc,
    addDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    increment,
    arrayUnion,
    arrayRemove,
    Timestamp,
    runTransaction
} from 'firebase/firestore';
import { db } from './firebase';
import {
    Prediction,
    PredictionChallenge,
    UserPredictionStats,
    PredictionRank,
    RANK_REQUIREMENTS,
    PREDICTION_BADGES
} from '@/interfaces/Prediction';

/**
 * Yeni tahmin oluştur
 */
export async function createPrediction(
    storyId: string,
    userId: string,
    userName: string,
    userAvatar: string,
    predictionText: string,
    challengeId?: string
): Promise<string> {
    const predictionData: Omit<Prediction, 'id'> = {
        storyId,
        userId,
        userName,
        userAvatar,
        prediction: predictionText,
        status: 'pending',
        points: 0,
        upvotes: 0,
        upvotedBy: [],
        createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'predictions'), predictionData);

    // Challenge varsa, istatistikleri güncelle
    if (challengeId) {
        const challengeRef = doc(db, 'predictionChallenges', challengeId);
        await updateDoc(challengeRef, {
            totalPredictions: increment(1),
            participantCount: increment(1)
        });
    }

    // Kullanıcı istatistiklerini güncelle
    await updateUserPredictionStats(userId, 'new_prediction');

    return docRef.id;
}

/**
 * Tahmini değerlendir (yazar veya admin tarafından)
 */
export async function evaluatePrediction(
    predictionId: string,
    status: 'correct' | 'incorrect' | 'partially_correct',
    accuracy?: number
): Promise<void> {
    const predictionRef = doc(db, 'predictions', predictionId);
    const predictionSnap = await getDoc(predictionRef);

    if (!predictionSnap.exists()) {
        throw new Error('Prediction not found');
    }

    const prediction = predictionSnap.data() as Prediction;

    // Puan hesapla
    let points = 0;
    if (status === 'correct') {
        points = 100;
    } else if (status === 'partially_correct') {
        points = accuracy ? Math.round(accuracy) : 50;
    }

    // Tahmini güncelle
    await updateDoc(predictionRef, {
        status,
        accuracy,
        points,
        evaluatedAt: new Date()
    });

    // Kullanıcı istatistiklerini güncelle
    await updateUserPredictionStats(prediction.userId, status, points);
}

/**
 * Tahmine upvote ver
 */
export async function upvotePrediction(
    predictionId: string,
    userId: string
): Promise<void> {
    const predictionRef = doc(db, 'predictions', predictionId);

    await runTransaction(db, async (transaction) => {
        const predictionDoc = await transaction.get(predictionRef);

        if (!predictionDoc.exists()) {
            throw new Error('Prediction not found');
        }

        const prediction = predictionDoc.data() as Prediction;

        if (prediction.upvotedBy.includes(userId)) {
            // Remove upvote
            transaction.update(predictionRef, {
                upvotes: increment(-1),
                upvotedBy: arrayRemove(userId)
            });
        } else {
            // Add upvote
            transaction.update(predictionRef, {
                upvotes: increment(1),
                upvotedBy: arrayUnion(userId)
            });

            // Upvote sayısı 50'yi geçtiyse rozet ver
            if (prediction.upvotes + 1 >= 50) {
                await awardBadge(prediction.userId, 'popular_prediction');
            }
        }
    });
}

/**
 * Hikaye için tahminleri getir
 */
export async function getPredictionsForStory(
    storyId: string,
    limitCount: number = 20
): Promise<Prediction[]> {
    const q = query(
        collection(db, 'predictions'),
        where('storyId', '==', storyId),
        orderBy('upvotes', 'desc'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        evaluatedAt: doc.data().evaluatedAt?.toDate()
    } as Prediction));
}

/**
 * Kullanıcının tahminlerini getir
 */
export async function getUserPredictions(
    userId: string,
    limitCount: number = 20
): Promise<Prediction[]> {
    const q = query(
        collection(db, 'predictions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        evaluatedAt: doc.data().evaluatedAt?.toDate()
    } as Prediction));
}

/**
 * Kullanıcı istatistiklerini güncelle
 */
async function updateUserPredictionStats(
    userId: string,
    action: 'new_prediction' | 'correct' | 'incorrect' | 'partially_correct',
    points: number = 0
): Promise<void> {
    const statsRef = doc(db, 'userPredictionStats', userId);
    const statsSnap = await getDoc(statsRef);

    if (!statsSnap.exists()) {
        // İlk tahmin - yeni stats oluştur
        const newStats: Omit<UserPredictionStats, 'userId'> = {
            totalPredictions: 1,
            correctPredictions: 0,
            incorrectPredictions: 0,
            partiallyCorrectPredictions: 0,
            totalPoints: 0,
            averageAccuracy: 0,
            rank: 'novice',
            badges: [],
            currentStreak: 0,
            longestStreak: 0,
            totalUpvotes: 0,
            lastPredictionAt: new Date(),
            updatedAt: new Date()
        };

        await updateDoc(statsRef, newStats);
        await awardBadge(userId, 'first_prediction');
        return;
    }

    const stats = statsSnap.data() as UserPredictionStats;
    const updates: Partial<UserPredictionStats> = {
        updatedAt: new Date()
    };

    if (action === 'new_prediction') {
        updates.totalPredictions = increment(1) as any;
        updates.lastPredictionAt = new Date();
    } else if (action === 'correct') {
        updates.correctPredictions = increment(1) as any;
        updates.totalPoints = increment(points) as any;
        updates.currentStreak = increment(1) as any;

        const newStreak = stats.currentStreak + 1;
        if (newStreak > stats.longestStreak) {
            updates.longestStreak = newStreak;
        }

        // Streak rozetleri
        if (newStreak === 5) await awardBadge(userId, 'streak_5');
        if (newStreak === 10) await awardBadge(userId, 'streak_10');

        // Tahmin sayısı rozetleri
        if (stats.totalPredictions === 100) await awardBadge(userId, 'century');
    } else if (action === 'incorrect') {
        updates.incorrectPredictions = increment(1) as any;
        updates.currentStreak = 0;
    } else if (action === 'partially_correct') {
        updates.partiallyCorrectPredictions = increment(1) as any;
        updates.totalPoints = increment(points) as any;
    }

    await updateDoc(statsRef, updates);

    // Rank güncelle
    if (action === 'correct' || action === 'partially_correct') {
        await updateUserRank(userId);
    }
}

/**
 * Kullanıcı rankını güncelle
 */
async function updateUserRank(userId: string): Promise<void> {
    const statsRef = doc(db, 'userPredictionStats', userId);
    const statsSnap = await getDoc(statsRef);

    if (!statsSnap.exists()) return;

    const stats = statsSnap.data() as UserPredictionStats;
    let newRank: PredictionRank = 'novice';

    for (const [rank, requirements] of Object.entries(RANK_REQUIREMENTS)) {
        if (stats.totalPoints >= requirements.minPoints && stats.totalPoints < requirements.maxPoints) {
            newRank = rank as PredictionRank;
            break;
        }
    }

    if (newRank !== stats.rank) {
        await updateDoc(statsRef, { rank: newRank });
    }
}

/**
 * Kullanıcıya rozet ver
 */
async function awardBadge(userId: string, badgeId: string): Promise<void> {
    const statsRef = doc(db, 'userPredictionStats', userId);
    const statsSnap = await getDoc(statsRef);

    if (!statsSnap.exists()) return;

    const stats = statsSnap.data() as UserPredictionStats;

    // Rozet zaten varsa ekleme
    if (stats.badges.some(b => b.id === badgeId)) return;

    const badgeTemplate = Object.values(PREDICTION_BADGES).find(b => b.id === badgeId);
    if (!badgeTemplate) return;

    const newBadge = {
        ...badgeTemplate,
        earnedAt: new Date()
    };

    await updateDoc(statsRef, {
        badges: arrayUnion(newBadge)
    });
}

/**
 * Liderlik tablosunu getir
 */
export async function getLeaderboard(limitCount: number = 10): Promise<UserPredictionStats[]> {
    const q = query(
        collection(db, 'userPredictionStats'),
        orderBy('totalPoints', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        userId: doc.id,
        ...doc.data(),
        lastPredictionAt: doc.data().lastPredictionAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        badges: doc.data().badges?.map((b: any) => ({
            ...b,
            earnedAt: b.earnedAt?.toDate()
        }))
    } as UserPredictionStats));
}

/**
 * Kullanıcı istatistiklerini getir
 */
export async function getUserPredictionStats(userId: string): Promise<UserPredictionStats | null> {
    const statsRef = doc(db, 'userPredictionStats', userId);
    const statsSnap = await getDoc(statsRef);

    if (!statsSnap.exists()) return null;

    return {
        userId,
        ...statsSnap.data(),
        lastPredictionAt: statsSnap.data().lastPredictionAt?.toDate(),
        updatedAt: statsSnap.data().updatedAt?.toDate(),
        badges: statsSnap.data().badges?.map((b: any) => ({
            ...b,
            earnedAt: b.earnedAt?.toDate()
        }))
    } as UserPredictionStats;
}
