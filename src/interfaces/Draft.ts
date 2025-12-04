import { Timestamp } from 'firebase/firestore';

export interface Draft {
    id: string;
    userId: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    coverImage?: string;
    lastSaved: Timestamp;
    createdAt: Timestamp;
    autoSaveEnabled: boolean;
}
