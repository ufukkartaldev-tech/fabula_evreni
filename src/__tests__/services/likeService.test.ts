import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    toggleStoryLike,
    toggleCommentLike,
    isStoryLiked,
    isCommentLiked,
    getUserLikedStories,
    getUserLikedComments
} from '@/lib/likeService'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
    db: {}
}))

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    deleteDoc: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    runTransaction: vi.fn(),
    increment: vi.fn((value) => ({ _increment: value })),
    Timestamp: {
        now: vi.fn(() => ({ toDate: () => new Date() }))
    }
}))

describe('LikeService', () => {
    const userId = 'user-123'
    const storyId = 'story-456'
    const commentId = 'comment-789'

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('toggleStoryLike', () => {
        it('should add like if not already liked', async () => {
            const { runTransaction } = await import('firebase/firestore')

            // Mock transaction to simulate adding a like
            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => false }) // like doesn't exist
                        .mockResolvedValueOnce({ exists: () => true }), // story exists
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            const result = await toggleStoryLike(userId, storyId)

            expect(result).toBe(true) // Like added
        })

        it('should remove like if already liked', async () => {
            const { runTransaction } = await import('firebase/firestore')

            // Mock transaction to simulate removing a like
            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => true }) // like exists
                        .mockResolvedValueOnce({ exists: () => true }), // story exists
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            const result = await toggleStoryLike(userId, storyId)

            expect(result).toBe(false) // Like removed
        })

        it('should throw error if story does not exist', async () => {
            const { runTransaction } = await import('firebase/firestore')

            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => false }) // like doesn't exist
                        .mockResolvedValueOnce({ exists: () => false }), // story doesn't exist
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            await expect(toggleStoryLike(userId, storyId)).rejects.toThrow('Story does not exist!')
        })

        it('should handle transaction errors', async () => {
            const { runTransaction } = await import('firebase/firestore')
            vi.mocked(runTransaction).mockRejectedValue(new Error('Transaction failed'))

            await expect(toggleStoryLike(userId, storyId)).rejects.toThrow('Transaction failed')
        })
    })

    describe('toggleCommentLike', () => {
        it('should add like if not already liked', async () => {
            const { runTransaction } = await import('firebase/firestore')

            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => false }) // like doesn't exist
                        .mockResolvedValueOnce({ exists: () => true }), // comment exists
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            const result = await toggleCommentLike(userId, commentId)

            expect(result).toBe(true)
        })

        it('should remove like if already liked', async () => {
            const { runTransaction } = await import('firebase/firestore')

            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => true }) // like exists
                        .mockResolvedValueOnce({ exists: () => true }), // comment exists
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            const result = await toggleCommentLike(userId, commentId)

            expect(result).toBe(false)
        })

        it('should throw error if comment does not exist', async () => {
            const { runTransaction } = await import('firebase/firestore')

            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => false })
                        .mockResolvedValueOnce({ exists: () => false }),
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            await expect(toggleCommentLike(userId, commentId)).rejects.toThrow('Comment does not exist!')
        })
    })

    describe('isStoryLiked', () => {
        it('should return true if story is liked', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true
            } as any)

            const result = await isStoryLiked(userId, storyId)

            expect(result).toBe(true)
        })

        it('should return false if story is not liked', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            const result = await isStoryLiked(userId, storyId)

            expect(result).toBe(false)
        })

        it('should return false on error', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'))

            const result = await isStoryLiked(userId, storyId)

            expect(result).toBe(false)
        })
    })

    describe('isCommentLiked', () => {
        it('should return true if comment is liked', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true
            } as any)

            const result = await isCommentLiked(userId, commentId)

            expect(result).toBe(true)
        })

        it('should return false if comment is not liked', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            const result = await isCommentLiked(userId, commentId)

            expect(result).toBe(false)
        })
    })

    describe('getUserLikedStories', () => {
        it('should return array of liked story IDs', async () => {
            const { getDocs } = await import('firebase/firestore')
            const mockDocs = [
                { data: () => ({ targetId: 'story-1' }) },
                { data: () => ({ targetId: 'story-2' }) },
                { data: () => ({ targetId: 'story-3' }) }
            ]

            vi.mocked(getDocs).mockResolvedValue({
                docs: mockDocs
            } as any)

            const result = await getUserLikedStories(userId)

            expect(result).toEqual(['story-1', 'story-2', 'story-3'])
        })

        it('should return empty array if no likes', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({
                docs: []
            } as any)

            const result = await getUserLikedStories(userId)

            expect(result).toEqual([])
        })

        it('should return empty array on error', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const result = await getUserLikedStories(userId)

            expect(result).toEqual([])
        })
    })

    describe('getUserLikedComments', () => {
        it('should return array of liked comment IDs', async () => {
            const { getDocs } = await import('firebase/firestore')
            const mockDocs = [
                { data: () => ({ targetId: 'comment-1' }) },
                { data: () => ({ targetId: 'comment-2' }) }
            ]

            vi.mocked(getDocs).mockResolvedValue({
                docs: mockDocs
            } as any)

            const result = await getUserLikedComments(userId)

            expect(result).toEqual(['comment-1', 'comment-2'])
        })

        it('should return empty array if no likes', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({
                docs: []
            } as any)

            const result = await getUserLikedComments(userId)

            expect(result).toEqual([])
        })
    })

    describe('Race Condition Tests', () => {
        it('should handle concurrent like attempts safely', async () => {
            const { runTransaction } = await import('firebase/firestore')

            // Simulate transaction retry on conflict
            let attemptCount = 0
            vi.mocked(runTransaction).mockImplementation(async (db, callback) => {
                attemptCount++
                if (attemptCount === 1) {
                    throw new Error('Transaction conflict')
                }
                const mockTransaction = {
                    get: vi.fn()
                        .mockResolvedValueOnce({ exists: () => false })
                        .mockResolvedValueOnce({ exists: () => true }),
                    set: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn()
                }
                return callback(mockTransaction as any)
            })

            // First attempt should fail, second should succeed
            await expect(toggleStoryLike(userId, storyId)).rejects.toThrow('Transaction conflict')

            const result = await toggleStoryLike(userId, storyId)
            expect(result).toBe(true)
        })
    })
})
