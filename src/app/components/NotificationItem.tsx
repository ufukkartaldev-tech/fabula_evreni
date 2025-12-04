'use client';

import { useRouter } from 'next/navigation';
import { Notification } from '@/lib/notificationService';
import { getRelativeTime } from '@/lib/notificationService';

interface NotificationItemProps {
    notification: Notification;
    onRead: (id: string) => void;
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
    const router = useRouter();

    // Bildirim tipine göre icon
    const getNotificationIcon = () => {
        if (notification.icon) {
            return notification.icon;
        }

        switch (notification.type) {
            case 'comment':
            case 'reply':
                return '💬';
            case 'like':
                return '❤️';
            case 'favorite':
                return '⭐';
            case 'new_follower':
                return '👥';
            case 'badge_earned':
                return '🏆';
            case 'story_published':
                return '📚';
            default:
                return '🔔';
        }
    };

    const handleClick = () => {
        // Okunmadıysa okundu işaretle
        if (!notification.read) {
            onRead(notification.id);
        }

        // Action URL'e git
        if (notification.actionUrl) {
            router.push(notification.actionUrl);
        } else if (notification.storyId) {
            router.push(`/story/${notification.storyId}`);
        }
    };

    return (
        <div
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            onClick={handleClick}
        >
            <div className="notification-icon">
                {getNotificationIcon()}
            </div>

            <div className="notification-content">
                <div className="notification-header">
                    {notification.actorAvatar && (
                        <img
                            src={notification.actorAvatar}
                            alt={notification.actorName || ''}
                            className="notification-avatar"
                        />
                    )}
                    <span className="notification-actor">{notification.actorName}</span>
                </div>

                <p className="notification-message">{notification.message}</p>

                {notification.storyTitle && (
                    <span className="notification-story-title">
                        "{notification.storyTitle}"
                    </span>
                )}

                <span className="notification-time">
                    {getRelativeTime(notification.createdAt)}
                </span>
            </div>

            {!notification.read && (
                <div className="notification-unread-indicator"></div>
            )}
        </div>
    );
}
