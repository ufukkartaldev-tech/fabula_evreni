/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { getUserBadge } from '@/interfaces/Badge';

interface LeaderboardCardProps {
    rank: number;
    type: 'story' | 'author' | 'badge';
    data: any;
}

export default function LeaderboardCard({ rank, type, data }: LeaderboardCardProps) {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `${rank}.`;
        }
    };

    if (type === 'story') {
        return (
            <Link href={`/story/${data.id}`} className="leaderboard-card">
                <div className="rank-badge">{getRankIcon(rank)}</div>
                <div className="card-content">
                    <h3 className="card-title">{data.title}</h3>
                    <div className="card-meta">
                        <span className="meta-item">
                            <span className="meta-icon">👤</span>
                            {data.author.name}
                        </span>
                        <span className="meta-item">
                            <span className="meta-icon">📁</span>
                            {data.category}
                        </span>
                    </div>
                </div>
                <div className="card-stats">
                    <div className="stat-item">
                        <span className="stat-icon">👁️</span>
                        <span className="stat-value">{data.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span className="stat-value">{data.stats.comments}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">❤️</span>
                        <span className="stat-value">{data.stats.likes}</span>
                    </div>
                </div>
            </Link>
        );
    }

    if (type === 'author') {
        const xp = data.xp || 0;
        const badge = getUserBadge(xp);

        return (
            <div className="leaderboard-card">
                <div className="rank-badge">{getRankIcon(rank)}</div>
                <div className="card-content">
                    <div className="author-header">
                        <span className="author-avatar">
                            {data.photoURL ? (
                                <img src={data.photoURL} alt={data.displayName} />
                            ) : (
                                '👤'
                            )}
                        </span>
                        <div>
                            <h3 className="card-title">{data.displayName}</h3>
                            {badge && (
                                <span className="author-badge">
                                    {badge.emoji} {badge.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-stats">
                    <div className="stat-item">
                        <span className="stat-icon">✨</span>
                        <span className="stat-value">{xp.toLocaleString()}</span>
                        <span className="stat-label">XP</span>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'badge') {
        const xp = data.xp || 0;
        const badge = getUserBadge(xp);

        return (
            <div className="leaderboard-card">
                <div className="rank-badge">{getRankIcon(rank)}</div>
                <div className="card-content">
                    <div className="author-header">
                        <span className="author-avatar">
                            {data.photoURL ? (
                                <img src={data.photoURL} alt={data.displayName} />
                            ) : (
                                '👤'
                            )}
                        </span>
                        <div>
                            <h3 className="card-title">{data.displayName}</h3>
                            {badge && (
                                <span className="author-badge badge-highlight">
                                    {badge.emoji} {badge.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-stats">
                    <div className="stat-item">
                        <span className="stat-icon">✨</span>
                        <span className="stat-value">{xp.toLocaleString()}</span>
                        <span className="stat-label">Toplam XP</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
