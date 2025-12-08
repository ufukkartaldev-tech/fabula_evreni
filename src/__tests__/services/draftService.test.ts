import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
    saveDraft,
    updateDraft,
    autoSaveDraft,
    getDrafts,
    getDraftById,
    deleteDraft,
    publishDraft
} from '@/lib/draftService'

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
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    serverTimestamp: vi.fn(() => ({ toDate: () => new Date() })),
    Timestamp: {
        now: vi.fn(() => ({ toDate: () => new Date() }))
    }
}))

// Mock firestore module for publishDraft
vi.mock('@/lib/firestore', () => ({
    addStory: vi.fn()
}))

describe('DraftService', () => {
    const mockDraft = {
        userId: 'user-123',
        title: 'Test Draft',
        content: 'This is a test draft content',
        excerpt: 'Test excerpt',
        category: 'Fantastik',
        coverImage: 'https://example.com/cover.jpg',
        autoSaveEnabled: true
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('saveDraft', () => {
        it('should save a new draft successfully', async () => {
            const { addDoc } = await import('firebase/firestore')
            vi.mocked(addDoc).mockResolvedValue({ id: 'draft-123' } as any)

            const result = await saveDraft(mockDraft)

            expect(result.success).toBe(true)
            expect(result.draftId).toBe('draft-123')
            expect(addDoc).toHaveBeenCalledTimes(1)
        })

        it('should return error on save failure', async () => {
            const { addDoc } = await import('firebase/firestore')
            vi.mocked(addDoc).mockRejectedValue(new Error('Firestore error'))

            const result = await saveDraft(mockDraft)

            expect(result.success).toBe(false)
            expect(result.error).toBe('Taslak kaydedilemedi')
        })

        it('should include timestamps in saved draft', async () => {
            const { addDoc, serverTimestamp } = await import('firebase/firestore')
            vi.mocked(addDoc).mockResolvedValue({ id: 'draft-123' } as any)

            await saveDraft(mockDraft)

            expect(addDoc).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    ...mockDraft,
                    lastSaved: expect.anything(),
                    createdAt: expect.anything()
                })
            )
        })
    })

    describe('updateDraft', () => {
        it('should update draft successfully', async () => {
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            const updates = {
                title: 'Updated Title',
                content: 'Updated content'
            }

            const result = await updateDraft('draft-123', updates)

            expect(result.success).toBe(true)
            expect(updateDoc).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    ...updates,
                    lastSaved: expect.anything()
                })
            )
        })

        it('should return error on update failure', async () => {
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockRejectedValue(new Error('Update failed'))

            const result = await updateDraft('draft-123', { title: 'New Title' })

            expect(result.success).toBe(false)
            expect(result.error).toBe('Taslak güncellenemedi')
        })
    })

    describe('autoSaveDraft', () => {
        it('should debounce multiple save calls', async () => {
            vi.useFakeTimers()
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            // Make multiple rapid calls
            autoSaveDraft('draft-123', { title: 'Title 1' })
            autoSaveDraft('draft-123', { title: 'Title 2' })
            autoSaveDraft('draft-123', { title: 'Title 3' })

            // Should not have called updateDoc yet
            expect(updateDoc).not.toHaveBeenCalled()

            // Fast-forward time by 2 seconds (debounce delay)
            await vi.advanceTimersByTimeAsync(2000)

            // Should have called updateDoc only once with the last value
            expect(updateDoc).toHaveBeenCalledTimes(1)

            vi.useRealTimers()
        })

        it('should save after debounce delay', async () => {
            vi.useFakeTimers()
            const { updateDoc } = await import('firebase/firestore')
            vi.mocked(updateDoc).mockResolvedValue(undefined)

            autoSaveDraft('draft-123', { content: 'Auto-saved content' })

            await vi.advanceTimersByTimeAsync(2000)

            expect(updateDoc).toHaveBeenCalled()

            vi.useRealTimers()
        })
    })

    describe('getDrafts', () => {
        it('should return user drafts sorted by lastSaved', async () => {
            const { getDocs } = await import('firebase/firestore')
            const mockDocs = [
                {
                    id: 'draft-1',
                    data: () => ({
                        userId: 'user-123',
                        title: 'Draft 1',
                        createdAt: { toDate: () => new Date('2024-01-01') },
                        lastSaved: { toDate: () => new Date('2024-01-03') }
                    })
                },
                {
                    id: 'draft-2',
                    data: () => ({
                        userId: 'user-123',
                        title: 'Draft 2',
                        createdAt: { toDate: () => new Date('2024-01-02') },
                        lastSaved: { toDate: () => new Date('2024-01-04') }
                    })
                }
            ]

            vi.mocked(getDocs).mockResolvedValue({ docs: mockDocs } as any)

            const drafts = await getDrafts('user-123')

            expect(drafts).toHaveLength(2)
            expect(drafts[0].id).toBe('draft-1')
            expect(drafts[1].id).toBe('draft-2')
        })

        it('should return empty array if no drafts', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any)

            const drafts = await getDrafts('user-123')

            expect(drafts).toEqual([])
        })

        it('should return empty array on error', async () => {
            const { getDocs } = await import('firebase/firestore')
            vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

            const drafts = await getDrafts('user-123')

            expect(drafts).toEqual([])
        })
    })

    describe('getDraftById', () => {
        it('should return draft if exists', async () => {
            const { getDoc } = await import('firebase/firestore')
            const mockDraftData = {
                userId: 'user-123',
                title: 'Test Draft',
                content: 'Content',
                createdAt: { toDate: () => new Date('2024-01-01') },
                lastSaved: { toDate: () => new Date('2024-01-02') }
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                id: 'draft-123',
                data: () => mockDraftData
            } as any)

            const draft = await getDraftById('draft-123')

            expect(draft).not.toBeNull()
            expect(draft?.id).toBe('draft-123')
            expect(draft?.title).toBe('Test Draft')
        })

        it('should return null if draft does not exist', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            const draft = await getDraftById('non-existent-draft')

            expect(draft).toBeNull()
        })

        it('should return null on error', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'))

            const draft = await getDraftById('draft-123')

            expect(draft).toBeNull()
        })
    })

    describe('deleteDraft', () => {
        it('should delete draft successfully', async () => {
            const { deleteDoc } = await import('firebase/firestore')
            vi.mocked(deleteDoc).mockResolvedValue(undefined)

            const result = await deleteDraft('draft-123')

            expect(result.success).toBe(true)
            expect(deleteDoc).toHaveBeenCalledTimes(1)
        })

        it('should return error on delete failure', async () => {
            const { deleteDoc } = await import('firebase/firestore')
            vi.mocked(deleteDoc).mockRejectedValue(new Error('Delete failed'))

            const result = await deleteDraft('draft-123')

            expect(result.success).toBe(false)
            expect(result.error).toBe('Taslak silinemedi')
        })
    })

    describe('publishDraft', () => {
        it('should publish draft as story and delete draft', async () => {
            const { getDoc, deleteDoc } = await import('firebase/firestore')
            const { addStory } = await import('@/lib/firestore')

            const mockDraftData = {
                userId: 'user-123',
                title: 'Published Story',
                content: 'Story content',
                excerpt: 'Excerpt',
                category: 'Fantastik',
                coverImage: 'https://example.com/cover.jpg',
                createdAt: { toDate: () => new Date() },
                lastSaved: { toDate: () => new Date() }
            }

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                id: 'draft-123',
                data: () => mockDraftData
            } as any)

            vi.mocked(addStory).mockResolvedValue('story-456')
            vi.mocked(deleteDoc).mockResolvedValue(undefined)

            const result = await publishDraft('draft-123')

            expect(result.success).toBe(true)
            expect(result.storyId).toBe('story-456')
            expect(addStory).toHaveBeenCalled()
            expect(deleteDoc).toHaveBeenCalled()
        })

        it('should return error if draft not found', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockResolvedValue({
                exists: () => false
            } as any)

            const result = await publishDraft('non-existent-draft')

            expect(result.success).toBe(false)
            expect(result.error).toBe('Taslak bulunamadı')
        })

        it('should return error if story creation fails', async () => {
            const { getDoc } = await import('firebase/firestore')
            const { addStory } = await import('@/lib/firestore')

            vi.mocked(getDoc).mockResolvedValue({
                exists: () => true,
                id: 'draft-123',
                data: () => mockDraft
            } as any)

            vi.mocked(addStory).mockResolvedValue('story-456' as any)

            const result = await publishDraft('draft-123')

            expect(result.success).toBe(false)
            expect(result.error).toBe('Hikaye oluşturulamadı')
        })

        it('should handle publish errors gracefully', async () => {
            const { getDoc } = await import('firebase/firestore')
            vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'))

            const result = await publishDraft('draft-123')

            expect(result.success).toBe(false)
            expect(result.error).toBe('Yayınlama başarısız')
        })
    })
})
