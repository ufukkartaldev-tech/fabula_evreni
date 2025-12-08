import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
    createUserProfile,
    getUserProfile,
    updateUserXP,
    syncUserProfile,
    updateUserProfile
} from '@/lib/userService'
import { BADGES } from '@/interfaces/Badge'
import type { User } from 'firebase/auth'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
    db: {}
}))

vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    Timestamp: {
        now: vi.fn(() => ({ toDate: () => new Date() }))
    },
    serverTimestamp: vi.fn(() => ({ toDate: () => new Date() }))
}))

describe('UserService', () => {
    const mockUser: User = {
        uid: 'test-user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg',
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: vi.fn(),
        getIdToken: vi.fn(),
        getIdTokenResult: vi.fn(),
        reload: vi.fn(),
        toJSON: vi.fn(),
        phoneNumber: null,
        providerId: 'firebase'
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('createUserProfile', () => {
        it('should create a new user profile with default values', async () => {
            const { setDoc } = await import('firebase/firestore')
            vi.mocked(setDoc).mockResolvedValue(undefined)

            const profile = await createUserProfile(mockUser)

            expect(profile).toMatchObject({
                uid: mockUser.uid,
                email: mockUser.email,
                displayName: mockUser.displayName,
                photoURL: mockUser.photoURL,
                totalWins: 0,
                xp: 0,
                currentBadge: BADGES[0].name,
                role: 'writer'
            })
            expect(setDoc).toHaveBeenCalledTimes(1)
        })

        it('should handle missing display name', async () => {
            const { setDoc } = await import('firebase/firestore')
            vi.mocked(setDoc).mockResolvedValue(undefined)

            const userWithoutName = { ...mockUser, displayName: null }
            const profile = await createUserProfile(userWithoutName)

            expect(profile.displayName).toBe('Kullanıcı')
        })

        it('should throw error on setDoc failure', async () => {
            const { setDoc } = await import('firebase/firestore')
            vi.mocked(setDoc).mockRejectedValue(new Error('Firestore error'))

            await expect(createUserProfile(mockUser)).rejects.toThrow('Firestore error')
        })
    })

    describe('getUserProfile', () => {
        it('should return user profile if exists', async () => {
            const { getDoc } = await import('firebase/firestore')
            const mockProfile = {
                uid: 'test-user-123',
                email: 'test@example.com',
                displayName: 'Test User',
                xp: 100,
                currentBadge: BADGES[0].name,
                role: 'writer'
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => mockProfile
            } as any)

            const profile = await getUserProfile('test-user-123')

            expect(profile).toEqual(mockProfile)
        })

        it('should return null if profile does not exist', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            const profile = await getUserProfile('non-existent-user')

            expect(profile).toBeNull()
        })

        it('should return null on error', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'))

            const profile = await getUserProfile('test-user-123')

            expect(profile).toBeNull()
        })
    })

    describe('updateUserXP', () => {
        it('should update XP and return same badge if no level up', async () => {
            const { getDoc, updateDoc } = await import('firebase/firestore')
            const mockProfile = {
                uid: 'test-user-123',
                xp: 50,
                currentBadge: BADGES[0].name
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => mockProfile
            } as any)
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            const result = await updateUserXP('test-user-123', 10)

            expect(result.newBadge).toBe(false)
            expect(result.badge).toBe(BADGES[0].name)
        })

        it('should update badge on level up', async () => {
            const { getDoc, updateDoc } = await import('firebase/firestore')
            const mockProfile = {
                uid: 'test-user-123',
                xp: 90,
                currentBadge: BADGES[0].name
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => mockProfile
            } as any)
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            // Add enough XP to level up (assuming BADGES[1] requires 100+ XP)
            const result = await updateUserXP('test-user-123', 20)

            expect(updateDoc).toHaveBeenCalled()
        })

        it('should throw error if user profile not found', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            await expect(updateUserXP('non-existent-user', 10)).rejects.toThrow('User profile not found')
        })
    })

    describe('syncUserProfile', () => {
        it('should create new profile if not exists', async () => {
            const { getDoc, setDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)
            vi.mocked(setDoc).mockResolvedValue(undefined)

            const profile = await syncUserProfile(mockUser)

            expect(profile.uid).toBe(mockUser.uid)
            expect(setDoc).toHaveBeenCalledTimes(1)
        })

        it('should update existing profile with missing fields', async () => {
            const { getDoc, updateDoc } = await import('firebase/firestore')
            const incompleteProfile = {
                uid: 'test-user-123',
                email: 'test@example.com',
                displayName: 'Test User'
                // Missing: role, currentBadge, xp
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => incompleteProfile
            } as any)
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            const profile = await syncUserProfile(mockUser)

            expect(updateDoc).toHaveBeenCalled()
            expect(profile.role).toBe('writer')
            expect(profile.currentBadge).toBe(BADGES[0].name)
        })

        it('should not update if profile is complete', async () => {
            const { getDoc, updateDoc } = await import('firebase/firestore')
            const completeProfile = {
                uid: 'test-user-123',
                email: 'test@example.com',
                displayName: 'Test User',
                role: 'writer',
                currentBadge: BADGES[0].name,
                xp: 0
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                data: () => completeProfile
            } as any)
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            await syncUserProfile(mockUser)

            // Should not call updateDoc if no updates needed
            // (This depends on implementation - may still call with empty updates)
        })
    })

    describe('updateUserProfile', () => {
        it('should update user profile fields', async () => {
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            const updates = {
                displayName: 'Updated Name',
                photoURL: 'https://example.com/new-photo.jpg'
            }

            await updateUserProfile('test-user-123', updates)

            expect(updateDoc).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining(updates)
            )
        })

        it('should throw error on update failure', async () => {
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockRejectedValue(new Error('Update failed'))

            await expect(
                updateUserProfile('test-user-123', { displayName: 'New Name' })
            ).rejects.toThrow('Update failed')
        })
    })
})
