import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FollowButton from '@/app/components/FollowButton'

// Mock AuthContext
const mockUser = { uid: 'user-123', email: 'test@example.com' }
vi.mock('@/contexts/AuthContext', () => ({
    useAuth: () => ({
        user: mockUser,
        loading: false
    })
}))

// Mock followService
vi.mock('@/lib/followService', () => ({
    followUser: vi.fn(),
    unfollowUser: vi.fn(),
    isFollowing: vi.fn()
}))

describe('FollowButton Component', () => {
    const targetUserId = 'user-456'

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render "Takip Et" when not following', async () => {
        const { isFollowing } = require('@/lib/followService')
        vi.mocked(isFollowing).mockResolvedValue(false)

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })
    })

    it('should render "Takiptesin" when already following', async () => {
        const { isFollowing } = require('@/lib/followService')
        vi.mocked(isFollowing).mockResolvedValue(true)

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takiptesin')).toBeInTheDocument()
        })
    })

    it('should call followUser when clicking follow button', async () => {
        const user = userEvent.setup()
        const { isFollowing, followUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(false)
        vi.mocked(followUser).mockResolvedValue({ success: true })

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(followUser).toHaveBeenCalledWith(mockUser.uid, targetUserId)
        })
    })

    it('should call unfollowUser when clicking unfollow button', async () => {
        const user = userEvent.setup()
        const { isFollowing, unfollowUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(true)
        vi.mocked(unfollowUser).mockResolvedValue({ success: true })

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takiptesin')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(unfollowUser).toHaveBeenCalledWith(mockUser.uid, targetUserId)
        })
    })

    it('should update button state after following', async () => {
        const user = userEvent.setup()
        const { isFollowing, followUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(false)
        vi.mocked(followUser).mockResolvedValue({ success: true })

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(screen.getByText('Takiptesin')).toBeInTheDocument()
        })
    })

    it('should update button state after unfollowing', async () => {
        const user = userEvent.setup()
        const { isFollowing, unfollowUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(true)
        vi.mocked(unfollowUser).mockResolvedValue({ success: true })

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takiptesin')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })
    })

    it('should disable button while processing', async () => {
        const user = userEvent.setup()
        const { isFollowing, followUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(false)
        vi.mocked(followUser).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000))
        )

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        expect(button).toBeDisabled()
    })

    it('should handle follow errors gracefully', async () => {
        const user = userEvent.setup()
        const { isFollowing, followUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(false)
        vi.mocked(followUser).mockResolvedValue({
            success: false,
            error: 'Network error'
        })

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            // Should still show "Takip Et" after error
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        consoleSpy.mockRestore()
    })

    it('should not render when user is viewing their own profile', () => {
        const { isFollowing } = require('@/lib/followService')
        vi.mocked(isFollowing).mockResolvedValue(false)

        const { container } = render(<FollowButton userId={mockUser.uid} />)

        // Button should not be rendered
        expect(container.querySelector('button')).toBeNull()
    })

    it('should show loading state initially', () => {
        const { isFollowing } = require('@/lib/followService')
        vi.mocked(isFollowing).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve(false), 1000))
        )

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        // Should show loading indicator or disabled state
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })

    it('should have different styles for follow and unfollow states', async () => {
        const { isFollowing } = require('@/lib/followService')

        // Test follow state
        vi.mocked(isFollowing).mockResolvedValue(false)
        const { rerender } = render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            const button = screen.getByRole('button')
            expect(button).toHaveClass('follow-button') // Assuming class name
        })

        // Test unfollow state
        vi.mocked(isFollowing).mockResolvedValue(true)
        rerender(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            const button = screen.getByRole('button')
            expect(button).toHaveClass('following') // Assuming different class
        })
    })

    it('should prevent rapid clicking', async () => {
        const user = userEvent.setup()
        const { isFollowing, followUser } = require('@/lib/followService')

        vi.mocked(isFollowing).mockResolvedValue(false)
        vi.mocked(followUser).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ success: true }), 500))
        )

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            expect(screen.getByText('Takip Et')).toBeInTheDocument()
        })

        const button = screen.getByRole('button')

        // Rapid clicks
        await user.click(button)
        await user.click(button)
        await user.click(button)

        await waitFor(() => {
            // Should only call once
            expect(followUser).toHaveBeenCalledTimes(1)
        })
    })

    it('should be accessible', async () => {
        const { isFollowing } = require('@/lib/followService')
        vi.mocked(isFollowing).mockResolvedValue(false)

        render(<FollowButton userId={targetUserId} userName=" Test User\ userAvatar=\https://example.com/avatar.jpg\ />)

        await waitFor(() => {
            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('aria-label')
        })
    })
})
