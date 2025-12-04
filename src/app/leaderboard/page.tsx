'use client';

import { useEffect, useState } from 'react';
import LeaderboardCard from '../components/LeaderboardCard';
import {
    getTopStories,
    getTopAuthors,
    getTopBadgeHolders,
    TimeRange,
    LeaderboardStory,
    LeaderboardAuthor,
    LeaderboardBadgeHolder
} from '@/lib/leaderboardService';

type TabType = 'stories' | 'authors' | 'badges';

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('stories');
    const [timeRange, setTimeRange] = useState<TimeRange>('all');
    const [loading, setLoading] = useState(true);

    const [topStories, setTopStories] = useState<LeaderboardStory[]>([]);
    const [topAuthors, setTopAuthors] = useState<LeaderboardAuthor[]>([]);
    const [topBadgeHolders, setTopBadgeHolders] = useState<LeaderboardBadgeHolder[]>([]);

    useEffect(() => {
        fetchLeaderboardData();
    }, [activeTab, timeRange]);

    const fetchLeaderboardData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'stories') {
                const stories = await getTopStories(timeRange, 10);
                setTopStories(stories);
            } else if (activeTab === 'authors') {
                const authors = await getTopAuthors(10);
                setTopAuthors(authors);
            } else if (activeTab === 'badges') {
                const badgeHolders = await getTopBadgeHolders(10);
                setTopBadgeHolders(badgeHolders);
            }
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Liderlik tablosu yükleniyor...</p>
                </div>
            );
        }

        if (activeTab === 'stories') {
            if (topStories.length === 0) {
                return (
                    <div className="empty-state">
                        <span className="empty-icon">📚</span>
                        <p>Henüz hikaye yok.</p>
                    </div>
                );
            }
            return topStories.map((story) => (
                <LeaderboardCard key={story.id} rank={story.rank} type="story" data={story} />
            ));
        }

        if (activeTab === 'authors') {
            if (topAuthors.length === 0) {
                return (
                    <div className="empty-state">
                        <span className="empty-icon">👥</span>
                        <p>Henüz yazar yok.</p>
                    </div>
                );
            }
            return topAuthors.map((author) => (
                <LeaderboardCard key={author.uid} rank={author.rank} type="author" data={author} />
            ));
        }

        if (activeTab === 'badges') {
            if (topBadgeHolders.length === 0) {
                return (
                    <div className="empty-state">
                        <span className="empty-icon">🏆</span>
                        <p>Henüz rozet sahibi yok.</p>
                    </div>
                );
            }
            return topBadgeHolders.map((holder) => (
                <LeaderboardCard key={holder.uid} rank={holder.rank} type="badge" data={holder} />
            ));
        }
    };

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <div className="leaderboard-header">
                    <h1 className="page-title">
                        <span className="title-icon">🏆</span>
                        Liderlik Tablosu
                    </h1>
                    <p className="page-subtitle">
                        En başarılı hikayeler, yazarlar ve rozet sahipleri
                    </p>
                </div>

                <div className="leaderboard-tabs">
                    <button
                        className={`tab-button ${activeTab === 'stories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stories')}
                    >
                        <span className="tab-icon">📖</span>
                        En Çok Okunan
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'authors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('authors')}
                    >
                        <span className="tab-icon">✍️</span>
                        Aktif Yazarlar
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
                        onClick={() => setActiveTab('badges')}
                    >
                        <span className="tab-icon">🎖️</span>
                        Rozet Sıralaması
                    </button>
                </div>

                {activeTab === 'stories' && (
                    <div className="time-filters">
                        <button
                            className={`filter-button ${timeRange === 'today' ? 'active' : ''}`}
                            onClick={() => setTimeRange('today')}
                        >
                            Bugün
                        </button>
                        <button
                            className={`filter-button ${timeRange === 'week' ? 'active' : ''}`}
                            onClick={() => setTimeRange('week')}
                        >
                            Bu Hafta
                        </button>
                        <button
                            className={`filter-button ${timeRange === 'month' ? 'active' : ''}`}
                            onClick={() => setTimeRange('month')}
                        >
                            Bu Ay
                        </button>
                        <button
                            className={`filter-button ${timeRange === 'all' ? 'active' : ''}`}
                            onClick={() => setTimeRange('all')}
                        >
                            Tüm Zamanlar
                        </button>
                    </div>
                )}

                <div className="leaderboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
