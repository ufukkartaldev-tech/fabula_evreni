import { describe, it, expect } from 'vitest'
import { calculateReadingTime } from '@/lib/readingTime'

describe('calculateReadingTime', () => {
  it('should calculate reading time for short text', () => {
    const text = 'Bu kısa bir metindir.'
    const result = calculateReadingTime(text)
    expect(result).toBeGreaterThan(0)
    expect(result).toBeLessThan(1)
  })

  it('should calculate reading time for longer text', () => {
    const text = 'Bu çok daha uzun bir metindir. '.repeat(200) // ~200 kelime
    const result = calculateReadingTime(text)
    expect(result).toBeGreaterThan(1)
    expect(result).toBeLessThan(5)
  })

  it('should return 0 for empty text', () => {
    expect(calculateReadingTime('')).toBe(0)
    expect(calculateReadingTime('   ')).toBe(0)
  })

  it('should handle Turkish characters correctly', () => {
    const turkishText = 'Şu anda İstanbul\'da yaşıyorum. Güneşli bir gün.'
    const result = calculateReadingTime(turkishText)
    expect(result).toBeGreaterThan(0)
  })
})
