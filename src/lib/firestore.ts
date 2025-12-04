import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    Timestamp,
    DocumentData,
    QueryDocumentSnapshot,
    Unsubscribe,
    runTransaction,
    increment,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Story } from '@/interfaces/Story';
import { Comment } from '@/interfaces/Comment';

// Firestore koleksiyon referansları
const storiesCollection = collection(db, 'stories');
const commentsCollection = collection(db, 'comments');

/**
 * @deprecated Use getStoriesPaginated() instead for better performance
 * Tüm hikayeleri getir - SADECE GERIYE DÖNÜK UYUMLULUK İÇİN
 * ÖNEMLİ: Bu fonksiyon tüm koleksiyonu çeker, performans sorunu yaratır!
 */
export async function getStories(): Promise<Story[]> {
    console.warn('⚠️ getStories() is deprecated. Use getStoriesPaginated() for better performance.');

    try {
        const q = query(storiesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Story;
        });
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}

/**
 * Tek bir hikaye getir - OPTIMIZE EDİLDİ
 * Artık tüm hikayeleri çekmek yerine sadece ilgili dokümanı çeker
 */
export async function getStoryById(id: string): Promise<Story | null> {
    try {
        const storyRef = doc(db, 'stories', id);
        const storyDoc = await getDoc(storyRef);

        if (!storyDoc.exists()) {
            return null;
        }

        const data = storyDoc.data();
        return {
            id: storyDoc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
        } as Story;
    } catch (error) {
        console.error('Error fetching story:', error);
        return null;
    }
}

// Bir hikayeye ait yorumları getir
export async function getCommentsByStoryId(storyId: string): Promise<Comment[]> {
    try {
        const q = query(
            commentsCollection,
            where('storyId', '==', storyId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const comments = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Comment;
        });

        // Nested yorumları organize et
        return organizeComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

// Yorumları nested yapıya dönüştür
function organizeComments(comments: Comment[]): Comment[] {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // Tüm yorumları map'e ekle
    comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Nested yapıyı oluştur
    comments.forEach(comment => {
        const commentWithReplies = commentMap.get(comment.id);
        if (commentWithReplies) {
            // Eğer parent yoksa root comment
            rootComments.push(commentWithReplies);
        }
    });

    return rootComments;
}

// Yeni yorum ekle
export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docRef = await addDoc(commentsCollection, {
            ...comment,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// Yeni hikaye ekle
export async function addStory(story: Omit<Story, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docRef = await addDoc(storiesCollection, {
            ...story,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding story:', error);
        throw error;
    }
}

// Hikaye görüntülenme sayısını artır (Transaction ile güvenli artırma)
export async function incrementStoryViews(storyId: string): Promise<void> {
    try {
        const storyRef = doc(db, 'stories', storyId);

        await runTransaction(db, async (transaction) => {
            const storyDoc = await transaction.get(storyRef);

            if (!storyDoc.exists()) {
                throw new Error('Story does not exist!');
            }

            // stats.views değerini 1 artır
            transaction.update(storyRef, {
                'stats.views': increment(1)
            });
        });
    } catch (error) {
        console.error('Error incrementing story views:', error);
        // View count artırma hatası uygulamayı durdurmamalı
        // Sadece log'la ve devam et
    }
}


// Hikaye güncelle
export async function updateStory(storyId: string, updates: Partial<Story>): Promise<void> {
    try {
        const storyRef = doc(db, 'stories', storyId);
        await updateDoc(storyRef, {
            ...updates,
            updatedAt: Timestamp.now()
        });
    } catch (error) {
        console.error('Error updating story:', error);
        throw error;
    }
}

// Hikaye sil
export async function deleteStory(storyId: string): Promise<void> {
    try {
        const storyRef = doc(db, 'stories', storyId);
        await deleteDoc(storyRef);
    } catch (error) {
        console.error('Error deleting story:', error);
        throw error;
    }
}

// ============================================
// REALTIME LISTENERS
// ============================================

/**
 * Subscribe to stories with realtime updates
 */
export function subscribeToStories(
    callback: (stories: Story[]) => void,
    limitCount?: number
): Unsubscribe {
    const q = limitCount
        ? query(storiesCollection, orderBy('createdAt', 'desc'), limit(limitCount))
        : query(storiesCollection, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const stories = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Story;
        });
        callback(stories);
    }, (error) => {
        console.error('Error in stories subscription:', error);
    });
}

/**
 * Subscribe to a single story with realtime updates
 */
export function subscribeToStory(
    storyId: string,
    callback: (story: Story | null) => void
): Unsubscribe {
    const storyRef = doc(db, 'stories', storyId);

    return onSnapshot(storyRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            callback({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Story);
        } else {
            callback(null);
        }
    }, (error) => {
        console.error('Error in story subscription:', error);
    });
}

/**
 * Subscribe to comments for a story with realtime updates
 */
export function subscribeToComments(
    storyId: string,
    callback: (comments: Comment[]) => void
): Unsubscribe {
    const q = query(
        commentsCollection,
        where('storyId', '==', storyId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Comment;
        });
        callback(organizeComments(comments));
    }, (error) => {
        console.error('Error in comments subscription:', error);
    });
}

// ============================================
// PAGINATION
// ============================================

/**
 * Get stories with pagination
 */
export async function getStoriesPaginated(
    limitCount: number = 12,
    lastDoc?: QueryDocumentSnapshot
): Promise<{ stories: Story[]; lastDoc: QueryDocumentSnapshot | null }> {
    try {
        let q = query(
            storiesCollection,
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        if (lastDoc) {
            q = query(
                storiesCollection,
                orderBy('createdAt', 'desc'),
                startAfter(lastDoc),
                limit(limitCount)
            );
        }

        const querySnapshot = await getDocs(q);

        const stories = querySnapshot.docs
            .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                } as Story;
            })
            .filter(story => story.status !== 'DELETED');

        const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return { stories, lastDoc: newLastDoc };
    } catch (error) {
        console.error('Error fetching paginated stories:', error);
        return { stories: [], lastDoc: null };
    }
}
