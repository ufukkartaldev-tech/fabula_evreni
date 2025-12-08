import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    followUser,
    unfollowUser,
    isFollowing,
    getFollowers,
    getFollowing,
    getFollowingStories,
    getFollowerCount,
    getFollowingCount
} from '@/lib/followService'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
    db: {}
}))

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    addDoc: vi.fn(),
    getDocs: vi.fn(),
    getDoc: vi.fn(),
    doc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    deleteDoc: vi.fn(),
    writeBatch: vi.fn(),
    increment: vi.fn((value) => ({ _increment: value })),
    serverTimestamp: vi.fn(() => ({ toDate: () => new Date() })),
    Timestamp: {
        now: vi.fn(() => ({ toDate: () => new Date() }))
    }
}))

describe('FollowService', () => {
    const followerId = 'user-123'
    const followingId = 'user-456'

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('followUser', () => {
        it('should follow user successfully', async () => {
            const { getDocs, addDoc, writeBatch, doc } = await import('firebase/firestore')

            // Mock: no existing follow relationship
            vi.mocked(getDocs).mockResolvedValue({ empty: true, docs: [] } as any)
            vi.mocked(addDoc).mockResolvedValue({ id: 'follow-123' } as any)

            const mockBatch = {
                update: vi.fn(),
                commit: vi.fn().mockResolvedValue(undefined)
            }
            vi.mocked(writeBatch).mockReturnValue(mockBatch as any)

            const result = await followUser(followerId, followingId)

            expect(result.success).toBe(true)
            expect(addDoc).toHaveBeenCalled()
            expect(mockBatch.commit).toHaveBeenCalled()
        })

        it('should prevent following yourself', async () => {
            const result = await followUser(followerId, followerId)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Kendinizi takip edemezsiniz')
        })

        it('should prevent duplicate follows', async () => {
            const { getDocs } = await import('firebase/firestore')

            // Mock: existing follow relationship
            vi.mocked(getDocs).mockResolvedValue({
                empty: false,
                docs: [{ id: 'follow-123' }]
            } as any)

            const result = await followUser(followerId, followingId)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Zaten takip ediyorsunuz')
        })

        it('should handle errors gracefully', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const result = await followUser(followerId, followingId)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Takip edilemedi')
        })

        it('should increment follower and following counts', async () => {
            const { getDocs, addDoc, writeBatch, increment } = await import('firebase/firestore')

            vi.mocked(getDocs).mockResolvedValue({ empty: true, docs: [] } as any)
            vi.mocked(addDoc).mockResolvedValue({ id: 'follow-123' } as any)

            const mockBatch = {
                update: vi.fn(),
                commit: vi.fn().mockResolvedValue(undefined)
            }
            vi.mocked(writeBatch).mockReturnValue(mockBatch as any)

            await followUser(followerId, followingId)

            expect(mockBatch.update).toHaveBeenCalledTimes(2) // follower and following counts
        })
    })

    describe('unfollowUser', () => {
        it('should unfollow user successfully', async () => {
            const { getDocs, deleteDoc, writeBatch } = await import('firebase/firestore')

            // Mock: existing follow relationship
            const mockFollowDoc = { id: 'follow-123' }
            vi.mocked(getDocs).mockResolvedValue({
                empty: false,
                docs: [mockFollowDoc]
            } as any)
            vi.mocked(deleteDoc).mockResolvedValue(undefined)

            const mockBatch = {
                update: vi.fn(),
                commit: vi.fn().mockResolvedValue(undefined)
            }
            vi.mocked(writeBatch).mockReturnValue(mockBatch as any)

            const result = await unfollowUser(followerId, followingId)

            expect(result.success).toBe(true)
            expect(deleteDoc).toHaveBeenCalled()
            expect(mockBatch.commit).toHaveBeenCalled()
        })

        it('should return error if not following', async () => {
            const { getDocs } = await import('firebase/firestore')

            // Mock: no follow relationship
            vi.mocked(getDocs).mockResolvedValue({ empty: true, docs: [] } as any)

            const result = await unfollowUser(followerId, followingId)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Zaten takip etmiyorsunuz')
        })

        it('should decrement follower and following counts', async () => {
            const { getDocs, deleteDoc, writeBatch } = await import('firebase/firestore')

            const mockFollowDoc = { id: 'follow-123' }
            vi.mocked(getDocs).mockResolvedValue({
                empty: false,
                docs: [mockFollowDoc]
            } as any)
            vi.mocked(deleteDoc).mockResolvedValue(undefined)

            const mockBatch = {
                update: vi.fn(),
                commit: vi.fn().mockResolvedValue(undefined)
            }
            vi.mocked(writeBatch).mockReturnValue(mockBatch as any)

            await unfollowUser(followerId, followingId)

            expect(mockBatch.update).toHaveBeenCalledTimes(2)
        })

        it('should handle errors gracefully', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const result = await unfollowUser(followerId, followingId)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Takipten çıkılamadı')
        })
    })

    describe('isFollowing', () => {
        it('should return true if following', async () => {
            const { getDocs } = await import('firebase/firestore')

            vi.mocked(getDocs).mockResolvedValue({
                empty: false,
                docs: [{ id: 'follow-123' }]
            } as any)

            const result = await isFollowing(followerId, followingId)

            expect(result).toBe(true)
        })

        it('should return false if not following', async () => {
            const { getDocs } = await import('firebase/firestore')

            vi.mocked(getDocs).mockResolvedValue({ empty: true, docs: [] } as any)

            const result = await isFollowing(followerId, followingId)

            expect(result).toBe(false)
        })

        it('should return false on error', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const result = await isFollowing(followerId, followingId)

            expect(result).toBe(false)
        })
    })

    describe('getFollowers', () => {
        it('should return list of followers', async () => {
            const { getDocs, getDoc } = await import('firebase/firestore')

            const mockFollows = [
                { data: () => ({ followerId: 'user-1' }) },
                { data: () => ({ followerId: 'user-2' }) }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockFollows } as any)

            // Mock user profile fetches
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => ({
                    uid: 'user-1',
                    displayName: 'User 1',
                    email: 'user1@example.com'
                })
            } as any)

            const followers = await getFollowers(followingId)

            expect(followers).toHaveLength(2)
        })

        it('should return empty array if no followers', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const followers = await getFollowers(followingId)

            expect(followers).toEqual([])
        })

        it('should filter out non-existent users', async () => {
            const { getDocs, getDoc } = await import('firebase/firestore')

            const mockFollows = [
                { data: () => ({ followerId: 'user-1' }) },
                { data: () => ({ followerId: 'user-deleted' }) }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockFollows } as any)

            vi.mocked(getDoc)
                .mockResolvedValueOnce({
                    exists: () => true,
                    data: () => ({ uid: 'user-1', displayName: 'User 1' })
                } as any)
                .mockResolvedValueOnce({
                    exists: () => false
                } as any)

            const followers = await getFollowers(followingId)

            expect(followers).toHaveLength(1)
        })
    })

    describe('getFollowing', () => {
        it('should return list of following users', async () => {
            const { getDocs, getDoc } = await import('firebase/firestore')

            const mockFollows = [
                { data: () => ({ followingId: 'user-1' }) },
                { data: () => ({ followingId: 'user-2' }) }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockFollows } as any)

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => ({
                    uid: 'user-1',
                    displayName: 'User 1'
                })
            } as any)

            const following = await getFollowing(followerId)

            expect(following).toHaveLength(2)
        })

        it('should return empty array if not following anyone', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const following = await getFollowing(followerId)

            expect(following).toEqual([])
        })
    })

    describe('getFollowingStories', () => {
        it('should return stories from followed users', async () => {
            const { getDocs } = await import('firebase/firestore')

            // Mock follows
            const mockFollows = [
                { data: () => ({ followingId: 'author-1' }) },
                { data: () => ({ followingId: 'author-2' }) }
            ]

            // Mock stories
            const mockStories = [
                {
                    id: 'story-1',
                    data: () => ({
                        title: 'Story 1',
                        authorId: 'author-1',
                        createdAt: { toDate: () => new Date() }
                    })
                },
                {
                    id: 'story-2',
                    data: () => ({
                        title: 'Story 2',
                        authorId: 'author-2',
                        createdAt: { toDate: () => new Date() }
                    })
                }
            ]

            vi.mocked(getDocs)
                .mockResolvedValueOnce({ docs: mockFollows } as any)
                .mockResolvedValueOnce({ docs: mockStories } as any)

            const stories = await getFollowingStories(followerId)

            expect(stories).toHaveLength(2)
        })

        it('should return empty array if not following anyone', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const stories = await getFollowingStories(followerId)

            expect(stories).toEqual([])
        })
    })

    describe('getFollowerCount', () => {
        it('should return correct follower count', async () => {
            const { getDocs } = await import('firebase/firestore')

            const mockFollows = [
                { id: 'follow-1' },
                { id: 'follow-2' },
                { id: 'follow-3' }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockFollows } as any)

            const count = await getFollowerCount(followingId)

            expect(count).toBe(3)
        })

        it('should return 0 if no followers', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const count = await getFollowerCount(followingId)

            expect(count).toBe(0)
        })

        it('should return 0 on error', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const count = await getFollowerCount(followingId)

            expect(count).toBe(0)
        })
    })

    describe('getFollowingCount', () => {
        it('should return correct following count', async () => {
            const { getDocs } = await import('firebase/firestore')

            const mockFollows = [
                { id: 'follow-1' },
                { id: 'follow-2' }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockFollows } as any)

            const count = await getFollowingCount(followerId)

            expect(count).toBe(2)
        })

        it('should return 0 if not following anyone', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const count = await getFollowingCount(followerId)

            expect(count).toBe(0)
        })
    })
})
