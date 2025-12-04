'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle(rememberMe);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signInWithEmail(email, password, rememberMe);
            } else {
                if (!displayName.trim()) {
                    setError('Lütfen adınızı girin.');
                    setLoading(false);
                    return;
                }
                await signUpWithEmail(email, password, displayName, rememberMe);
            }
            onClose();
            resetForm();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await resetPassword(email);
            setResetEmailSent(true);
            setTimeout(() => {
                setShowResetPassword(false);
                setResetEmailSent(false);
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setDisplayName('');
        setError('');
        setShowPassword(false);
        setResetEmailSent(false);
        setShowResetPassword(false);
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>

                {showResetPassword ? (
                    <div className="auth-container">
                        <h2 className="auth-title">Şifre Sıfırlama</h2>
                        <p className="auth-subtitle">
                            Email adresinize şifre sıfırlama bağlantısı göndereceğiz.
                        </p>

                        {resetEmailSent ? (
                            <div className="success-message">
                                ✅ Şifre sıfırlama emaili gönderildi! Email kutunuzu kontrol edin.
                            </div>
                        ) : (
                            <form onSubmit={handleResetPassword} className="auth-form">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ornek@email.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                {error && <div className="error-message">{error}</div>}

                                <button type="submit" className="auth-button primary" disabled={loading}>
                                    {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Linki Gönder'}
                                </button>

                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => setShowResetPassword(false)}
                                >
                                    ← Geri Dön
                                </button>
                            </form>
                        )}
                    </div>
                ) : (
                    <div className="auth-container">
                        <h2 className="auth-title">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Hikayelerinize devam etmek için giriş yapın'
                                : 'Yeni bir hesap oluşturun ve hikayelere katılın'}
                        </p>

                        <button
                            className="google-button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <span className="google-icon">🔵</span>
                            Google ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                        </button>

                        <div className="divider">
                            <span>veya</span>
                        </div>

                        <form onSubmit={handleEmailAuth} className="auth-form">
                            {!isLogin && (
                                <div className="form-group">
                                    <label>Adınız</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Adınız Soyadınız"
                                        required={!isLogin}
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Şifre</label>
                                <div className="password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {!isLogin && (
                                    <small className="form-hint">En az 6 karakter olmalı</small>
                                )}
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={loading}
                                    />
                                    <span>Beni Hatırla (30 gün)</span>
                                </label>

                                {isLogin && (
                                    <button
                                        type="button"
                                        className="text-button"
                                        onClick={() => setShowResetPassword(true)}
                                    >
                                        Şifremi Unuttum
                                    </button>
                                )}
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="auth-button primary" disabled={loading}>
                                {loading
                                    ? 'İşleniyor...'
                                    : isLogin
                                        ? 'Giriş Yap'
                                        : 'Kayıt Ol'}
                            </button>
                        </form>

                        <div className="auth-switch">
                            {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                            <button className="text-button" onClick={switchMode} disabled={loading}>
                                {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
