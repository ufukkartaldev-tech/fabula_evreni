import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    deleteDoc,
    Timestamp,
    serverTimestamp,
    writeBatch,
    increment
} from 'firebase/firestore';
import { db } from './firebase';
import { Follow } from '@/interfaces/Follow';
import { UserProfile } from '@/interfaces/User';
import { Story } from '@/interfaces/Story';

const followsCollection = collection(db, 'follows');
const usersCollection = collection(db, 'users');

/**
 * Kullanıcıyı takip et
 */
export async function followUser(followerId: string, followingId: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Kendini takip edemez
        if (followerId === followingId) {
            return {
                success: false,
                error: 'Kendinizi takip edemezsiniz'
            };
        }

        // Zaten takip ediyor mu kontrol et
        const isAlreadyFollowing = await isFollowing(followerId, followingId);
        if (isAlreadyFollowing) {
            return {
                success: false,
                error: 'Zaten takip ediyorsunuz'
            };
        }

        const batch = writeBatch(db);

        // Follow kaydı oluştur
        const followRef = doc(followsCollection);
        batch.set(followRef, {
            followerId,
            followingId,
            createdAt: serverTimestamp()
        });

        // Follower count güncelle
        const followerRef = doc(usersCollection, followerId);
        batch.update(followerRef, {
            followingCount: increment(1)
        });

        const followingRef = doc(usersCollection, followingId);
        batch.update(followingRef, {
            followerCount: increment(1)
        });

        await batch.commit();

        return { success: true };
    } catch (error) {
        console.error('Error following user:', error);
        return {
            success: false,
            error: 'Takip edilemedi'
        };
    }
}

/**
 * Takibi bırak
 */
export async function unfollowUser(followerId: string, followingId: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Follow kaydını bul
        const q = query(
            followsCollection,
            where('followerId', '==', followerId),
            where('followingId', '==', followingId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return {
                success: false,
                error: 'Takip kaydı bulunamadı'
            };
        }

        const batch = writeBatch(db);

        // Follow kaydını sil
        querySnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        // Follower count güncelle
        const followerRef = doc(usersCollection, followerId);
        batch.update(followerRef, {
            followingCount: increment(-1)
        });

        const followingRef = doc(usersCollection, followingId);
        batch.update(followingRef, {
            followerCount: increment(-1)
        });

        await batch.commit();

        return { success: true };
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return {
            success: false,
            error: 'Takipten çıkılamadı'
        };
    }
}

/**
 * Takip ediyor mu kontrol et
 */
export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
    try {
        const q = query(
            followsCollection,
            where('followerId', '==', followerId),
            where('followingId', '==', followingId)
        );

        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking follow status:', error);
        return false;
    }
}

/**
 * Takipçiler listesi
 */
export async function getFollowers(userId: string): Promise<UserProfile[]> {
    try {
        const q = query(
            followsCollection,
            where('followingId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const followerIds = querySnapshot.docs.map(doc => doc.data().followerId);

        if (followerIds.length === 0) {
            return [];
        }

        // Kullanıcı bilgilerini getir
        const followers: UserProfile[] = [];
        for (const followerId of followerIds) {
            const userRef = doc(usersCollection, followerId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                followers.push({
                    ...userDoc.data(),
                    uid: userDoc.id
                } as UserProfile);
            }
        }

        return followers;
    } catch (error) {
        console.error('Error fetching followers:', error);
        return [];
    }
}

/**
 * Takip edilenler listesi
 */
export async function getFollowing(userId: string): Promise<UserProfile[]> {
    try {
        const q = query(
            followsCollection,
            where('followerId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const followingIds = querySnapshot.docs.map(doc => doc.data().followingId);

        if (followingIds.length === 0) {
            return [];
        }

        // Kullanıcı bilgilerini getir
        const following: UserProfile[] = [];
        for (const followingId of followingIds) {
            const userRef = doc(usersCollection, followingId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                following.push({
                    ...userDoc.data(),
                    uid: userDoc.id
                } as UserProfile);
            }
        }

        return following;
    } catch (error) {
        console.error('Error fetching following:', error);
        return [];
    }
}

/**
 * Takip edilen yazarların hikayeleri
 */
export async function getFollowingStories(userId: string): Promise<Story[]> {
    try {
        // Takip edilen kullanıcıları getir
        const q = query(
            followsCollection,
            where('followerId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        const followingIds = querySnapshot.docs.map(doc => doc.data().followingId);

        if (followingIds.length === 0) {
            return [];
        }

        // Hikayeleri getir
        const { getStories } = await import('./firestore');
        const allStories = await getStories();

        // Sadece takip edilen yazarların hikayelerini filtrele
        const followingStories = allStories.filter(story =>
            story.authorId && followingIds.includes(story.authorId)
        );

        // Tarihe göre sırala
        return followingStories.sort((a, b) =>
            b.createdAt.getTime() - a.createdAt.getTime()
        );
    } catch (error) {
        console.error('Error fetching following stories:', error);
        return [];
    }
}

/**
 * Takipçi sayısını getir
 */
export async function getFollowerCount(userId: string): Promise<number> {
    try {
        const q = query(
            followsCollection,
            where('followingId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error('Error getting follower count:', error);
        return 0;
    }
}

/**
 * Takip edilen sayısını getir
 */
export async function getFollowingCount(userId: string): Promise<number> {
    try {
        const q = query(
            followsCollection,
            where('followerId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error('Error getting following count:', error);
        return 0;
    }
}
