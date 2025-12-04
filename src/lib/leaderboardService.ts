import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Story } from '@/interfaces/Story';
import { UserProfile } from '@/interfaces/User';

export interface LeaderboardStory extends Story {
    rank: number;
}

export interface LeaderboardAuthor {
    uid: string;
    displayName: string;
    photoURL: string | null;
    totalViews: number;
    storiesCount: number;
    currentBadge: string;
    rank: number;
}

export interface LeaderboardBadgeHolder extends UserProfile {
    rank: number;
}

export type TimeRange = 'today' | 'week' | 'month' | 'all';

// Get top stories by views
export async function getTopStories(timeRange: TimeRange = 'all', limitCount: number = 10): Promise<LeaderboardStory[]> {
    try {
        const storiesCollection = collection(db, 'stories');

        // Fetch all stories and filter/sort in memory to avoid composite index requirements
        const q = query(storiesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        let stories = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Story;
        });

        // Filter by time range
        if (timeRange !== 'all') {
            const now = new Date();
            let startDate: Date;

            switch (timeRange) {
                case 'today':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                default:
                    startDate = new Date(0);
            }

            stories = stories.filter(story => story.createdAt >= startDate);
        }

        // Sort by views and limit
        const sortedStories = stories
            .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
            .slice(0, limitCount)
            .map((story, index) => ({
                ...story,
                rank: index + 1,
            } as LeaderboardStory));

        return sortedStories;
    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
}

// Get top authors by total views
export async function getTopAuthors(limitCount: number = 10): Promise<LeaderboardAuthor[]> {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('totalWins', 'desc'), limit(limitCount));

        const querySnapshot = await getDocs(q);
        const authors = querySnapshot.docs.map((doc, index) => {
            const data = doc.data();
            return {
                uid: doc.id,
                displayName: data.displayName || 'Anonim',
                photoURL: data.photoURL || null,
                totalViews: data.totalViews || 0,
                storiesCount: data.storiesCount || 0,
                currentBadge: data.currentBadge || '🌱',
                rank: index + 1,
            } as LeaderboardAuthor;
        });

        return authors;
    } catch (error) {
        console.error('Error fetching top authors:', error);
        return [];
    }
}

// Get top badge holders
export async function getTopBadgeHolders(limitCount: number = 10): Promise<LeaderboardBadgeHolder[]> {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('totalWins', 'desc'), limit(limitCount));

        const querySnapshot = await getDocs(q);
        const badgeHolders = querySnapshot.docs.map((doc, index) => {
            const data = doc.data();
            return {
                uid: doc.id,
                email: data.email || '',
                displayName: data.displayName || 'Anonim',
                photoURL: data.photoURL || null,
                totalWins: data.totalWins || 0,
                currentBadge: data.currentBadge || '🌱',
                createdAt: data.createdAt || Timestamp.now(),
                lastUpdated: data.lastUpdated || Timestamp.now(),
                rank: index + 1,
            } as LeaderboardBadgeHolder;
        });

        return badgeHolders;
    } catch (error) {
        console.error('Error fetching top badge holders:', error);
        return [];
    }
}
