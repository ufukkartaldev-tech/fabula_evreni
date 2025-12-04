'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Notification, subscribeToNotifications, getUnreadCount } from '@/lib/notificationService';
import NotificationPanel from './NotificationPanel';

export default function NotificationBell() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showPanel, setShowPanel] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Real-time bildirim dinleyicisi
    useEffect(() => {
        if (!user) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        const unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
            setNotifications(newNotifications);
            const unread = newNotifications.filter(n => !n.read).length;
            setUnreadCount(unread);
        });

        return () => unsubscribe();
    }, [user]);

    // Panel dışına tıklandığında kapat
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setShowPanel(false);
            }
        }

        if (showPanel) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showPanel]);

    const handleNotificationsUpdate = async () => {
        // Bildirimleri yeniden yükle
        if (user) {
            const count = await getUnreadCount(user.uid);
            setUnreadCount(count);
        }
    };

    if (!user) return null;

    return (
        <div className="notification-bell-wrapper" ref={panelRef}>
            <button
                className="notification-bell"
                onClick={() => setShowPanel(!showPanel)}
                title="Bildirimler"
            >
                <span className="bell-icon">🔔</span>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {showPanel && (
                <NotificationPanel
                    notifications={notifications}
                    onClose={() => setShowPanel(false)}
                    onNotificationsUpdate={handleNotificationsUpdate}
                />
            )}
        </div>
    );
}
