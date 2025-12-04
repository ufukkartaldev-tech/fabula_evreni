'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

export default function Header() {
    const { user, loading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <>
            <header className="app-header">
                <div className="header-container">
                    <Link href="/" className="header-logo">
                        <span className="logo-icon">📖</span>
                        <span className="logo-text">Fabula</span>
                    </Link>

                    <nav className="header-nav">
                        <Link href="/" className="nav-link">
                            Ana Sayfa
                        </Link>
                        <Link href="/stories" className="nav-link">
                            Hikayeler
                        </Link>
                        {user && (
                            <>
                                <Link href="/drafts" className="nav-link">
                                    <span className="nav-icon">📝</span>
                                    Taslaklar
                                </Link>
                                <Link href="/favorites" className="nav-link">
                                    <span className="nav-icon">⭐</span>
                                    Favoriler
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle />
                        {user && <NotificationBell />}
                        {loading ? (
                            <span className="auth-loading">Yükleniyor...</span>
                        ) : user ? (
                            <UserMenu />
                        ) : (
                            <button
                                className="login-button"
                                onClick={() => setShowAuthModal(true)}
                            >
                                <span>🔐</span>
                                Giriş Yap
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}
