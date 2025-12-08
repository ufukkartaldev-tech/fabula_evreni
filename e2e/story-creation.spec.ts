import { test, expect } from '@playwright/test'

test.describe('Story Creation Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('http://localhost:3000')
        await page.click('button:has-text("Giriş Yap")')
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')
        await page.click('button[type="submit"]')
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
    })

    test('should navigate to story creation page', async ({ page }) => {
        // Click "Hikaye Yaz" button
        await page.click('button:has-text("Hikaye Yaz")')

        // Should navigate to story creation page
        await expect(page).toHaveURL(/.*\/create/)
        await expect(page.locator('h1:has-text("Yeni Hikaye")')).toBeVisible()
    })

    test('should show validation errors for empty story form', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        // Try to submit empty form
        await page.click('button:has-text("Yayınla")')

        // Should show validation errors
        await expect(page.locator('text=Başlık gerekli')).toBeVisible()
        await expect(page.locator('text=İçerik gerekli')).toBeVisible()
        await expect(page.locator('text=Kategori seçiniz')).toBeVisible()
    })

    test('should create a traditional story successfully', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        // Fill story form
        const timestamp = Date.now()
        await page.fill('input[name="title"]', `Test Story ${timestamp}`)
        await page.selectOption('select[name="category"]', 'Fantastik')

        // Fill content using rich text editor
        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.fill('This is a test story content. It has multiple sentences to meet the minimum length requirement.')

        // Fill excerpt
        await page.fill('textarea[name="excerpt"]', 'This is a test story excerpt.')

        // Submit form
        await page.click('button:has-text("Yayınla")')

        // Should redirect to story page
        await expect(page).toHaveURL(/.*\/story\/.*/)
        await expect(page.locator(`h1:has-text("Test Story ${timestamp}")`)).toBeVisible()
    })

    test('should create an interactive story successfully', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        // Select interactive mode
        await page.click('input[value="interactive"]')

        const timestamp = Date.now()
        await page.fill('input[name="title"]', `Interactive Story ${timestamp}`)
        await page.selectOption('select[name="category"]', 'Bilim Kurgu')

        // Fill first branch content
        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.fill('You wake up in a mysterious room. What do you do?')

        // Add choices
        await page.click('button:has-text("Seçenek Ekle")')
        await page.fill('input[name="choice-1"]', 'Look around the room')

        await page.click('button:has-text("Seçenek Ekle")')
        await page.fill('input[name="choice-2"]', 'Try to open the door')

        await page.fill('textarea[name="excerpt"]', 'An interactive mystery story.')

        // Submit
        await page.click('button:has-text("Yayınla")')

        // Should redirect to story page
        await expect(page).toHaveURL(/.*\/story\/.*/)
        await expect(page.locator('text=Look around the room')).toBeVisible()
        await expect(page.locator('text=Try to open the door')).toBeVisible()
    })

    test('should save story as draft', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        const timestamp = Date.now()
        await page.fill('input[name="title"]', `Draft Story ${timestamp}`)
        await page.selectOption('select[name="category"]', 'Romantik')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.fill('This is a draft story.')

        // Click save as draft
        await page.click('button:has-text("Taslak Olarak Kaydet")')

        // Should show success message
        await expect(page.locator('text=Taslak kaydedildi')).toBeVisible()

        // Navigate to drafts page
        await page.click('[data-testid="user-menu"]')
        await page.click('a:has-text("Taslaklar")')

        // Should see the draft
        await expect(page.locator(`text=Draft Story ${timestamp}`)).toBeVisible()
    })

    test('should auto-save draft while typing', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        await page.fill('input[name="title"]', 'Auto-save Test')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.type('This content should be auto-saved.')

        // Wait for auto-save (2 seconds debounce)
        await page.waitForTimeout(3000)

        // Should show auto-save indicator
        await expect(page.locator('text=Kaydedildi')).toBeVisible()
    })

    test('should upload cover image', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        // Click upload button
        const fileInput = page.locator('input[type="file"]')
        await fileInput.setInputFiles('./public/test-image.jpg')

        // Should show image preview
        await expect(page.locator('[data-testid="cover-image-preview"]')).toBeVisible()
    })

    test('should show character count for title', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        const titleInput = page.locator('input[name="title"]')
        await titleInput.fill('Test Title')

        // Should show character count
        await expect(page.locator('text=10 / 100')).toBeVisible()
    })

    test('should enforce maximum title length', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        const longTitle = 'A'.repeat(150)
        await page.fill('input[name="title"]', longTitle)

        // Should truncate to max length
        const titleValue = await page.locator('input[name="title"]').inputValue()
        expect(titleValue.length).toBeLessThanOrEqual(100)
    })

    test('should show content moderation warning for inappropriate content', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        await page.fill('input[name="title"]', 'Test Story')
        await page.selectOption('select[name="category"]', 'Fantastik')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        // Use inappropriate content that would trigger moderation
        await editor.fill('This content contains inappropriate language and violence.')

        await page.click('button:has-text("Yayınla")')

        // Should show moderation warning
        await expect(page.locator('text=İçerik moderasyon kurallarına uygun değil')).toBeVisible()
    })

    test('should preview story before publishing', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        await page.fill('input[name="title"]', 'Preview Test')
        await page.selectOption('select[name="category"]', 'Fantastik')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.fill('This is preview content.')

        // Click preview button
        await page.click('button:has-text("Önizle")')

        // Should show preview modal
        await expect(page.locator('[data-testid="preview-modal"]')).toBeVisible()
        await expect(page.locator('text=Preview Test')).toBeVisible()
        await expect(page.locator('text=This is preview content.')).toBeVisible()
    })

    test('should cancel story creation', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        await page.fill('input[name="title"]', 'Cancel Test')

        // Click cancel button
        await page.click('button:has-text("İptal")')

        // Should show confirmation dialog
        await expect(page.locator('text=Değişiklikler kaydedilmedi')).toBeVisible()

        // Confirm cancellation
        await page.click('button:has-text("Evet, Çık")')

        // Should navigate back to home
        await expect(page).toHaveURL('http://localhost:3000')
    })

    test('should edit existing story', async ({ page }) => {
        // First create a story
        await page.goto('http://localhost:3000/create')

        const timestamp = Date.now()
        await page.fill('input[name="title"]', `Edit Test ${timestamp}`)
        await page.selectOption('select[name="category"]', 'Fantastik')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()
        await editor.fill('Original content.')
        await page.fill('textarea[name="excerpt"]', 'Original excerpt.')

        await page.click('button:has-text("Yayınla")')
        await expect(page).toHaveURL(/.*\/story\/.*/)

        // Now edit the story
        await page.click('button:has-text("Düzenle")')

        // Should navigate to edit page
        await expect(page).toHaveURL(/.*\/edit\/.*/)

        // Update content
        await editor.click()
        await editor.clear()
        await editor.fill('Updated content.')

        await page.click('button:has-text("Güncelle")')

        // Should show updated content
        await expect(page.locator('text=Updated content.')).toBeVisible()
    })

    test('should show reading time estimate', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()

        // Type enough content for ~2 min read
        const longContent = 'This is a sentence. '.repeat(100)
        await editor.fill(longContent)

        // Should show reading time
        await expect(page.locator('text=~2 dk okuma')).toBeVisible()
    })

    test('should support markdown formatting', async ({ page }) => {
        await page.goto('http://localhost:3000/create')

        const editor = page.locator('[data-testid="story-editor"]')
        await editor.click()

        // Type markdown
        await editor.fill('# Heading\n\n**Bold text**\n\n*Italic text*')

        // Click preview
        await page.click('button:has-text("Önizle")')

        // Should render markdown
        await expect(page.locator('h1:has-text("Heading")')).toBeVisible()
        await expect(page.locator('strong:has-text("Bold text")')).toBeVisible()
        await expect(page.locator('em:has-text("Italic text")')).toBeVisible()
    })
})
