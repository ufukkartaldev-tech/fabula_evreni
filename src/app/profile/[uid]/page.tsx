/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile } from '@/lib/userService';
import { getUserStories, getUserStats } from '@/lib/profileService';
import { getUserBadge, getXPToNextBadge, badges } from '@/interfaces/Badge';
import { Story } from '@/interfaces/Story';
import StoryCard from '@/app/components/StoryCard';
import FollowButton from '@/app/components/FollowButton';

import Link from 'next/link';

interface ProfilePageProps {
    params: Promise<{ uid: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
    const { user: currentUser } = useAuth();
    const [uid, setUid] = useState<string>('');
    const [userProfile, setUserProfile] = useState<any>(null);
    const [userStories, setUserStories] = useState<Story[]>([]);
    const [stats, setStats] = useState({
        storiesCount: 0,
        commentsCount: 0,
        totalViews: 0,
        totalLikes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadParams() {
            const resolvedParams = await params;
            setUid(resolvedParams.uid);
        }
        loadParams();
    }, [params]);

    useEffect(() => {
        if (!uid) return;

        async function fetchProfileData() {
            try {
                const [profile, stories, userStats] = await Promise.all([
                    getUserProfile(uid),
                    getUserStories(uid),
                    getUserStats(uid)
                ]);

                setUserProfile(profile);
                setUserStories(stories);
                setStats(userStats);
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfileData();
    }, [uid]);

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Profil yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <div className="empty-state">
                        <span className="empty-icon">❌</span>
                        <h2>Kullanıcı Bulunamadı</h2>
                    </div>
                </div>
            </div>
        );
    }

    const userXP = userProfile.xp || 0;
    const currentBadge = getUserBadge(userXP);
    const nextBadgeInfo = getXPToNextBadge(userXP);
    const isOwnProfile = currentUser?.uid === uid;

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        {userProfile.photoURL ? (
                            <img src={userProfile.photoURL} alt={userProfile.displayName} />
                        ) : (
                            <span className="avatar-placeholder">👤</span>
                        )}
                    </div>
                    <div className="profile-info">
                        <div className="profile-name-row flex items-center gap-4">
                            <h1 className="profile-name">{userProfile.displayName}</h1>
                            {!isOwnProfile ? (
                                <FollowButton
                                    userId={uid}
                                    userName={userProfile.displayName}
                                    userAvatar={userProfile.photoURL || ''}
                                    size="medium"
                                />
                            ) : (
                                <Link
                                    href="/settings"
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <span>⚙️</span>
                                    <span>Profili Düzenle</span>
                                </Link>
                            )}
                        </div>
                        {currentBadge && (
                            <div className="profile-badge">
                                <span className="badge-emoji">{currentBadge.emoji}</span>
                                <span className="badge-name">{currentBadge.name}</span>
                            </div>
                        )}
                        {/* Takipçi/Takip Edilen Sayıları */}
                        <div className="profile-follow-stats">
                            <span className="follow-stat">
                                <strong>{userProfile.followerCount || 0}</strong> Takipçi
                            </span>
                            <span className="follow-stat">
                                <strong>{userProfile.followingCount || 0}</strong> Takip
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            {userProfile.bio && (
                <div className="profile-bio mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hakkımda</h3>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                        {userProfile.bio}
                    </p>
                </div>
            )}

            {/* XP & Level Progress */}
            <div className="xp-progress-section mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Mevcut Seviye</span>
                        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{currentBadge.name}</h3>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Toplam XP</span>
                        <h3 className="text-xl font-bold">{userXP} XP</h3>
                    </div>
                </div>

                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out"
                        style={{ width: `${nextBadgeInfo.progress}%` }}
                    ></div>
                </div>

                {nextBadgeInfo.nextBadge ? (
                    <p className="text-sm text-center mt-2 text-gray-500">
                        Sonraki seviye <strong>{nextBadgeInfo.nextBadge.name}</strong> için
                        <span className="font-bold text-indigo-500"> {nextBadgeInfo.remainingXP} XP</span> daha kazanmalısın.
                    </p>
                ) : (
                    <p className="text-sm text-center mt-2 text-yellow-500 font-bold">
                        🏆 Zirvedesin! Efsanevi bir yazarsın.
                    </p>
                )}
            </div>

            {/* Stats */}
            <div className="profile-stats">
                <div className="stat-card">
                    <span className="stat-icon">📚</span>
                    <span className="stat-value">{stats.storiesCount}</span>
                    <span className="stat-label">Hikaye</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">💬</span>
                    <span className="stat-value">{stats.commentsCount}</span>
                    <span className="stat-label">Yorum</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">👁️</span>
                    <span className="stat-value">{stats.totalViews}</span>
                    <span className="stat-label">Görüntülenme</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">❤️</span>
                    <span className="stat-value">{stats.totalLikes}</span>
                    <span className="stat-label">Beğeni</span>
                </div>
            </div>

            {/* Badge Showcase */}
            <div className="badge-showcase">
                <h2 className="section-title">🏆 Rozet Koleksiyonu</h2>
                <div className="badges-grid">
                    {badges.map((badge) => {
                        const isUnlocked = userXP >= badge.requiredXP;
                        return (
                            <div
                                key={badge.id}
                                className={`badge-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                                title={`${badge.name} - ${badge.description}`}
                            >
                                <span className="badge-emoji">{badge.emoji}</span>
                                <span className="badge-name">{badge.name}</span>
                                {!isUnlocked && (
                                    <span className="badge-lock">🔒</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* User Stories */}
            <div className="user-stories-section">
                <h2 className="section-title">
                    📚 {isOwnProfile ? 'Hikayelerim' : 'Hikayeleri'}
                </h2>
                {userStories.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <p>Henüz hikaye yazılmamış.</p>
                    </div>
                ) : (
                    <div className="stories-grid">
                        {userStories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
