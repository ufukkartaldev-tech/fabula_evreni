import { Timestamp } from 'firebase/firestore';

export type ReportReason = 'spam' | 'harassment' | 'inappropriate' | 'other';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';
export type ReportTargetType = 'story' | 'comment' | 'user';

export interface Report {
    id: string;
    reporterId: string;
    reporterName: string;
    targetId: string;
    targetType: ReportTargetType;
    targetContent?: string; // Preview of the reported content
    reason: ReportReason;
    description?: string;
    status: ReportStatus;
    createdAt: Date | Timestamp;
    resolvedAt?: Date | Timestamp;
    resolvedBy?: string;
}
