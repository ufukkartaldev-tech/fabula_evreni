'use client';

import { Comment } from '@/interfaces/Comment';
import ReportButton from './ReportButton';

interface CommentCardProps {
    comment: Comment;
    depth?: number;
}

export default function CommentCard({ comment, depth = 0 }: CommentCardProps) {
    const marginLeft = depth > 0 ? `${depth * 2}rem` : '0';

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) return 'Az önce';
        if (diffInHours < 24) return `${diffInHours} saat önce`;
        if (diffInDays < 7) return `${diffInDays} gün önce`;

        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{ marginLeft }} className="comment-card-wrapper">
            <div className="comment-card">
                <div className="comment-header">
                    <div className="comment-author">
                        <span className="author-avatar">{comment.author.avatar}</span>
                        <div className="author-info">
                            <span className="author-name">{comment.author.name}</span>
                            <span className="comment-date">{formatDate(comment.createdAt)}</span>
                        </div>
                    </div>
                    <ReportButton
                        targetId={comment.id}
                        targetType="comment"
                        targetContent={comment.content}
                        className="text-xs opacity-50 hover:opacity-100"
                    />
                </div>

                <p className="comment-content">{comment.content}</p>

                <button className="reply-button">
                    <span>💬</span>
                    Yanıtla
                </button>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map((reply) => (
                        <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
