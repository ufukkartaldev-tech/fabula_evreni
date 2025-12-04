'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getAllBadges, getUserBadge, getXPToNextBadge } from '@/interfaces/Badge';
import Link from 'next/link';

export default function BadgesPage() {
    const { user, userProfile } = useAuth();
    const allBadges = getAllBadges();

    const userXP = userProfile?.xp || 0;
    const currentBadge = getUserBadge(userXP);
    const nextBadgeInfo = getXPToNextBadge(userXP);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        🏆 Rozetler ve Seviyeler
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Fabula evreninde yükselmek için XP kazan, yeni rozetlerin kilidini aç ve efsane ol!
                    </p>
                </div>

                {/* User Progress Card */}
                {user && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 border border-indigo-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="text-6xl">{currentBadge.emoji}</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {currentBadge.name}
                                    </h2>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                        {userXP} XP
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 w-full md:max-w-md">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">İlerleme</span>
                                    {nextBadgeInfo.nextBadge ? (
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Sonraki: <strong>{nextBadgeInfo.nextBadge.name}</strong>
                                        </span>
                                    ) : (
                                        <span className="text-yellow-500 font-bold">Maksimum Seviye!</span>
                                    )}
                                </div>
                                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000"
                                        style={{ width: `${nextBadgeInfo.progress}%` }}
                                    ></div>
                                </div>
                                {nextBadgeInfo.nextBadge && (
                                    <p className="text-xs text-right mt-1 text-gray-500">
                                        {nextBadgeInfo.remainingXP} XP daha gerekli
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Badges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allBadges.map((badge) => {
                        const isUnlocked = userXP >= badge.requiredXP;
                        const isNext = nextBadgeInfo.nextBadge?.id === badge.id;

                        return (
                            <div
                                key={badge.id}
                                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${isUnlocked
                                        ? 'bg-white dark:bg-gray-800 shadow-md border-l-4 border-green-500'
                                        : isNext
                                            ? 'bg-white dark:bg-gray-800 shadow-md border-l-4 border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900'
                                            : 'bg-gray-100 dark:bg-gray-800/50 opacity-70 border-l-4 border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`text-4xl ${isUnlocked ? 'scale-110' : 'grayscale opacity-50'}`}>
                                            {badge.emoji}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                {badge.name}
                                                {isUnlocked && <span className="text-green-500 text-xs bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded-full">Kazanıldı</span>}
                                                {isNext && <span className="text-indigo-500 text-xs bg-indigo-100 dark:bg-indigo-900 px-2 py-0.5 rounded-full">Sıradaki Hedef</span>}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {badge.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-lg font-bold ${isUnlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                                            }`}>
                                            {badge.requiredXP} XP
                                        </span>
                                        {!isUnlocked && (
                                            <div className="text-2xl mt-1 opacity-20">🔒</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* How to Earn XP */}
                <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Nasıl XP Kazanırım?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                            <div className="text-3xl mb-3">✍️</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Hikaye Yaz</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Her yeni hikaye bölümü veya dalı için XP kazan.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                            <div className="text-3xl mb-3">📖</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Okuma Yap</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Hikayeleri okuyarak ve sonuna kadar giderek XP topla.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Etkileşim</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Yorum yap, beğen ve topluluğa katkıda bulun.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
