import {
    collection,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Story } from '@/interfaces/Story';
import { getStories } from './firestore';

// Firestore koleksiyon referansları
const favoritesCollection = collection(db, 'favorites');

export interface Favorite {
    id: string;
    userId: string;
    storyId: string;
    createdAt: Date;
}

// Favorilere ekleme/çıkarma toggle
export async function toggleFavorite(userId: string, storyId: string): Promise<boolean> {
    try {
        const favoriteId = `${userId}_${storyId}`;
        const favoriteRef = doc(db, 'favorites', favoriteId);
        const favoriteDoc = await getDoc(favoriteRef);

        if (favoriteDoc.exists()) {
            // Favorilerden çıkar
            await deleteDoc(favoriteRef);
            return false; // Favorilerden kaldırıldı
        } else {
            // Favorilere ekle
            await setDoc(favoriteRef, {
                userId,
                storyId,
                createdAt: Timestamp.now()
            });
            return true; // Favorilere eklendi
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
}

// Kullanıcının bir hikayeyi favorilere ekleyip eklemediğini kontrol et
export async function isFavorited(userId: string, storyId: string): Promise<boolean> {
    try {
        const favoriteId = `${userId}_${storyId}`;
        const favoriteRef = doc(db, 'favorites', favoriteId);
        const favoriteDoc = await getDoc(favoriteRef);
        return favoriteDoc.exists();
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
}

// Kullanıcının favori hikayelerini getir
export async function getUserFavorites(userId: string): Promise<Story[]> {
    try {
        const q = query(
            favoritesCollection,
            where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const favoriteStoryIds = querySnapshot.docs.map(doc => doc.data().storyId);

        if (favoriteStoryIds.length === 0) {
            return [];
        }

        // Tüm hikayeleri getir ve favorileri filtrele
        const allStories = await getStories();
        const favoriteStories = allStories.filter(story =>
            favoriteStoryIds.includes(story.id)
        );

        // Favorilere eklenme tarihine göre sırala (en yeni önce)
        const favoritesMap = new Map(
            querySnapshot.docs.map(doc => [
                doc.data().storyId,
                doc.data().createdAt?.toDate() || new Date()
            ])
        );

        return favoriteStories.sort((a, b) => {
            const dateA = favoritesMap.get(a.id) || new Date(0);
            const dateB = favoritesMap.get(b.id) || new Date(0);
            return dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        return [];
    }
}

// Kullanıcının favori hikaye ID'lerini getir
export async function getUserFavoriteIds(userId: string): Promise<string[]> {
    try {
        const q = query(
            favoritesCollection,
            where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().storyId);
    } catch (error) {
        console.error('Error fetching user favorite IDs:', error);
        return [];
    }
}
