export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
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
