import {
    collection,
    getDocs,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { getUserProfile } from './userService';
import { Story } from '@/interfaces/Story';
import { Comment } from '@/interfaces/Comment';
import { UserProfile } from '@/interfaces/User';

// Kullanıcının yazdığı hikayeleri getir
export async function getUserStories(userId: string): Promise<Story[]> {
    try {
        const storiesCollection = collection(db, 'stories');
        const q = query(
            storiesCollection,
            where('authorId', '==', userId),
            orderBy('createdAt', 'desc')
        );
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
        console.error('Error fetching user stories:', error);
        return [];
    }
}

// Kullanıcının yaptığı yorumları getir
export async function getUserComments(userId: string): Promise<Comment[]> {
    try {
        const commentsCollection = collection(db, 'comments');
        const q = query(
            commentsCollection,
            where('author.id', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Comment;
        });
    } catch (error) {
        console.error('Error fetching user comments:', error);
        return [];
    }
}

// Kullanıcı istatistiklerini getir
export async function getUserStats(userId: string): Promise<{
    storiesCount: number;
    commentsCount: number;
    totalViews: number;
    totalLikes: number;
}> {
    try {
        const [stories, comments] = await Promise.all([
            getUserStories(userId),
            getUserComments(userId)
        ]);

        const totalViews = stories.reduce((sum, story) => sum + (story.stats?.views || 0), 0);
        const totalLikes = stories.reduce((sum, story) => sum + (story.stats?.likes || 0), 0);

        return {
            storiesCount: stories.length,
            commentsCount: comments.length,
            totalViews,
            totalLikes
        };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return {
            storiesCount: 0,
            commentsCount: 0,
            totalViews: 0,
            totalLikes: 0
        };
    }
}
