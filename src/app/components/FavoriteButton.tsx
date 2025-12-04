'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toggleFavorite, isFavorited } from '@/lib/favoriteService';

interface FavoriteButtonProps {
    storyId: string;
    size?: 'small' | 'medium' | 'large';
}

export default function FavoriteButton({ storyId, size = 'medium' }: FavoriteButtonProps) {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Kullanıcının favorilediğini kontrol et
    useEffect(() => {
        if (!user) {
            setIsChecking(false);
            return;
        }

        async function checkFavoriteStatus() {
            if (!user) return; // Additional null check

            try {
                const favorited = await isFavorited(user.uid, storyId);
                setIsFavorite(favorited);
            } catch (error) {
                console.error('Error checking favorite status:', error);
            } finally {
                setIsChecking(false);
            }
        }

        checkFavoriteStatus();
    }, [user, storyId]);

    const handleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Parent click'i engelle

        if (!user || isLoading) return;

        setIsLoading(true);

        // Optimistic UI update
        const newIsFavorite = !isFavorite;
        setIsFavorite(newIsFavorite);

        try {
            const result = await toggleFavorite(user.uid, storyId);
            setIsFavorite(result);
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // Hata durumunda geri al
            setIsFavorite(!newIsFavorite);
        } finally {
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return null;
    }

    const sizeClasses = {
        small: 'favorite-button-small',
        medium: 'favorite-button-medium',
        large: 'favorite-button-large'
    };

    return (
        <button
            className={`favorite-button ${sizeClasses[size]} ${isFavorite ? 'favorited' : ''} ${!user ? 'disabled' : ''}`}
            onClick={handleFavorite}
            disabled={!user || isLoading}
            title={user ? (isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle') : 'Favori eklemek için giriş yapın'}
        >
            <span className="favorite-icon">
                {isFavorite ? '⭐' : '☆'}
            </span>
        </button>
    );
}
