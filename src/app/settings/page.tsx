'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProfile, updateUserProfile } from '@/lib/userService';
import { UserProfile } from '@/interfaces/User';
import AvatarUpload from '@/app/components/AvatarUpload';
import { updateProfile } from 'firebase/auth';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            loadProfile();
        }
    }, [user, loading, router]);

    const loadProfile = async () => {
        if (!user) return;
        try {
            const userProfile = await getUserProfile(user.uid);
            if (userProfile) {
                setProfile(userProfile);
                setDisplayName(userProfile.displayName || '');
                setBio(userProfile.bio || '');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        setMessage(null);

        try {
            // Update Firestore
            await updateUserProfile(user.uid, {
                displayName,
                bio
            });

            // Update Auth Profile (for immediate UI updates in header etc)
            await updateProfile(user, {
                displayName: displayName
            });

            setMessage({ type: 'success', text: 'Profil başarıyla güncellendi!' });

            // Refresh profile data
            loadProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'Profil güncellenirken bir hata oluştu.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarUpdate = async (url: string) => {
        if (!user) return;

        try {
            // Update Auth Profile
            await updateProfile(user, {
                photoURL: url
            });

            // Update Firestore
            await updateUserProfile(user.uid, {
                photoURL: url
            });

            setMessage({ type: 'success', text: 'Profil fotoğrafı güncellendi!' });
            loadProfile();
        } catch (error) {
            console.error('Error updating avatar:', error);
            setMessage({ type: 'error', text: 'Profil fotoğrafı güncellenemedi.' });
        }
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ayarlar</h1>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profil Bilgileri</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Herkese açık profil bilgilerinizi buradan güncelleyebilirsiniz.
                        </p>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                <AvatarUpload
                                    userId={user!.uid}
                                    currentAvatar={profile?.photoURL || undefined}
                                    onUploadComplete={handleAvatarUpdate}
                                    onError={(err) => setMessage({ type: 'error', text: err })}
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profil Fotoğrafı</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    JPG, GIF veya PNG. Maksimum 5MB.
                                </p>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* Form Section */}
                        <form onSubmit={handleSave} className="space-y-6">
                            {message && (
                                <div className={`p-4 rounded-md ${message.type === 'success'
                                        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                        : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    E-posta Adresi
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    disabled
                                    value={user?.email || ''}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    E-posta adresi değiştirilemez.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Görünen İsim
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Hakkımda (Biyografi)
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    placeholder="Kendinizden kısaca bahsedin..."
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Profilinizde görünecek kısa bir açıklama.
                                </p>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
