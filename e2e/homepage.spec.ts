import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Ana başlık görünür mü?
    await expect(page.getByText('Fabula')).toBeVisible()

    // Alt başlık görünür mü?
    await expect(page.getByText(/hikayelerin buluşma noktası/i)).toBeVisible()
  })

  test('should display story cards', async ({ page }) => {
    await page.goto('/')

    // Hikaye kartları yükleniyor mu?
    await page.waitForSelector('[data-testid="story-card"]', { timeout: 10000 })

    const storyCards = page.locator('[data-testid="story-card"]')
    await expect(storyCards.first()).toBeVisible()
  })

  test('should have working search functionality', async ({ page }) => {
    await page.goto('/')

    // Arama çubuğu var mı?
    const searchInput = page.getByPlaceholder(/ara/i).or(page.getByRole('textbox', { name: /search/i }))
    await expect(searchInput).toBeVisible()

    // Arama yap
    await searchInput.fill('test')
    await searchInput.press('Enter')

    // Sonuçlar gösteriliyor mu?
    await expect(page.getByText(/sonuç/i)).toBeVisible()
  })

  test('should navigate to story detail page', async ({ page }) => {
    await page.goto('/')

    // İlk hikaye kartına tıkla
    await page.locator('[data-testid="story-card"]').first().click()

    // URL değişti mi?
    await expect(page).toHaveURL(/\/story\//)
  })

  test('should display top stories section', async ({ page }) => {
    await page.goto('/')

    // Haftanın en iyileri bölümü var mı?
    const topStoriesSection = page.getByText('Haftanın En İyileri').or(page.getByText('🏆'))
    await expect(topStoriesSection).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/')

    // Mobile'da da çalışıyormu?
    await expect(page.getByText('Fabula')).toBeVisible()

    // Hamburger menu veya mobile nav var mı kontrol et
    const mobileMenu = page.locator('[data-testid="mobile-menu"]').or(page.locator('.mobile-menu'))
    // Mobile menu varsa görünür olmalı
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible()
    }
  })
})
