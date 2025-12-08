import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from '@/app/components/LikeButton'

// Mock AuthContext
const mockUser = { uid: 'user-123', email: 'test@example.com', displayName: 'Test User' }
vi.mock('@/contexts/AuthContext', () => ({
    useAuth: () => ({
        user: mockUser,
        loading: false
    })
}))

// Mock likeService
vi.mock('@/lib/likeService', () => ({
    toggleStoryLike: vi.fn(),
    isStoryLiked: vi.fn()
}))

describe('LikeButton Component', () => {
    const targetId = 'story-123'
    const initialLikeCount = 10

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render with initial like count', () => {
        const { isStoryLiked } = require('@/lib/likeService')
        vi.mocked(isStoryLiked).mockResolvedValue(false)

        render(<LikeButton targetId={targetId} targetType="story" initialLikeCount={initialLikeCount} />)

        expect(screen.getByText(initialLikeCount.toString())).toBeInTheDocument()
    })

    it('should show liked state when user has liked', async () => {
        const { isStoryLiked } = require('@/lib/likeService')
        vi.mocked(isStoryLiked).mockResolvedValue(true)

        render(<LikeButton targetId={targetId} targetType="story" initialLikeCount={initialLikeCount} />)

        await waitFor(() => {
            const button = screen.getByRole('button')
            expect(button).toHaveClass('liked')
        })
    })

    it('should toggle like on click', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(false)
        vi.mocked(toggleStoryLike).mockResolvedValue(true) // Liked

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(toggleStoryLike).toHaveBeenCalledWith(mockUser.uid, targetId)
        })
    })

    it('should increment like count when liked', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(false)
        vi.mocked(toggleStoryLike).mockResolvedValue(true)

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(screen.getByText((initialLikeCount + 1).toString())).toBeInTheDocument()
        })
    })

    it('should decrement like count when unliked', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(true)
        vi.mocked(toggleStoryLike).mockResolvedValue(false)

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(screen.getByText((initialLikeCount - 1).toString())).toBeInTheDocument()
        })
    })

    it('should disable button while processing', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(false)

        // Simulate slow API call
        vi.mocked(toggleStoryLike).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve(true), 1000))
        )

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        // Button should be disabled during processing
        expect(button).toBeDisabled()
    })

    it('should handle errors gracefully', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(false)
        vi.mocked(toggleStoryLike).mockRejectedValue(new Error('Network error'))

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            // Like count should remain unchanged
            expect(screen.getByText(initialLikeCount.toString())).toBeInTheDocument()
        })

        consoleSpy.mockRestore()
    })

    it('should show login prompt when user not authenticated', async () => {
        const user = userEvent.setup()

        // Mock no user
        vi.mock('@/contexts/AuthContext', () => ({
            useAuth: () => ({
                user: null,
                loading: false
            })
        }))

        const { isStoryLiked } = require('@/lib/likeService')
        vi.mocked(isStoryLiked).mockResolvedValue(false)

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        await user.click(button)

        // Should not call toggleStoryLike
        const { toggleStoryLike } = require('@/lib/likeService')
        expect(toggleStoryLike).not.toHaveBeenCalled()
    })

    it('should prevent double-clicking', async () => {
        const user = userEvent.setup()
        const { toggleStoryLike, isStoryLiked } = require('@/lib/likeService')

        vi.mocked(isStoryLiked).mockResolvedValue(false)
        vi.mocked(toggleStoryLike).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve(true), 500))
        )

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')

        // Rapid clicks
        await user.click(button)
        await user.click(button)
        await user.click(button)

        await waitFor(() => {
            // Should only call once
            expect(toggleStoryLike).toHaveBeenCalledTimes(1)
        })
    })

    it('should have accessible label', () => {
        const { isStoryLiked } = require('@/lib/likeService')
        vi.mocked(isStoryLiked).mockResolvedValue(false)

        render(<LikeButton targetId={targetId} initialLikeCount={initialLikeCount} />)

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label')
    })
})
