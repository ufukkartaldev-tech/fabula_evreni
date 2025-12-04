'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
    signInWithGoogle as googleSignIn,
    signInWithEmail as emailSignIn,
    signUpWithEmail as emailSignUp,
    signOutUser,
    resetPassword as sendResetEmail
} from '@/lib/auth';
import { syncUserProfile, getUserProfile } from '@/lib/userService';
import { UserProfile } from '@/interfaces/User';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signInWithGoogle: (rememberMe?: boolean) => Promise<void>;
    signInWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName: string, rememberMe?: boolean) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auth state değişikliklerini dinle
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // Kullanıcı giriş yaptıysa profili senkronize et
                try {
                    const profile = await syncUserProfile(user);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Error syncing user profile:', error);
                    setUserProfile(null);
                }
            } else {
                // Kullanıcı çıkış yaptıysa profili temizle
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const refreshUserProfile = async () => {
        if (user) {
            try {
                const profile = await getUserProfile(user.uid);
                setUserProfile(profile);
            } catch (error) {
                console.error('Error refreshing user profile:', error);
            }
        }
    };

    const handleSignInWithGoogle = async (rememberMe: boolean = false) => {
        try {
            await googleSignIn(rememberMe);
        } catch (error: any) {
            throw error;
        }
    };

    const handleSignInWithEmail = async (
        email: string,
        password: string,
        rememberMe: boolean = false
    ) => {
        try {
            await emailSignIn(email, password, rememberMe);
        } catch (error: any) {
            throw error;
        }
    };

    const handleSignUpWithEmail = async (
        email: string,
        password: string,
        displayName: string,
        rememberMe: boolean = false
    ) => {
        try {
            await emailSignUp(email, password, displayName, rememberMe);
        } catch (error: any) {
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (error: any) {
            throw error;
        }
    };

    const handleResetPassword = async (email: string) => {
        try {
            await sendResetEmail(email);
        } catch (error: any) {
            throw error;
        }
    };

    const value = {
        user,
        userProfile,
        loading,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithEmail: handleSignInWithEmail,
        signUpWithEmail: handleSignUpWithEmail,
        signOut: handleSignOut,
        resetPassword: handleResetPassword,
        refreshUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
