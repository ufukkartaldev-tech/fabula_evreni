import { http, HttpResponse } from 'msw'

// Mock data
const mockUser = {
  uid: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  picture: 'https://example.com/avatar.jpg'
}

const mockStories = [
  {
    id: 'story-1',
    title: 'Test Hikaye',
    content: 'Bu bir test hikayesi',
    excerpt: 'Test hikayesi özeti',
    author: { name: 'Test Author', avatar: 'https://example.com/avatar.jpg' },
    category: 'Fantastik',
    createdAt: new Date(),
    stats: { views: 100, likes: 10, comments: 5 },
    type: 'interactive' as const
  }
]

export const handlers = [
  // Auth handlers
  http.get('/api/auth/me', () => {
    return HttpResponse.json({ user: mockUser })
  }),

  // Stories handlers
  http.get('/api/stories', () => {
    return HttpResponse.json({
      stories: mockStories,
      hasMore: false,
      lastDoc: null
    })
  }),

  http.get('/api/get-top-stories', () => {
    return HttpResponse.json({
      success: true,
      stories: mockStories.slice(0, 3)
    })
  }),

  http.post('/api/stories/:id/choice-vote', () => {
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/complete-story', () => {
    return HttpResponse.json({
      success: true,
      xpEarned: 50,
      message: 'Hikaye tamamlandı!'
    })
  }),

  // Firebase auth mock
  http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*', () => {
    return HttpResponse.json({
      idToken: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: mockUser
    })
  }),

  // Catch-all handler for unhandled requests
  http.get('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`)
    return new HttpResponse(null, { status: 404 })
  })
]
