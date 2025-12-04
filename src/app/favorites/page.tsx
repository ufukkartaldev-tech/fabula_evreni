'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserFavorites } from '@/lib/favoriteService';
import { Story } from '@/interfaces/Story';
import StoryCard from '../components/StoryCard';
import Link from 'next/link';

export default function FavoritesPage() {
    const { user, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setLoading(false);
            return;
        }

        async function fetchFavorites() {
            if (!user) return; // Additional null check

            try {
                const userFavorites = await getUserFavorites(user.uid);
                setFavorites(userFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="favorites-page">
                <div className="favorites-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Favoriler yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="favorites-page">
                <div className="favorites-container">
                    <div className="empty-state">
                        <span className="empty-icon">🔐</span>
                        <h2>Giriş Yapın</h2>
                        <p>Favorilerinizi görmek için giriş yapmanız gerekiyor.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1 className="page-title">
                        <span className="title-icon">⭐</span>
                        Favori Hikayelerim
                    </h1>
                    <p className="page-subtitle">
                        Beğendiğiniz ve daha sonra okumak istediğiniz hikayeler
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📚</span>
                        <h2>Henüz favori hikaye yok</h2>
                        <p>Beğendiğiniz hikayeleri favorilere ekleyerek buradan kolayca ulaşabilirsiniz.</p>
                        <Link href="/" className="browse-button">
                            Hikayelere Göz At
                        </Link>
                    </div>
                ) : (
                    <div className="favorites-content">
                        <div className="favorites-count">
                            {favorites.length} favori hikaye
                        </div>
                        <div className="stories-grid">
                            {favorites.map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
