import { Timestamp } from 'firebase/firestore';

export interface Collection {
    id: string;
    userId: string;
    name: string;
    description?: string;
    isPublic: boolean;
    storyIds: string[];
    createdAt: Date | Timestamp;
    updatedAt: Date | Timestamp;
    coverImage?: string; // Optional cover image for the collection
}
