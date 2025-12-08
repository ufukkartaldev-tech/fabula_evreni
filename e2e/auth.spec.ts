import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000')
    })

    test('should display login modal when clicking login button', async ({ page }) => {
        // Click login button in header
        await page.click('button:has-text("Giriş Yap")')

        // Modal should be visible
        await expect(page.locator('[role="dialog"]')).toBeVisible()
        await expect(page.locator('text=Giriş Yap')).toBeVisible()
    })

    test('should show validation errors for empty login form', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        // Try to submit empty form
        await page.click('button[type="submit"]')

        // Should show validation errors
        await expect(page.locator('text=E-posta gerekli')).toBeVisible()
        await expect(page.locator('text=Şifre gerekli')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        // Fill in invalid credentials
        await page.fill('input[type="email"]', 'invalid@example.com')
        await page.fill('input[type="password"]', 'wrongpassword')
        await page.click('button[type="submit"]')

        // Should show error message
        await expect(page.locator('text=Geçersiz e-posta veya şifre')).toBeVisible()
    })

    test('should successfully login with valid credentials', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        // Fill in valid credentials (use test account)
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')
        await page.click('button[type="submit"]')

        // Should redirect to home and show user menu
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
        await expect(page.locator('button:has-text("Giriş Yap")')).not.toBeVisible()
    })

    test('should switch between login and register tabs', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        // Should show login form by default
        await expect(page.locator('text=Giriş Yap')).toBeVisible()

        // Click register tab
        await page.click('button:has-text("Kayıt Ol")')

        // Should show register form
        await expect(page.locator('text=Hesap Oluştur')).toBeVisible()
        await expect(page.locator('input[name="displayName"]')).toBeVisible()
    })

    test('should successfully register new user', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')
        await page.click('button:has-text("Kayıt Ol")')

        // Fill registration form
        const timestamp = Date.now()
        await page.fill('input[name="displayName"]', `Test User ${timestamp}`)
        await page.fill('input[type="email"]', `test${timestamp}@example.com`)
        await page.fill('input[type="password"]', 'testpassword123')
        await page.fill('input[name="confirmPassword"]', 'testpassword123')

        await page.click('button[type="submit"]')

        // Should be logged in
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
    })

    test('should show password mismatch error', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')
        await page.click('button:has-text("Kayıt Ol")')

        await page.fill('input[name="displayName"]', 'Test User')
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'password123')
        await page.fill('input[name="confirmPassword"]', 'password456')

        await page.click('button[type="submit"]')

        await expect(page.locator('text=Şifreler eşleşmiyor')).toBeVisible()
    })

    test('should logout successfully', async ({ page }) => {
        // Login first
        await page.click('button:has-text("Giriş Yap")')
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')
        await page.click('button[type="submit"]')

        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()

        // Click user menu
        await page.click('[data-testid="user-menu"]')

        // Click logout
        await page.click('button:has-text("Çıkış Yap")')

        // Should show login button again
        await expect(page.locator('button:has-text("Giriş Yap")')).toBeVisible()
        await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible()
    })

    test('should persist login after page reload', async ({ page }) => {
        // Login
        await page.click('button:has-text("Giriş Yap")')
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')
        await page.click('button[type="submit"]')

        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()

        // Reload page
        await page.reload()

        // Should still be logged in
        await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
    })

    test('should show forgot password option', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        // Should have forgot password link
        await expect(page.locator('text=Şifremi Unuttum')).toBeVisible()
    })

    test('should close modal on escape key', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        await expect(page.locator('[role="dialog"]')).toBeVisible()

        // Press escape
        await page.keyboard.press('Escape')

        // Modal should be closed
        await expect(page.locator('[role="dialog"]')).not.toBeVisible()
    })

    test('should close modal on backdrop click', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        await expect(page.locator('[role="dialog"]')).toBeVisible()

        // Click backdrop (outside modal)
        await page.click('[data-testid="modal-backdrop"]')

        // Modal should be closed
        await expect(page.locator('[role="dialog"]')).not.toBeVisible()
    })

    test('should show password visibility toggle', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        const passwordInput = page.locator('input[type="password"]')
        const toggleButton = page.locator('[aria-label="Şifreyi göster"]')

        // Password should be hidden by default
        await expect(passwordInput).toHaveAttribute('type', 'password')

        // Click toggle
        await toggleButton.click()

        // Password should be visible
        await expect(passwordInput).toHaveAttribute('type', 'text')
    })

    test('should disable submit button while processing', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')

        const submitButton = page.locator('button[type="submit"]')
        await submitButton.click()

        // Button should be disabled during processing
        await expect(submitButton).toBeDisabled()
    })

    test('should show loading indicator during authentication', async ({ page }) => {
        await page.click('button:has-text("Giriş Yap")')

        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="password"]', 'testpassword123')
        await page.click('button[type="submit"]')

        // Should show loading indicator
        await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible()
    })
})
