import {
    collection,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    runTransaction,
    increment,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Firestore koleksiyon referansları
const likesCollection = collection(db, 'likes');

export interface Like {
    id: string;
    userId: string;
    targetId: string; // storyId veya commentId
    targetType: 'story' | 'comment';
    createdAt: Date;
}

// Hikaye beğenme/beğenmeme toggle
export async function toggleStoryLike(userId: string, storyId: string): Promise<boolean> {
    try {
        const likeId = `${userId}_story_${storyId}`;
        const likeRef = doc(db, 'likes', likeId);
        const storyRef = doc(db, 'stories', storyId);

        return await runTransaction(db, async (transaction) => {
            const likeDoc = await transaction.get(likeRef);
            const storyDoc = await transaction.get(storyRef);

            if (!storyDoc.exists()) {
                throw new Error('Story does not exist!');
            }

            if (likeDoc.exists()) {
                // Beğeniyi kaldır
                transaction.delete(likeRef);
                transaction.update(storyRef, {
                    'stats.likes': increment(-1)
                });
                return false; // Beğeni kaldırıldı
            } else {
                // Beğeni ekle
                transaction.set(likeRef, {
                    userId,
                    targetId: storyId,
                    targetType: 'story',
                    createdAt: Timestamp.now()
                });
                transaction.update(storyRef, {
                    'stats.likes': increment(1)
                });
                return true; // Beğenildi
            }
        });
    } catch (error) {
        console.error('Error toggling story like:', error);
        throw error;
    }
}

// Yorum beğenme/beğenmeme toggle
export async function toggleCommentLike(userId: string, commentId: string): Promise<boolean> {
    try {
        const likeId = `${userId}_comment_${commentId}`;
        const likeRef = doc(db, 'likes', likeId);
        const commentRef = doc(db, 'comments', commentId);

        return await runTransaction(db, async (transaction) => {
            const likeDoc = await transaction.get(likeRef);
            const commentDoc = await transaction.get(commentRef);

            if (!commentDoc.exists()) {
                throw new Error('Comment does not exist!');
            }

            if (likeDoc.exists()) {
                // Beğeniyi kaldır
                transaction.delete(likeRef);
                transaction.update(commentRef, {
                    likes: increment(-1)
                });
                return false;
            } else {
                // Beğeni ekle
                transaction.set(likeRef, {
                    userId,
                    targetId: commentId,
                    targetType: 'comment',
                    createdAt: Timestamp.now()
                });
                transaction.update(commentRef, {
                    likes: increment(1)
                });
                return true;
            }
        });
    } catch (error) {
        console.error('Error toggling comment like:', error);
        throw error;
    }
}

// Kullanıcının bir hikayeyi beğenip beğenmediğini kontrol et
export async function isStoryLiked(userId: string, storyId: string): Promise<boolean> {
    try {
        const likeId = `${userId}_story_${storyId}`;
        const likeRef = doc(db, 'likes', likeId);
        const likeDoc = await getDoc(likeRef);
        return likeDoc.exists();
    } catch (error) {
        console.error('Error checking story like:', error);
        return false;
    }
}

// Kullanıcının bir yorumu beğenip beğenmediğini kontrol et
export async function isCommentLiked(userId: string, commentId: string): Promise<boolean> {
    try {
        const likeId = `${userId}_comment_${commentId}`;
        const likeRef = doc(db, 'likes', likeId);
        const likeDoc = await getDoc(likeRef);
        return likeDoc.exists();
    } catch (error) {
        console.error('Error checking comment like:', error);
        return false;
    }
}

// Kullanıcının beğendiği hikayeleri getir
export async function getUserLikedStories(userId: string): Promise<string[]> {
    try {
        const q = query(
            likesCollection,
            where('userId', '==', userId),
            where('targetType', '==', 'story')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().targetId);
    } catch (error) {
        console.error('Error fetching user liked stories:', error);
        return [];
    }
}

// Kullanıcının beğendiği yorumları getir
export async function getUserLikedComments(userId: string): Promise<string[]> {
    try {
        const q = query(
            likesCollection,
            where('userId', '==', userId),
            where('targetType', '==', 'comment')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().targetId);
    } catch (error) {
        console.error('Error fetching user liked comments:', error);
        return [];
    }
}
