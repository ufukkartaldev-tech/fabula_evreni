'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToNotifications, Notification } from '@/lib/notificationService';

export default function LevelUpToast() {
    const { user } = useAuth();
    const [toast, setToast] = useState<{ visible: boolean; message: string; badgeName?: string; icon?: string } | null>(null);

    useEffect(() => {
        if (!user) return;

        // Subscribe to notifications to catch 'badge_earned'
        const unsubscribe = subscribeToNotifications(user.uid, (notifications) => {
            // Check if the most recent notification is a badge_earned and is unread
            // We only want to show toast for very recent ones to avoid spam on page load
            // But for simplicity, let's just check the top one if it's new

            const latest = notifications[0];
            if (latest && latest.type === 'badge_earned' && !latest.read) {
                // Check if this notification was created in the last 10 seconds
                const now = new Date();
                const diff = now.getTime() - latest.createdAt.getTime();

                if (diff < 10000) { // 10 seconds
                    setToast({
                        visible: true,
                        message: latest.message,
                        badgeName: latest.badgeName,
                        icon: latest.icon
                    });

                    // Hide after 5 seconds
                    setTimeout(() => {
                        setToast(null);
                    }, 5000);
                }
            }
        });

        return () => unsubscribe();
    }, [user]);

    if (!toast || !toast.visible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-2xl flex items-center gap-4 border-4 border-white/30 backdrop-blur-sm">
                <div className="text-4xl animate-pulse">
                    {toast.icon || '🏆'}
                </div>
                <div>
                    <h4 className="font-bold text-lg uppercase tracking-wider text-yellow-100">Seviye Atladın!</h4>
                    <p className="font-medium text-white text-lg">{toast.badgeName}</p>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-ping">
                    YENİ!
                </div>
            </div>
            {/* Confetti effect could be added here via CSS or a library */}
        </div>
    );
}
