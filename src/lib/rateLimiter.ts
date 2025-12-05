import {
    doc,
    getDoc,
    setDoc,
    Timestamp,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import { db } from './firebase';

interface UserAction {
    uid: string;
    date: string; // YYYY-MM-DD format
    storyCount: number;
    lastCreated: Timestamp;
}

const DAILY_STORY_LIMIT = 3;

/**
 * Kullanıcının bugünkü hikaye sayısını kontrol et
 */
export async function checkUserStoryLimit(uid: string): Promise<{
    canCreate: boolean;
    remaining: number;
    limit: number;
}> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const actionId = `${uid}_${today}`;

    try {
        const docRef = doc(db, 'user_actions', actionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as UserAction;
            const remaining = DAILY_STORY_LIMIT - data.storyCount;

            return {
                canCreate: data.storyCount < DAILY_STORY_LIMIT,
                remaining: Math.max(0, remaining),
                limit: DAILY_STORY_LIMIT
            };
        }

        // İlk hikaye
        return {
            canCreate: true,
            remaining: DAILY_STORY_LIMIT,
            limit: DAILY_STORY_LIMIT
        };
    } catch (error) {
        console.error('Error checking story limit:', error);
        // Hata durumunda izin ver (fail-safe)
        return {
            canCreate: true,
            remaining: DAILY_STORY_LIMIT,
            limit: DAILY_STORY_LIMIT
        };
    }
}

/**
 * Hikaye oluşturma kaydı
 */
export async function recordStoryCreation(uid: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const actionId = `${uid}_${today}`;

    try {
        const docRef = doc(db, 'user_actions', actionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as UserAction;
            await setDoc(docRef, {
                uid,
                date: today,
                storyCount: data.storyCount + 1,
                lastCreated: Timestamp.now()
            });
        } else {
            await setDoc(docRef, {
                uid,
                date: today,
                storyCount: 1,
                lastCreated: Timestamp.now()
            });
        }
    } catch (error) {
        console.error('Error recording story creation:', error);
        throw error;
    }
}

/**
 * Kullanıcının bugünkü hikaye sayısını getir
 */
export async function getUserTodayStoryCount(uid: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const actionId = `${uid}_${today}`;

    try {
        const docRef = doc(db, 'user_actions', actionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as UserAction;
            return data.storyCount;
        }

        return 0;
    } catch (error) {
        console.error('Error getting today story count:', error);
        return 0;
    }
}

// Image Generation Limits
const HOURLY_IMAGE_LIMIT = 10;

interface ImageAction {
    uid: string;
    hour: string; // YYYY-MM-DD-HH format
    count: number;
    lastGenerated: Timestamp;
}

export async function checkUserImageLimit(uid: string): Promise<{
    canGenerate: boolean;
    remaining: number;
    limit: number;
}> {
    const now = new Date();
    const hourKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
    const actionId = `img_${uid}_${hourKey}`;

    try {
        const docRef = doc(db, 'user_image_actions', actionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as ImageAction;
            const remaining = HOURLY_IMAGE_LIMIT - data.count;

            return {
                canGenerate: data.count < HOURLY_IMAGE_LIMIT,
                remaining: Math.max(0, remaining),
                limit: HOURLY_IMAGE_LIMIT
            };
        }

        return {
            canGenerate: true,
            remaining: HOURLY_IMAGE_LIMIT,
            limit: HOURLY_IMAGE_LIMIT
        };
    } catch (error) {
        console.error('Error checking image limit:', error);
        // Fail-safe: allow if error
        return {
            canGenerate: true,
            remaining: HOURLY_IMAGE_LIMIT,
            limit: HOURLY_IMAGE_LIMIT
        };
    }
}

export async function recordImageGeneration(uid: string): Promise<void> {
    const now = new Date();
    const hourKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
    const actionId = `img_${uid}_${hourKey}`;

    try {
        const docRef = doc(db, 'user_image_actions', actionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as ImageAction;
            await setDoc(docRef, {
                uid,
                hour: hourKey,
                count: data.count + 1,
                lastGenerated: Timestamp.now()
            });
        } else {
            await setDoc(docRef, {
                uid,
                hour: hourKey,
                count: 1,
                lastGenerated: Timestamp.now()
            });
        }
    } catch (error) {
        console.error('Error recording image generation:', error);
        throw error;
    }
}
