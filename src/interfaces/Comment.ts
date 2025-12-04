export interface Comment {
    id: string;
    storyId: string;
    userId?: string; // Firebase Auth UID (optional for backward compatibility)
    userName?: string; // Display name (optional)
    userAvatar?: string; // Avatar URL (optional)
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    createdAt: Date;
    likes?: number; // Optional for backward compatibility
    replies?: Comment[];
}
