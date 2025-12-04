import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    User,
    UserCredential
} from 'firebase/auth';
import { auth, setPersistence, browserLocalPersistence, browserSessionPersistence } from './firebase';

// Google Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Google ile giriş yap
 */
export async function signInWithGoogle(rememberMe: boolean = false): Promise<UserCredential> {
    try {
        // Persistence ayarla
        await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        // Google popup ile giriş
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error: any) {
        console.error('Google sign-in error:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * Email ve şifre ile kayıt ol
 */
export async function signUpWithEmail(
    email: string,
    password: string,
    displayName: string,
    rememberMe: boolean = false
): Promise<UserCredential> {
    try {
        // Persistence ayarla
        await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        // Kullanıcı oluştur
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Profil bilgilerini güncelle
        if (result.user) {
            await updateProfile(result.user, { displayName });
        }

        return result;
    } catch (error: any) {
        console.error('Sign-up error:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * Email ve şifre ile giriş yap
 */
export async function signInWithEmail(
    email: string,
    password: string,
    rememberMe: boolean = false
): Promise<UserCredential> {
    try {
        // Persistence ayarla
        await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        // Giriş yap
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error: any) {
        console.error('Sign-in error:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * Çıkış yap
 */
export async function signOutUser(): Promise<void> {
    try {
        await signOut(auth);
    } catch (error: any) {
        console.error('Sign-out error:', error);
        throw new Error('Çıkış yapılırken bir hata oluştu.');
    }
}

/**
 * Şifre sıfırlama emaili gönder
 */
export async function resetPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error('Password reset error:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * Kullanıcı profil bilgilerini güncelle
 */
export async function updateUserProfile(
    user: User,
    profile: { displayName?: string; photoURL?: string }
): Promise<void> {
    try {
        await updateProfile(user, profile);
    } catch (error: any) {
        console.error('Profile update error:', error);
        throw new Error('Profil güncellenirken bir hata oluştu.');
    }
}

/**
 * Firebase auth error kodlarını Türkçe mesajlara çevir
 */
function getAuthErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
        // Email/Password errors
        'auth/email-already-in-use': 'Bu email adresi zaten kullanılıyor.',
        'auth/invalid-email': 'Lütfen geçerli bir email adresi girin.',
        'auth/operation-not-allowed': 'Bu işlem şu anda kullanılamıyor.',
        'auth/weak-password': 'Şifre çok zayıf. En az 6 karakter olmalı.',
        'auth/user-disabled': 'Bu hesap devre dışı bırakılmış.',
        'auth/user-not-found': 'Bu email adresiyle kayıtlı kullanıcı bulunamadı.',
        'auth/wrong-password': 'Hatalı şifre. Lütfen tekrar deneyin.',
        'auth/invalid-credential': 'Geçersiz giriş bilgileri. Lütfen kontrol edin.',
        'auth/account-exists-with-different-credential': 'Bu email adresi farklı bir giriş yöntemiyle kullanılıyor.',

        // Google Sign-In errors
        'auth/popup-closed-by-user': 'Giriş penceresi kapatıldı. Lütfen tekrar deneyin.',
        'auth/cancelled-popup-request': 'Giriş işlemi iptal edildi.',
        'auth/popup-blocked': 'Popup penceresi tarayıcı tarafından engellendi. Lütfen popup engelleyiciyi kapatın.',
        'auth/unauthorized-domain': 'Bu domain yetkili değil. Lütfen yönetici ile iletişime geçin.',

        // Network errors
        'auth/network-request-failed': 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
        'auth/timeout': 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.',

        // Rate limiting
        'auth/too-many-requests': 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.',

        // Password reset errors
        'auth/expired-action-code': 'Bu bağlantının süresi dolmuş. Yeni bir şifre sıfırlama isteği gönderin.',
        'auth/invalid-action-code': 'Geçersiz veya kullanılmış bağlantı. Yeni bir şifre sıfırlama isteği gönderin.',

        // Session errors
        'auth/requires-recent-login': 'Bu işlem için yeniden giriş yapmanız gerekiyor.',
        'auth/user-token-expired': 'Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.',

        // Missing information
        'auth/missing-email': 'Lütfen email adresinizi girin.',
        'auth/missing-password': 'Lütfen şifrenizi girin.',

        // Internal errors
        'auth/internal-error': 'Bir sistem hatası oluştu. Lütfen daha sonra tekrar deneyin.',
        'auth/invalid-api-key': 'Geçersiz API anahtarı. Lütfen yönetici ile iletişime geçin.',
        'auth/app-deleted': 'Uygulama yapılandırması bulunamadı.',
    };

    return errorMessages[errorCode] || 'Bir hata oluştu. Lütfen tekrar deneyin.';
}

/**
 * Mevcut kullanıcıyı al
 */
export function getCurrentUser(): User | null {
    return auth.currentUser;
}
