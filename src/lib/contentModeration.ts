/**
 * İçerik moderasyon fonksiyonları
 * Küfür, hakaret ve spam kontrolü
 */

// Türkçe küfür ve hakaret listesi (temel varyasyonlar)
const PROFANITY_LIST = [
    // Not: Gerçek uygulamada daha kapsamlı bir liste kullanılmalı
    'amk', 'mk', 'aq', 'oç', 'sg', 'siktir', 'piç',
    // Varyasyonlar
    'amq', 'amıq', 'a.m.k', 'a m k', 'o.ç', 'o ç',
];

// Karakter varyasyonları (küfür kaçırma girişimleri)
const CHAR_VARIATIONS: { [key: string]: string[] } = {
    'a': ['@', '4', 'â', 'á'],
    'i': ['1', 'ı', 'İ', 'î'],
    'o': ['0', 'ö', 'ô'],
    'u': ['ü', 'û'],
    's': ['$', '5'],
    'e': ['3', 'é', 'ê'],
};

/**
 * Metni normalize et (küfür tespiti için)
 */
function normalizeText(text: string): string {
    let normalized = text.toLowerCase();

    // Varyasyonları standart karakterlere çevir
    Object.entries(CHAR_VARIATIONS).forEach(([char, variations]) => {
        variations.forEach(variation => {
            normalized = normalized.replace(new RegExp(variation, 'g'), char);
        });
    });

    // Boşlukları ve noktalama işaretlerini kaldır
    normalized = normalized.replace(/[\s\.\-_]/g, '');

    return normalized;
}

/**
 * Küfür/hakaret kontrolü
 */
export function checkProfanity(text: string): { clean: boolean; foundWords: string[] } {
    const normalized = normalizeText(text);
    const foundWords: string[] = [];

    PROFANITY_LIST.forEach(word => {
        if (normalized.includes(word)) {
            foundWords.push(word);
        }
    });

    return {
        clean: foundWords.length === 0,
        foundWords
    };
}

/**
 * Spam kontrolü
 */
export function checkSpam(text: string): { isSpam: boolean; reason?: string } {
    // Tekrarlayan karakterler (5+ kez)
    if (/(.)\1{4,}/.test(text)) {
        return { isSpam: true, reason: 'Çok fazla tekrarlayan karakter' };
    }

    // Çok fazla büyük harf (70%+)
    const upperCount = (text.match(/[A-ZÇĞİÖŞÜ]/g) || []).length;
    const totalLetters = (text.match(/[a-zA-ZçğıöşüÇĞİÖŞÜ]/g) || []).length;

    if (totalLetters > 0 && upperCount / totalLetters > 0.7) {
        return { isSpam: true, reason: 'Çok fazla büyük harf kullanımı' };
    }

    // Çok fazla emoji (10+)
    const emojiCount = (text.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length;
    if (emojiCount > 10) {
        return { isSpam: true, reason: 'Çok fazla emoji' };
    }

    return { isSpam: false };
}

/**
 * Genel içerik validasyonu
 */
export function validateContent(
    title: string,
    content: string
): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Başlık kontrolü
    if (!title || title.trim().length < 3) {
        errors.push('Başlık en az 3 karakter olmalı');
    }

    if (title.length > 100) {
        errors.push('Başlık en fazla 100 karakter olabilir');
    }

    // İçerik kontrolü
    if (!content || content.trim().length < 50) {
        errors.push('Hikaye en az 50 karakter olmalı');
    }

    if (content.length > 5000) {
        errors.push('Hikaye en fazla 5000 karakter olabilir');
    }

    // Küfür kontrolü
    const titleProfanity = checkProfanity(title);
    const contentProfanity = checkProfanity(content);

    if (!titleProfanity.clean) {
        errors.push('Başlıkta uygunsuz içerik tespit edildi');
    }

    if (!contentProfanity.clean) {
        errors.push('Hikayede uygunsuz içerik tespit edildi');
    }

    // Spam kontrolü
    const titleSpam = checkSpam(title);
    const contentSpam = checkSpam(content);

    if (titleSpam.isSpam) {
        errors.push(`Başlık spam olarak işaretlendi: ${titleSpam.reason}`);
    }

    if (contentSpam.isSpam) {
        errors.push(`Hikaye spam olarak işaretlendi: ${contentSpam.reason}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Metni temizle (XSS önleme)
 */
export function sanitizeText(text: string): string {
    // HTML taglerini kaldır
    let sanitized = text.replace(/<[^>]*>/g, '');

    // Çoklu boşlukları tek boşluğa çevir
    sanitized = sanitized.replace(/\s+/g, ' ');

    // Başındaki ve sonundaki boşlukları kaldır
    sanitized = sanitized.trim();

    return sanitized;
}
