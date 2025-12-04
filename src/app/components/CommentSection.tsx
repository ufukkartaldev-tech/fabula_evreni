'use client';

import { useState } from 'react';
import { Comment } from '@/interfaces/Comment';
import { addComment, getCommentsByStoryId } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { createNotification } from '@/lib/notificationService';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

interface CommentSectionProps {
    storyId: string;
    storyAuthorId?: string;
    storyTitle: string;
    initialComments: Comment[];
}

export default function CommentSection({ storyId, storyAuthorId, storyTitle, initialComments }: CommentSectionProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handleAddComment = async (content: string) => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const newComment: Omit<Comment, 'id' | 'createdAt'> = {
                storyId,
                author: {
                    name: user.displayName || 'Kullanıcı',
                    avatar: user.photoURL || '👤'
                },
                content,
                replies: []
            };

            // Firestore'a ekle
            const commentId = await addComment(newComment);

            // Yorumları yeniden yükle
            const updatedComments = await getCommentsByStoryId(storyId);
            setComments(updatedComments);

            // Hikaye yazarına bildirim gönder (kendi yorumuna bildirim gönderme)
            if (storyAuthorId && storyAuthorId !== user.uid) {
                try {
                    await createNotification({
                        userId: storyAuthorId,
                        type: 'comment',
                        actorId: user.uid,
                        actorName: user.displayName || 'Kullanıcı',
                        actorAvatar: user.photoURL || '👤',
                        storyId: storyId,
                        storyTitle: storyTitle,
                        commentId: commentId,
                        message: 'hikayenize yorum yaptı'
                    });
                } catch (notifError) {
                    console.error('Error creating notification:', notifError);
                    // Bildirim hatası yorumu engellemez
                }
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Yorum eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="comment-section">
            <div className="section-header">
                <h2>💬 Yorumlar</h2>
                <span className="comment-count">{comments.length} yorum</span>
            </div>

            {!user && showLoginPrompt ? (
                <div className="login-prompt">
                    <span className="prompt-icon">🔐</span>
                    <p>Yorum yapmak için giriş yapmalısınız.</p>
                    <p className="prompt-hint">Sağ üst köşedeki "Giriş Yap" butonunu kullanın.</p>
                </div>
            ) : (
                <CommentForm onSubmit={handleAddComment} disabled={isSubmitting} />
            )}

            <div className="comments-list">
                {comments.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">💭</span>
                        <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
}
