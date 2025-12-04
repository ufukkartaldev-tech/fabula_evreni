'use client';

import { useEffect, useState } from 'react';
import { Notification, markAsRead, markAllAsRead } from '@/lib/notificationService';
import NotificationItem from './NotificationItem';

interface NotificationPanelProps {
    notifications: Notification[];
    onClose: () => void;
    onNotificationsUpdate: () => void;
}

export default function NotificationPanel({ notifications, onClose, onNotificationsUpdate }: NotificationPanelProps) {
    const [isMarkingAll, setIsMarkingAll] = useState(false);

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await markAsRead(notificationId);
            onNotificationsUpdate();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        if (isMarkingAll) return;

        setIsMarkingAll(true);
        try {
            const userId = notifications[0]?.userId;
            if (userId) {
                await markAllAsRead(userId);
                onNotificationsUpdate();
            }
        } catch (error) {
            console.error('Error marking all as read:', error);
        } finally {
            setIsMarkingAll(false);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notification-panel">
            <div className="notification-panel-header">
                <h3>Bildirimler</h3>
                {unreadCount > 0 && (
                    <button
                        className="mark-all-read-button"
                        onClick={handleMarkAllAsRead}
                        disabled={isMarkingAll}
                    >
                        {isMarkingAll ? 'İşleniyor...' : 'Tümünü okundu işaretle'}
                    </button>
                )}
            </div>

            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="empty-notifications">
                        <span className="empty-icon">🔔</span>
                        <p>Henüz bildiriminiz yok</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={handleMarkAsRead}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
