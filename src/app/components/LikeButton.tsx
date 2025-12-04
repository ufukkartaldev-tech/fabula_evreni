'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toggleStoryLike, toggleCommentLike, isStoryLiked, isCommentLiked } from '@/lib/likeService';
import { createNotification } from '@/lib/notificationService';

interface LikeButtonProps {
    targetId: string;
    targetType: 'story' | 'comment';
    initialLikeCount: number;
    size?: 'small' | 'medium' | 'large';
    storyAuthorId?: string; // Bildirim için gerekli
    storyTitle?: string;    // Bildirim için gerekli
}

export default function LikeButton({
    targetId,
    targetType,
    initialLikeCount,
    size = 'medium',
    storyAuthorId,
    storyTitle
}: LikeButtonProps) {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // ... (useEffect aynı kalacak)

    const handleLike = async () => {
        if (!user || isLoading) return;

        setIsLoading(true);

        // Optimistic UI update
        const newIsLiked = !isLiked;
        const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
        setIsLiked(newIsLiked);
        setLikeCount(newLikeCount);

        try {
            const result = targetType === 'story'
                ? await toggleStoryLike(user.uid, targetId)
                : await toggleCommentLike(user.uid, targetId);

            // Sunucudan gelen sonuçla güncelle
            setIsLiked(result);

            // Bildirim gönder (Sadece beğeni eklendiyse ve hikaye ise)
            if (result && targetType === 'story' && storyAuthorId && storyTitle && storyAuthorId !== user.uid) {
                try {
                    await createNotification({
                        userId: storyAuthorId,
                        type: 'like',
                        actorId: user.uid,
                        actorName: user.displayName || 'Kullanıcı',
                        actorAvatar: user.photoURL || '👤',
                        storyId: targetId,
                        storyTitle: storyTitle,
                        message: 'hikayenizi beğendi'
                    });
                } catch (notifError) {
                    console.error('Error creating notification:', notifError);
                }
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            // Hata durumunda geri al
            setIsLiked(!newIsLiked);
            setLikeCount(likeCount);
        } finally {
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return null; // veya skeleton loader
    }

    const sizeClasses = {
        small: 'like-button-small',
        medium: 'like-button-medium',
        large: 'like-button-large'
    };

    return (
        <button
            className={`like-button ${sizeClasses[size]} ${isLiked ? 'liked' : ''} ${!user ? 'disabled' : ''}`}
            onClick={handleLike}
            disabled={!user || isLoading}
            title={user ? (isLiked ? 'Beğeniyi kaldır' : 'Beğen') : 'Beğenmek için giriş yapın'}
        >
            <span className="like-icon">
                {isLiked ? '❤️' : '🤍'}
            </span>
            <span className="like-count">{likeCount}</span>
        </button>
    );
}
