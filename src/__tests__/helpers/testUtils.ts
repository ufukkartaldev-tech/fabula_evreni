import { Story } from '@/interfaces/Story'
import { UserProfile } from '@/interfaces/User'
import { Comment } from '@/interfaces/Comment'
import { Draft } from '@/interfaces/Draft'
import { BADGES } from '@/interfaces/Badge'
import { Timestamp } from 'firebase/firestore'
import { vi } from 'vitest'

// Notification interface (if not exists, define it here)
interface Notification {
    id: string
    userId: string
    type: 'like' | 'comment' | 'follow' | 'mention'
    message: string
    read: boolean
    createdAt: Date
    actionUrl?: string
    actorName?: string
    actorAvatar?: string
}

/**
 * Factory function to create mock user profiles
 */
export function createMockUser(overrides?: Partial<UserProfile>): UserProfile {
    const defaultUser: UserProfile = {
        uid: `user-${Math.random().toString(36).substr(2, 9)}`,
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
        totalWins: 0,
        xp: 0,
        currentBadge: BADGES[0].name,
        createdAt: new Date(),
        lastUpdated: new Date(),
        role: 'writer',
        bio: 'Test user bio',
        followerCount: 0,
        followingCount: 0
    }

    return { ...defaultUser, ...overrides }
}

/**
 * Factory function to create mock stories
 */
export function createMockStory(overrides?: Partial<Story>): Story {
    const defaultStory: Story = {
        id: `story-${Math.random().toString(36).substr(2, 9)}`,
        title: 'Test Story',
        content: 'This is a test story content with enough words to be valid.',
        excerpt: 'Test story excerpt',
        authorId: 'user-123',
        author: {
            name: 'Test Author',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=author'
        },
        category: 'Fantastik',
        createdAt: new Date(),
        stats: {
            views: 0,
            likes: 0,
            comments: 0
        },
        type: 'linear',
        status: 'ACTIVE'
    }

    return { ...defaultStory, ...overrides }
}

/**
 * Factory function to create mock interactive stories
 */
export function createMockInteractiveStory(overrides?: Partial<Story>): Story {
    const baseStory = createMockStory({
        type: 'interactive',
        mode: 'community',
        nodes: {
            'root': {
                id: 'root',
                content: 'You wake up in a mysterious room. What do you do?',
                choices: [
                    {
                        id: 'choice-1',
                        text: 'Look around the room',
                        nextNodeId: 'branch-1',
                        votes: 5
                    },
                    {
                        id: 'choice-2',
                        text: 'Try to open the door',
                        nextNodeId: 'branch-2',
                        votes: 3
                    }
                ]
            }
        },
        startNodeId: 'root'
    })

    return { ...baseStory, ...overrides }
}

/**
 * Factory function to create mock comments
 */
export function createMockComment(overrides?: Partial<Comment>): Comment {
    const defaultComment: Comment = {
        id: `comment-${Math.random().toString(36).substr(2, 9)}`,
        storyId: 'story-123',
        userId: 'user-123',
        userName: 'Test User',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=commenter',
        author: {
            name: 'Test User',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=commenter'
        },
        content: 'This is a test comment.',
        createdAt: new Date(),
        likes: 0,
        replies: []
    }

    return { ...defaultComment, ...overrides }
}

/**
 * Factory function to create mock drafts
 */
export function createMockDraft(overrides?: Partial<Draft>): Draft {
    const defaultDraft: Draft = {
        id: `draft-${Math.random().toString(36).substr(2, 9)}`,
        userId: 'user-123',
        title: 'Draft Story',
        content: 'This is a draft story content.',
        excerpt: 'Draft excerpt',
        category: 'Fantastik',
        coverImage: undefined,
        autoSaveEnabled: true,
        createdAt: createFirestoreTimestamp(new Date()) as any,
        lastSaved: createFirestoreTimestamp(new Date()) as any
    }

    return { ...defaultDraft, ...overrides }
}

/**
 * Factory function to create mock notifications
 */
export function createMockNotification(overrides?: Partial<Notification>): Notification {
    const defaultNotification: Notification = {
        id: `notification-${Math.random().toString(36).substr(2, 9)}`,
        userId: 'user-123',
        type: 'like',
        message: 'Someone liked your story',
        read: false,
        createdAt: new Date(),
        actionUrl: '/story/story-123',
        actorName: 'Test Actor',
        actorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=actor'
    }

    return { ...defaultNotification, ...overrides }
}

/**
 * Create multiple mock items
 */
export function createMockUsers(count: number, overrides?: Partial<UserProfile>): UserProfile[] {
    return Array.from({ length: count }, (_, i) =>
        createMockUser({
            ...overrides,
            uid: `user-${i}`,
            displayName: `Test User ${i}`,
            email: `user${i}@example.com`
        })
    )
}

export function createMockStories(count: number, overrides?: Partial<Story>): Story[] {
    return Array.from({ length: count }, (_, i) =>
        createMockStory({
            ...overrides,
            id: `story-${i}`,
            title: `Test Story ${i}`
        })
    )
}

export function createMockComments(count: number, overrides?: Partial<Comment>): Comment[] {
    return Array.from({ length: count }, (_, i) =>
        createMockComment({
            ...overrides,
            id: `comment-${i}`,
            content: `Test comment ${i}`
        })
    )
}

/**
 * Wait for async operations (useful in tests)
 */
export function waitFor(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Simulate Firestore Timestamp
 */
export function createFirestoreTimestamp(date: Date = new Date()) {
    return {
        toDate: () => date,
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: (date.getTime() % 1000) * 1000000
    }
}

/**
 * Create mock Firestore document
 */
export function createMockFirestoreDoc<T>(id: string, data: T) {
    return {
        id,
        exists: () => true,
        data: () => data,
        ref: {
            id,
            path: `collection/${id}`
        }
    }
}

/**
 * Create mock Firestore query snapshot
 */
export function createMockQuerySnapshot<T>(docs: Array<{ id: string; data: T }>) {
    return {
        docs: docs.map(doc => createMockFirestoreDoc(doc.id, doc.data)),
        empty: docs.length === 0,
        size: docs.length,
        forEach: (callback: (doc: any) => void) => {
            docs.forEach(doc => callback(createMockFirestoreDoc(doc.id, doc.data)))
        }
    }
}

/**
 * Generate random string
 */
export function randomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2)
}

/**
 * Generate random number in range
 */
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Create mock file for upload tests
 */
export function createMockFile(
    name: string = 'test-image.jpg',
    size: number = 1024,
    type: string = 'image/jpeg'
): File {
    const blob = new Blob(['test content'], { type })
    return new File([blob], name, { type })
}

/**
 * Delay execution
 */
export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Mock localStorage
 */
export function createMockLocalStorage() {
    const store: Record<string, string> = {}

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            Object.keys(store).forEach(key => delete store[key])
        },
        get length() {
            return Object.keys(store).length
        },
        key: (index: number) => {
            const keys = Object.keys(store)
            return keys[index] || null
        }
    }
}

/**
 * Mock IntersectionObserver for infinite scroll tests
 */
export function mockIntersectionObserver() {
    global.IntersectionObserver = class IntersectionObserver {
        constructor(
            public callback: IntersectionObserverCallback,
            public options?: IntersectionObserverInit
        ) { }

        observe() {
            return null
        }

        unobserve() {
            return null
        }

        disconnect() {
            return null
        }

        takeRecords() {
            return []
        }

        root = null
        rootMargin = ''
        thresholds = []
    } as any
}

/**
 * Mock window.matchMedia for responsive tests
 */
export function mockMatchMedia(matches: boolean = false) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
}
