import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import StoryCard from '@/app/components/StoryCard'
import { Story } from '@/interfaces/Story'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('StoryCard', () => {
  const mockStory: Story = {
    id: 'test-story',
    title: 'Test Hikaye',
    content: 'Bu bir test hikayesi içeriğidir.',
    excerpt: 'Test hikayesi özeti',
    author: {
      name: 'Test Yazar',
      avatar: 'https://example.com/avatar.jpg'
    },
    category: 'Fantastik',
    createdAt: new Date('2024-01-01'),
    stats: {
      views: 150,
      likes: 25,
      comments: 10
    },
    type: 'interactive'
  }

  it('should render story information correctly', () => {
    render(<StoryCard story={mockStory} />)

    expect(screen.getByText('Test Hikaye')).toBeInTheDocument()
    expect(screen.getByText('Test Yazar')).toBeInTheDocument()
    expect(screen.getByText('Fantastik')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument() // views
    expect(screen.getByText('25')).toBeInTheDocument() // likes
  })

  it('should navigate to story page when clicked', async () => {
    const user = userEvent.setup()
    render(<StoryCard story={mockStory} />)

    const card = screen.getByRole('link')
    await user.click(card)

    expect(mockPush).toHaveBeenCalledWith('/story/test-story')
  })

  it('should display correct date format', () => {
    render(<StoryCard story={mockStory} />)

    // Tarihi kontrol et (format'a göre değişebilir)
    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })

  it('should show interactive badge for interactive stories', () => {
    render(<StoryCard story={mockStory} />)

    expect(screen.getByText('İnteraktif')).toBeInTheDocument()
  })

  it('should handle missing excerpt gracefully', () => {
    const storyWithoutExcerpt = { ...mockStory, excerpt: undefined }
    render(<StoryCard story={storyWithoutExcerpt} />)

    // Component crash etmemeli
    expect(screen.getByText('Test Hikaye')).toBeInTheDocument()
  })
})
