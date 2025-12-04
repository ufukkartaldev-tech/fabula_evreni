'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { followUser, unfollowUser, isFollowing } from '@/lib/followService';
import { createFollowNotification } from '@/lib/notificationService';

interface FollowButtonProps {
    userId: string;
    userName: string;
    userAvatar: string;
    size?: 'small' | 'medium' | 'large';
}

export default function FollowButton({
    userId,
    userName,
    userAvatar,
    size = 'medium'
}: FollowButtonProps) {
    const { user } = useAuth();
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Takip durumunu kontrol et
    useEffect(() => {
        if (!user) {
            setIsChecking(false);
            return;
        }

        async function checkFollowStatus() {
            if (!user) return;

            try {
                const following = await isFollowing(user.uid, userId);
                setIsFollowingUser(following);
            } catch (error) {
                console.error('Error checking follow status:', error);
            } finally {
                setIsChecking(false);
            }
        }

        checkFollowStatus();
    }, [user, userId]);

    const handleFollow = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Parent click'i engelle

        if (!user || isLoading) return;

        setIsLoading(true);

        // Optimistic UI update
        const newIsFollowing = !isFollowingUser;
        setIsFollowingUser(newIsFollowing);

        try {
            if (newIsFollowing) {
                // Takip et
                const result = await followUser(user.uid, userId);

                if (result.success) {
                    // Bildirim gönder
                    await createFollowNotification(
                        userId,
                        user.uid,
                        user.displayName || 'Anonim',
                        user.photoURL || ''
                    );
                } else {
                    // Hata durumunda geri al
                    setIsFollowingUser(false);
                }
            } else {
                // Takipten çık
                const result = await unfollowUser(user.uid, userId);

                if (!result.success) {
                    // Hata durumunda geri al
                    setIsFollowingUser(true);
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            // Hata durumunda geri al
            setIsFollowingUser(!newIsFollowing);
        } finally {
            setIsLoading(false);
        }
    };

    // Kendi profilinde gösterme
    if (user?.uid === userId) {
        return null;
    }

    if (isChecking) {
        return null;
    }

    const sizeClasses = {
        small: 'follow-button-small',
        medium: 'follow-button-medium',
        large: 'follow-button-large'
    };

    return (
        <button
            className={`follow-button ${sizeClasses[size]} ${isFollowingUser ? 'following' : ''} ${!user ? 'disabled' : ''}`}
            onClick={handleFollow}
            disabled={!user || isLoading}
            title={user ? (isFollowingUser ? 'Takibi Bırak' : 'Takip Et') : 'Takip etmek için giriş yapın'}
        >
            {isLoading ? (
                <span className="spinner-small"></span>
            ) : (
                <>
                    <span className="follow-icon">
                        {isFollowingUser ? '✓' : '+'}
                    </span>
                    <span className="follow-text">
                        {isFollowingUser ? 'Takip Ediliyor' : 'Takip Et'}
                    </span>
                </>
            )}
        </button>
    );
}
