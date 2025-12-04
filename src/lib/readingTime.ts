/**
 * Reading Time Calculator Utility
 * Hikaye okuma süresini hesaplar
 */

const WORDS_PER_MINUTE = 200; // Ortalama okuma hızı

/**
 * Metindeki kelime sayısını hesapla
 */
function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Okuma süresini hesapla (dakika)
 */
export function calculateReadingTime(text: string): number {
    const wordCount = countWords(text);
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return Math.max(1, minutes); // Minimum 1 dakika
}

/**
 * Okuma süresini formatla
 */
export function formatReadingTime(text: string): string {
    const minutes = calculateReadingTime(text);

    if (minutes === 1) {
        return '1 dakikalık okuma';
    }

    return `${minutes} dakikalık okuma`;
}

/**
 * Okuma süresini emoji ile formatla
 */
export function formatReadingTimeWithEmoji(text: string): string {
    const minutes = calculateReadingTime(text);

    if (minutes <= 3) {
        return `⚡ ${minutes} dk`;
    } else if (minutes <= 10) {
        return `📖 ${minutes} dk`;
    } else {
        return `📚 ${minutes} dk`;
    }
}

/**
 * Kelime sayısını formatla
 */
export function formatWordCount(text: string): string {
    const wordCount = countWords(text);

    if (wordCount < 1000) {
        return `${wordCount} kelime`;
    }

    const thousands = (wordCount / 1000).toFixed(1);
    return `${thousands}K kelime`;
}
