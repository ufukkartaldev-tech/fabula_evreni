import { Timestamp } from 'firebase/firestore';

export interface Follow {
    id: string;
    followerId: string;      // Takip eden kullanıcı
    followingId: string;     // Takip edilen kullanıcı
    createdAt: Timestamp;
}
