import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    totalWins: number; // Deprecated, keep for backward compatibility
    xp?: number;
    completedStories?: string[];
    currentBadge: string;
    createdAt: Date | Timestamp;
    lastUpdated?: Date | Timestamp;
    followerCount?: number;
    followingCount?: number;
    bio?: string;
}
