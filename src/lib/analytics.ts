import { analytics } from './firebase';
import { logEvent, setUserProperties, Analytics } from 'firebase/analytics';


/**
 * Firebase Analytics Service
 * Tracks user events and behaviors
 */

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title
    });
}

/**
 * Track story view
 */
export function trackStoryView(storyId: string, storyTitle: string, category: string) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'view_item', {
        item_id: storyId,
        item_name: storyTitle,
        item_category: category
    });
}

/**
 * Track story like
 */
export function trackStoryLike(storyId: string, storyTitle: string) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'like_story', {
        story_id: storyId,
        story_title: storyTitle
    });
}

/**
 * Track comment
 */
export function trackComment(storyId: string, commentLength: number) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'add_comment', {
        story_id: storyId,
        comment_length: commentLength
    });
}

/**
 * Track story creation
 */
export function trackStoryCreation(storyId: string, category: string, wordCount: number) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'create_story', {
        story_id: storyId,
        category: category,
        word_count: wordCount
    });
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, resultCount: number) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'search', {
        search_term: searchTerm,
        result_count: resultCount
    });
}

/**
 * Track share
 */
export function trackShare(storyId: string, method: string) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, 'share', {
        content_type: 'story',
        item_id: storyId,
        method: method
    });
}

/**
 * Set user properties
 */
export function setUserAnalyticsProperties(userId: string, properties: {
    badge?: string;
    totalWins?: number;
    memberSince?: string;
}) {
    if (typeof window === 'undefined' || !analytics) return;

    setUserProperties(analytics, {
        user_id: userId,
        ...properties
    });
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window === 'undefined' || !analytics) return;

    logEvent(analytics, eventName, params);
}
