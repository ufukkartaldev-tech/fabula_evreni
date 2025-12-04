import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    onSnapshot,
    Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';

// Bildirim tipleri
export type NotificationType =
    | 'comment'
    | 'reply'
    | 'like'
    | 'favorite'
    | 'new_follower'
    | 'badge_earned'
    | 'story_published';

export interface Notification {
    id: string;
    userId: string;          // Bildirimi alacak kullanıcı
    type: NotificationType;
    actorId?: string;        // İşlemi yapan kullanıcı (opsiyonel)
    actorName?: string;
    actorAvatar?: string;
    storyId?: string;
    storyTitle?: string;
    commentId?: string;      // Yorum bildirimleri için
    badgeName?: string;      // Rozet bildirimleri için
    message: string;
    read: boolean;
    createdAt: Date;
    actionUrl?: string;      // Tıklanınca gidilecek URL
    icon?: string;           // Emoji icon
}

// Firestore koleksiyon referansı
const notificationsCollection = collection(db, 'notifications');

// Yeni bildirim oluştur
export async function createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> {
    try {
        // Kendi kendine bildirim gönderme
        if (data.userId === data.actorId) {
            return '';
        }

        const docRef = await addDoc(notificationsCollection, {
            ...data,
            read: false,
            createdAt: Timestamp.now()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
}

// Kullanıcının bildirimlerini getir
export async function getUserNotifications(userId: string, limitCount: number = 20): Promise<Notification[]> {
    try {
        const q = query(
            notificationsCollection,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Notification[];
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

// Bildirimi okundu işaretle
export async function markAsRead(notificationId: string): Promise<void> {
    try {
        const notificationRef = doc(db, 'notifications', notificationId);
        await updateDoc(notificationRef, {
            read: true
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
}

// Tüm bildirimleri okundu işaretle
export async function markAllAsRead(userId: string): Promise<void> {
    try {
        const q = query(
            notificationsCollection,
            where('userId', '==', userId),
            where('read', '==', false)
        );

        const querySnapshot = await getDocs(q);
        const updatePromises = querySnapshot.docs.map(doc =>
            updateDoc(doc.ref, { read: true })
        );

        await Promise.all(updatePromises);
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
}

// Okunmamış bildirim sayısını getir
export async function getUnreadCount(userId: string): Promise<number> {
    try {
        const q = query(
            notificationsCollection,
            where('userId', '==', userId),
            where('read', '==', false)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error('Error getting unread count:', error);
        return 0;
    }
}

// Bildirimi sil
export async function deleteNotification(notificationId: string): Promise<void> {
    try {
        const notificationRef = doc(db, 'notifications', notificationId);
        await deleteDoc(notificationRef);
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}

// Real-time bildirim dinleyicisi
export function subscribeToNotifications(
    userId: string,
    callback: (notifications: Notification[]) => void
): Unsubscribe {
    const q = query(
        notificationsCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(20)
    );

    return onSnapshot(q, (querySnapshot) => {
        const notifications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Notification[];

        callback(notifications);
    }, (error) => {
        console.error('Error in notification subscription:', error);
    });
}

// Göreceli zaman formatı (örn: "5 dakika önce")
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Az önce';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} dakika önce`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} saat önce`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} gün önce`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} hafta önce`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} ay önce`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} yıl önce`;
}

// ============================================
// NOTIFICATION HELPERS
// ============================================

/**
 * Takip bildirimi oluştur
 */
export async function createFollowNotification(
    followedUserId: string,
    followerId: string,
    followerName: string,
    followerAvatar: string
): Promise<string> {
    return createNotification({
        userId: followedUserId,
        type: 'new_follower',
        actorId: followerId,
        actorName: followerName,
        actorAvatar: followerAvatar,
        message: `${followerName} sizi takip etmeye başladı`,
        actionUrl: `/profile/${followerId}`,
        icon: '👥'
    });
}

/**
 * Rozet kazanma bildirimi oluştur
 */
export async function createBadgeNotification(
    userId: string,
    badgeName: string,
    badgeEmoji: string
): Promise<string> {
    return createNotification({
        userId,
        type: 'badge_earned',
        badgeName,
        message: `Tebrikler! "${badgeName}" rozetini kazandınız!`,
        actionUrl: `/profile/${userId}`,
        icon: badgeEmoji
    });
}

/**
 * Hikaye yayınlama bildirimi (takipçilere)
 */
export async function notifyFollowersAboutNewStory(
    authorId: string,
    authorName: string,
    authorAvatar: string,
    storyId: string,
    storyTitle: string,
    followerIds: string[]
): Promise<void> {
    try {
        const promises = followerIds.map(followerId =>
            createNotification({
                userId: followerId,
                type: 'story_published',
                actorId: authorId,
                actorName: authorName,
                actorAvatar: authorAvatar,
                storyId,
                storyTitle,
                message: `${authorName} yeni bir hikaye yayınladı: "${storyTitle}"`,
                actionUrl: `/story/${storyId}`,
                icon: '📚'
            })
        );

        await Promise.all(promises);
    } catch (error) {
        console.error('Error notifying followers:', error);
    }
}
