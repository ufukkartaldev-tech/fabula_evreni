/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBadge, getXPToNextBadge } from '@/interfaces/Badge';
import Badge from './Badge';
import Link from 'next/link';

export default function UserMenu() {
    const { user, userProfile, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsOpen(false);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    if (!user) return null;

    const displayName = user.displayName || 'Kullanıcı';
    const avatar = user.photoURL || '👤';
    const userXP = userProfile ? (userProfile.xp || 0) : 0;
    const currentBadge = userProfile ? getUserBadge(userXP) : null;
    const nextBadgeInfo = userProfile ? getXPToNextBadge(userXP) : null;

    return (
        <div className="user-menu" ref={menuRef}>
            <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
                {user.photoURL ? (
                    <img src={avatar} alt={displayName} className="user-avatar-img" />
                ) : (
                    <span className="user-avatar-emoji">{avatar}</span>
                )}
                <span className="user-name">{displayName}</span>
                {currentBadge && <span className="user-badge-icon">{currentBadge.emoji}</span>}
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="user-menu-dropdown">
                    <div className="user-menu-header">
                        <div className="user-menu-info">
                            <strong>{displayName}</strong>
                            <small>{user.email}</small>
                        </div>
                        {currentBadge && userProfile && (
                            <div className="user-menu-badge">
                                <Badge badge={currentBadge} size="medium" showName />
                                <div className="user-stats">
                                    <span className="stat-item">
                                        <span className="stat-icon">✨</span>
                                        {userXP} XP
                                    </span>
                                    {nextBadgeInfo && nextBadgeInfo.nextBadge && (
                                        <span className="stat-item next-badge">
                                            <span className="stat-icon">⭐</span>
                                            {nextBadgeInfo.remainingXP} XP sonraki rozete
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="user-menu-divider"></div>

                    <Link href="/profile" className="user-menu-item" onClick={() => setIsOpen(false)}>
                        <span>👤</span>
                        Profilim
                    </Link>

                    <Link href="/my-stories" className="user-menu-item" onClick={() => setIsOpen(false)}>
                        <span>📚</span>
                        Hikayelerim
                    </Link>

                    <Link href="/favorites" className="user-menu-item" onClick={() => setIsOpen(false)}>
                        <span>⭐</span>
                        Favorilerim
                    </Link>

                    <Link href="/collections" className="user-menu-item" onClick={() => setIsOpen(false)}>
                        <span>📂</span>
                        Okuma Listelerim
                    </Link>

                    <Link href="/settings" className="user-menu-item" onClick={() => setIsOpen(false)}>
                        <span>⚙️</span>
                        Ayarlar
                    </Link>

                    <div className="user-menu-divider"></div>

                    <button className="user-menu-item logout" onClick={handleSignOut}>
                        <span>🚪</span>
                        Çıkış Yap
                    </button>
                </div>
            )}
        </div>
    );
}
