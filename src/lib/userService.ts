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
        lastUpdated: Timestamp.now(),
        role: 'writer'
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
 * Profil yoksa oluşturur.
 * Profil varsa, eksik temel alanları (rozet, rol vb.) tamamlar ve bilgileri günceller.
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
    try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // 1. Profil hiç yoksa, sıfırdan oluştur
            console.log(`Profil bulunamadı, yeni profil oluşturuluyor: ${user.uid}`);
            return await createUserProfile(user);
        } else {
            // 2. Profil varsa, veriyi al ve eksik alanları kontrol et
            const profile = docSnap.data() as UserProfile;
            const updates: Partial<UserProfile> = {};

            // Google/Auth'dan gelen temel bilgileri güncelle
            updates.email = user.email || profile.email;
            updates.displayName = user.displayName || profile.displayName;
            updates.photoURL = user.photoURL || profile.photoURL;

            // --- EKSİK ALANLARI TAMAMLAYAN BLOK ---
            if (profile.role === undefined) {
                updates.role = 'writer'; // Eksik rolü ekle
                console.log(`Eksik 'role' alanı tamamlanıyor: ${user.uid}`);
            }
            if (profile.currentBadge === undefined) {
                updates.currentBadge = BADGES[0].name; // Eksik rozeti ekle
                console.log(`Eksik 'currentBadge' alanı tamamlanıyor: ${user.uid}`);
            }
            if (profile.xp === undefined) {
                updates.xp = 0; // Eksik xp'yi ekle
            }
            // -----------------------------------------

            // Eğer en az bir güncelleme varsa, Firestore'a yaz
            if (Object.keys(updates).length > 0) {
                await updateDoc(docRef, {
                    ...updates,
                    lastUpdated: serverTimestamp()
                });
            }

            // Güncellenmiş veya mevcut profili döndür
            return { ...profile, ...updates };
        }
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
