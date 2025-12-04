import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    updateDoc,
    deleteDoc,
    Timestamp,
    serverTimestamp,
    setDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Draft } from '@/interfaces/Draft';
export type { Draft };
import debounce from 'lodash.debounce';

const draftsCollection = collection(db, 'drafts');

/**
 * Taslak kaydet veya güncelle
 */
export async function saveDraft(draft: Omit<Draft, 'id' | 'createdAt' | 'lastSaved'>): Promise<{ success: boolean; draftId?: string; error?: string }> {
    try {
        const draftData = {
            ...draft,
            lastSaved: serverTimestamp(),
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(draftsCollection, draftData);

        return {
            success: true,
            draftId: docRef.id
        };
    } catch (error) {
        console.error('Error saving draft:', error);
        return {
            success: false,
            error: 'Taslak kaydedilemedi'
        };
    }
}

/**
 * Mevcut taslağı güncelle
 */
export async function updateDraft(draftId: string, updates: Partial<Omit<Draft, 'id' | 'userId' | 'createdAt'>>): Promise<{ success: boolean; error?: string }> {
    try {
        const draftRef = doc(db, 'drafts', draftId);

        await updateDoc(draftRef, {
            ...updates,
            lastSaved: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating draft:', error);
        return {
            success: false,
            error: 'Taslak güncellenemedi'
        };
    }
}

/**
 * Otomatik kaydetme (debounced)
 */
export const autoSaveDraft = debounce(
    async (draftId: string, updates: Partial<Omit<Draft, 'id' | 'userId' | 'createdAt'>>) => {
        return await updateDraft(draftId, updates);
    },
    2000 // 2 saniye bekle
);

/**
 * Kullanıcının tüm taslakları
 */
export async function getDrafts(userId: string): Promise<Draft[]> {
    try {
        const q = query(
            draftsCollection,
            where('userId', '==', userId),
            orderBy('lastSaved', 'desc')
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                lastSaved: data.lastSaved?.toDate() || new Date()
            } as Draft;
        });
    } catch (error) {
        console.error('Error fetching drafts:', error);
        return [];
    }
}

/**
 * Tek bir taslak getir
 */
export async function getDraftById(draftId: string): Promise<Draft | null> {
    try {
        const draftRef = doc(db, 'drafts', draftId);
        const draftDoc = await getDoc(draftRef);

        if (!draftDoc.exists()) {
            return null;
        }

        const data = draftDoc.data();
        return {
            id: draftDoc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastSaved: data.lastSaved?.toDate() || new Date()
        } as Draft;
    } catch (error) {
        console.error('Error fetching draft:', error);
        return null;
    }
}

/**
 * Taslak sil
 */
export async function deleteDraft(draftId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const draftRef = doc(db, 'drafts', draftId);
        await deleteDoc(draftRef);

        return { success: true };
    } catch (error) {
        console.error('Error deleting draft:', error);
        return {
            success: false,
            error: 'Taslak silinemedi'
        };
    }
}

/**
 * Taslağı hikaye olarak yayınla
 * (Bu fonksiyon taslağı siler ve hikaye oluşturur)
 */
export async function publishDraft(draftId: string): Promise<{ success: boolean; storyId?: string; error?: string }> {
    try {
        const draft = await getDraftById(draftId);

        if (!draft) {
            return {
                success: false,
                error: 'Taslak bulunamadı'
            };
        }

        // Hikaye oluştur (addStory fonksiyonunu kullan)
        const { addStory } = await import('./firestore');

        const storyData = {
            title: draft.title,
            content: draft.content,
            excerpt: draft.excerpt,
            category: draft.category,
            coverImage: draft.coverImage
        };

        const storyId = await addStory(storyData as any);

        if (storyId) {
            // Taslağı sil
            await deleteDraft(draftId);

            return {
                success: true,
                storyId: storyId
            };
        }

        return {
            success: false,
            error: 'Hikaye oluşturulamadı'
        };
    } catch (error) {
        console.error('Error publishing draft:', error);
        return {
            success: false,
            error: 'Yayınlama başarısız'
        };
    }
}
