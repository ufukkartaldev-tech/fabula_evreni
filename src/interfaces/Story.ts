export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
  votes?: number; // Track how many times this choice was selected
}

export interface ProposedChoice {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  votes: number;
  voters: string[]; // User IDs who voted
  createdAt: Date;
}

export interface StoryNode {
  id: string;
  content: string;
  imageUrl?: string; // URL of the scene image
  choices: StoryChoice[];
  proposedChoices?: ProposedChoice[];
  isEnding?: boolean;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  authorId?: string; // Firebase Auth UID for tracking (optional for backward compatibility)
  category: string;
  createdAt: Date;
  stats: {
    views: number;
    comments: number;
    likes: number;
  };
  type?: 'linear' | 'interactive';
  nodes?: Record<string, StoryNode>;
  startNodeId?: string;
  status?: 'ACTIVE' | 'DELETED';
  deletedAt?: any; // Timestamp or Date
  deletedBy?: string;
}
