import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from '@/interfaces/User';
import { getUserBadge, BADGES } from '@/interfaces/Badge';
import { User } from 'firebase/auth';

/**
 * Yeni kullanıcı profili oluştur
 */
export async function createUserProfile(user: User): Promise<UserProfile> {
    const initialBadge = BADGES[0]; // İlk rozet

    const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Kullanıcı',
        photoURL: user.photoURL,
        totalWins: 0,
        xp: 0,
        currentBadge: initialBadge.name,
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now()
    };

    try {
        await setDoc(doc(db, 'users', user.uid), userProfile);
        return userProfile;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
}

/**
 * Kullanıcı profilini getir
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
}

/**
 * Kullanıcının XP'sini artır ve rozetini güncelle
 */
export async function updateUserXP(uid: string, amount: number): Promise<{ newBadge: boolean; badge: string }> {
    try {
        const profile = await getUserProfile(uid);
        if (!profile) {
            throw new Error('User profile not found');
        }

        const currentXP = profile.xp || 0;
        const oldBadge = getUserBadge(currentXP);
        const newXP = currentXP + amount;
        const newBadge = getUserBadge(newXP);

        await updateDoc(doc(db, 'users', uid), {
            xp: newXP,
            currentBadge: newBadge.name,
            lastUpdated: serverTimestamp()
        });

        return {
            newBadge: oldBadge.id !== newBadge.id,
            badge: newBadge.name
        };
    } catch (error) {
        console.error('Error updating user XP:', error);
        throw error;
    }
}

/**
 * Auth user ile Firestore user'ı senkronize et
 * Eğer profil yoksa oluştur, varsa güncelle
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
    try {
        let profile = await getUserProfile(user.uid);

        if (!profile) {
            // Profil yoksa oluştur
            profile = await createUserProfile(user);
        } else {
            // Profil varsa sadece temel bilgileri güncelle (rozet ve wins değişmez)
            await updateDoc(doc(db, 'users', user.uid), {
                email: user.email || profile.email,
                displayName: user.displayName || profile.displayName,
                photoURL: user.photoURL,
                lastUpdated: serverTimestamp()
            });

            // Güncellenmiş profili getir
            profile = await getUserProfile(user.uid) || profile;
        }

        return profile;
    } catch (error) {
        console.error('Error syncing user profile:', error);
        throw error;
    }
}

/**
 * Kullanıcı profilini manuel güncelle
 */
export async function updateUserProfile(
    uid: string,
    updates: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> {
    try {
        await updateDoc(doc(db, 'users', uid), {
            ...updates,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}
