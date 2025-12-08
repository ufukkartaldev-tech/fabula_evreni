# 🧪 Fabula Test Suite Documentation

## 📋 İçindekiler

1. [Test Yapısı](#test-yapısı)
2. [Test Çalıştırma](#test-çalıştırma)
3. [Test Kategorileri](#test-kategorileri)
4. [Mock ve Helper'lar](#mock-ve-helperlar)
5. [Coverage Raporları](#coverage-raporları)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Test Yapısı

```
src/
├── __tests__/
│   ├── components/          # Component testleri
│   │   ├── LikeButton.test.tsx
│   │   ├── FollowButton.test.tsx
│   │   └── StoryCard.test.tsx
│   ├── services/            # Service layer testleri
│   │   ├── userService.test.ts
│   │   ├── likeService.test.ts
│   │   ├── draftService.test.ts
│   │   └── followService.test.ts
│   ├── utils/               # Utility testleri
│   │   └── readingTime.test.ts
│   ├── helpers/             # Test helper fonksiyonları
│   │   └── testUtils.ts
│   ├── mocks/               # Mock data ve handlers
│   │   ├── handlers.ts
│   │   └── server.ts
│   └── setup.ts             # Test setup dosyası
│
e2e/
├── auth.spec.ts             # Authentication E2E testleri
├── story-creation.spec.ts   # Story creation E2E testleri
└── ...                      # Diğer E2E testler
```

---

## 🚀 Test Çalıştırma

### Unit & Component Tests (Vitest)

```bash
# Tüm testleri çalıştır
npm test

# Watch mode (geliştirme için)
npm run test:watch

# UI ile testleri çalıştır
npm run test:ui

# Coverage raporu ile çalıştır
npm run test:coverage

# Belirli bir dosyayı test et
npm test userService.test.ts

# Belirli bir test suite'i çalıştır
npm test -- --grep "UserService"
```

### E2E Tests (Playwright)

```bash
# Tüm E2E testleri çalıştır
npm run test:e2e

# UI mode ile çalıştır
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Belirli bir browser'da çalıştır
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Headed mode (browser görünür)
npx playwright test --headed

# Belirli bir test dosyası
npx playwright test auth.spec.ts
```

### Tüm Testleri Çalıştır

```bash
# Unit + E2E testler
npm run test:all
```

---

## 📚 Test Kategorileri

### 1. Unit Tests

**Amaç**: İzole fonksiyonları ve metodları test etmek

**Örnekler**:
- `readingTime.test.ts` - Okuma süresi hesaplama
- `userService.test.ts` - Kullanıcı profil işlemleri
- `likeService.test.ts` - Beğeni sistemi

**Çalıştırma**:
```bash
npm test -- --grep "unit"
```

### 2. Component Tests

**Amaç**: React componentlerinin davranışını test etmek

**Örnekler**:
- `LikeButton.test.tsx` - Beğeni butonu etkileşimleri
- `FollowButton.test.tsx` - Takip butonu davranışı
- `StoryCard.test.tsx` - Hikaye kartı render'ı

**Çalıştırma**:
```bash
npm test -- --grep "Component"
```

### 3. Integration Tests

**Amaç**: Birden fazla modülün birlikte çalışmasını test etmek

**Örnekler**:
- Service + Component entegrasyonu
- Context + Component entegrasyonu

**Çalıştırma**:
```bash
npm test -- --grep "Integration"
```

### 4. E2E Tests

**Amaç**: Kullanıcı akışlarını uçtan uca test etmek

**Örnekler**:
- `auth.spec.ts` - Login/Register/Logout akışı
- `story-creation.spec.ts` - Hikaye oluşturma akışı

**Çalıştırma**:
```bash
npm run test:e2e
```

---

## 🛠️ Mock ve Helper'lar

### Test Utilities

`src/__tests__/helpers/testUtils.ts` dosyası şu helper'ları içerir:

#### Factory Functions

```typescript
import { createMockUser, createMockStory, createMockComment } from '@/__tests__/helpers/testUtils'

// Tek kullanıcı oluştur
const user = createMockUser({ displayName: 'Custom Name' })

// Birden fazla kullanıcı oluştur
const users = createMockUsers(5)

// Hikaye oluştur
const story = createMockStory({ 
    title: 'My Story',
    category: 'Fantastik' 
})

// İnteraktif hikaye oluştur
const interactiveStory = createMockInteractiveStory()

// Yorum oluştur
const comment = createMockComment({ content: 'Great story!' })

// Taslak oluştur
const draft = createMockDraft()

// Bildirim oluştur
const notification = createMockNotification({ type: 'like' })
```

#### Firestore Mocks

```typescript
import { 
    createFirestoreTimestamp,
    createMockFirestoreDoc,
    createMockQuerySnapshot 
} from '@/__tests__/helpers/testUtils'

// Timestamp oluştur
const timestamp = createFirestoreTimestamp(new Date())

// Document mock
const doc = createMockFirestoreDoc('doc-123', { name: 'Test' })

// Query snapshot mock
const snapshot = createMockQuerySnapshot([
    { id: 'doc-1', data: { name: 'User 1' } },
    { id: 'doc-2', data: { name: 'User 2' } }
])
```

#### Utility Functions

```typescript
import { 
    delay,
    randomString,
    randomNumber,
    createMockFile 
} from '@/__tests__/helpers/testUtils'

// Delay ekle
await delay(1000)

// Random string
const id = randomString(10)

// Random number
const count = randomNumber(1, 100)

// Mock file oluştur
const file = createMockFile('image.jpg', 2048, 'image/jpeg')
```

#### Browser API Mocks

```typescript
import { 
    createMockLocalStorage,
    mockIntersectionObserver,
    mockMatchMedia 
} from '@/__tests__/helpers/testUtils'

// localStorage mock
const localStorage = createMockLocalStorage()
localStorage.setItem('key', 'value')

// IntersectionObserver mock (infinite scroll için)
mockIntersectionObserver()

// matchMedia mock (responsive tests için)
mockMatchMedia(true) // mobile
mockMatchMedia(false) // desktop
```

### MSW (Mock Service Worker)

API isteklerini mock'lamak için MSW kullanılıyor:

```typescript
// src/__tests__/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/stories', () => {
        return HttpResponse.json([
            { id: '1', title: 'Story 1' },
            { id: '2', title: 'Story 2' }
        ])
    }),
    
    http.post('/api/stories', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '123', ...body })
    })
]
```

---

## 📊 Coverage Raporları

### Coverage Çalıştırma

```bash
npm run test:coverage
```

### Coverage Hedefleri

Mevcut hedefler (`vitest.config.ts`):
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

### Coverage Raporu Görüntüleme

Coverage raporu `coverage/` klasöründe oluşturulur:

```bash
# HTML raporu tarayıcıda aç
open coverage/index.html  # macOS
start coverage/index.html # Windows
xdg-open coverage/index.html # Linux
```

### Coverage Exclude

Aşağıdaki dosyalar coverage'dan hariç tutulmuştur:
- `node_modules/`
- `src/__tests__/`
- `*.d.ts` (type definitions)
- `*.config.*` (config files)
- `src/lib/firebase.ts` (Firebase config)
- `src/lib/firebaseAdmin.ts` (Firebase Admin config)

---

## ✅ Best Practices

### 1. Test Naming

```typescript
// ✅ İyi
describe('UserService', () => {
    describe('createUserProfile', () => {
        it('should create a new user profile with default values', () => {
            // ...
        })
        
        it('should throw error on setDoc failure', () => {
            // ...
        })
    })
})

// ❌ Kötü
describe('Test', () => {
    it('works', () => {
        // ...
    })
})
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('should increment like count when liked', async () => {
    // Arrange
    const userId = 'user-123'
    const storyId = 'story-456'
    vi.mocked(toggleStoryLike).mockResolvedValue(true)
    
    // Act
    const result = await toggleStoryLike(userId, storyId)
    
    // Assert
    expect(result).toBe(true)
    expect(toggleStoryLike).toHaveBeenCalledWith(userId, storyId)
})
```

### 3. Mock Cleanup

```typescript
beforeEach(() => {
    vi.clearAllMocks()
})

afterEach(() => {
    vi.restoreAllMocks()
})
```

### 4. Async Testing

```typescript
// ✅ İyi - async/await kullan
it('should fetch user data', async () => {
    const user = await getUserProfile('user-123')
    expect(user).toBeDefined()
})

// ✅ İyi - waitFor kullan
it('should show loading state', async () => {
    render(<Component />)
    await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
})

// ❌ Kötü - promise return etmeyi unutma
it('should fetch user data', () => {
    getUserProfile('user-123').then(user => {
        expect(user).toBeDefined()
    })
})
```

### 5. User Events

```typescript
import { userEvent } from '@testing-library/user-event'

it('should handle button click', async () => {
    const user = userEvent.setup()
    render(<Button />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(button).toHaveClass('clicked')
})
```

### 6. Accessibility Testing

```typescript
it('should be accessible', () => {
    render(<Component />)
    
    // Role-based queries
    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toBeInTheDocument()
    
    // ARIA attributes
    expect(button).toHaveAttribute('aria-label', 'Submit form')
})
```

---

## 🐛 Troubleshooting

### Problem: Tests timeout

**Çözüm**:
```typescript
// Test timeout'u artır
it('should complete long operation', async () => {
    // ...
}, 10000) // 10 saniye

// Veya global olarak
vi.setConfig({ testTimeout: 10000 })
```

### Problem: Firebase mock çalışmıyor

**Çözüm**:
```typescript
// Mock'u doğru sırada tanımla
vi.mock('@/lib/firebase', () => ({
    db: {}
}))

vi.mock('firebase/firestore', () => ({
    // ... tüm kullanılan fonksiyonları mock'la
}))
```

### Problem: Component render hatası

**Çözüm**:
```typescript
// Context provider'ları ekle
import { AuthProvider } from '@/contexts/AuthContext'

render(
    <AuthProvider>
        <Component />
    </AuthProvider>
)
```

### Problem: E2E test flaky (kararsız)

**Çözüm**:
```typescript
// waitFor kullan
await page.waitForSelector('[data-testid="element"]')

// Network idle bekle
await page.goto('/', { waitUntil: 'networkidle' })

// Explicit wait ekle
await page.waitForTimeout(1000)
```

### Problem: Coverage düşük

**Çözüm**:
1. Hangi dosyalar test edilmemiş kontrol et:
   ```bash
   npm run test:coverage
   ```
2. Coverage raporunu incele:
   ```bash
   open coverage/index.html
   ```
3. Eksik test senaryolarını ekle

---

## 📝 Test Yazma Checklist

- [ ] Test dosyası doğru klasörde (`__tests__/components/` veya `__tests__/services/`)
- [ ] Tüm import'lar doğru
- [ ] Mock'lar tanımlanmış
- [ ] `beforeEach` ve `afterEach` cleanup'ları var
- [ ] Test isimleri açıklayıcı
- [ ] Happy path test edilmiş
- [ ] Error case'ler test edilmiş
- [ ] Edge case'ler test edilmiş
- [ ] Async işlemler doğru handle edilmiş
- [ ] Accessibility kontrolleri var
- [ ] Coverage threshold'ları karşılanmış

---

## 🎯 Sonraki Adımlar

1. **Eksik Testleri Tamamla**
   - [ ] Notification service tests
   - [ ] Search service tests
   - [ ] Favorite service tests
   - [ ] Prediction service tests

2. **Component Coverage Artır**
   - [ ] CommentSection tests
   - [ ] StoryForm tests
   - [ ] InteractiveStoryPlayer tests
   - [ ] NotificationPanel tests

3. **E2E Coverage Genişlet**
   - [ ] Interactive story reading flow
   - [ ] Social features (like, comment, follow)
   - [ ] Search and filter flow
   - [ ] Admin moderation flow

4. **Performance Tests Ekle**
   - [ ] Large dataset rendering
   - [ ] Infinite scroll performance
   - [ ] Image loading optimization

5. **Visual Regression Tests**
   - [ ] Playwright ile screenshot comparison
   - [ ] Component visual tests

---

**Son Güncelleme**: 2025-12-08
**Test Framework**: Vitest 4.0 + Playwright 1.57
**Coverage**: Hedef 80%+
