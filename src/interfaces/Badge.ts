export interface Badge {
    id: number;
    name: string;
    emoji: string;
    requiredXP: number;
    description: string;
}

export const BADGES: Badge[] = [
    {
        id: 1,
        name: 'Çırak',
        emoji: '🌱',
        requiredXP: 0,
        description: 'Yolculuk başlıyor'
    },
    {
        id: 2,
        name: 'Gezgin',
        emoji: '🎒',
        requiredXP: 100,
        description: 'İlk adımlar atıldı'
    },
    {
        id: 3,
        name: 'Kaşif',
        emoji: '🧭',
        requiredXP: 300,
        description: 'Yeni dünyalar keşfediliyor'
    },
    {
        id: 4,
        name: 'Maceracı',
        emoji: '⚔️',
        requiredXP: 600,
        description: 'Zorluklara meydan okuyan'
    },
    {
        id: 5,
        name: 'Bilge',
        emoji: '📜',
        requiredXP: 1000,
        description: 'Bilgi güçtür'
    },
    {
        id: 6,
        name: 'Üstat',
        emoji: '🔮',
        requiredXP: 2000,
        description: 'Ustalık seviyesi'
    },
    {
        id: 7,
        name: 'Efsane',
        emoji: '👑',
        requiredXP: 5000,
        description: 'Adın dilden dile dolaşıyor'
    }
];

/**
 * Kullanıcının toplam XP'sine göre rozetini hesapla
 */
export function getUserBadge(xp: number): Badge {
    // En yüksek eşikten başla, aşağı in
    for (let i = BADGES.length - 1; i >= 0; i--) {
        if (xp >= BADGES[i].requiredXP) {
            return BADGES[i];
        }
    }

    // Hiç XP yoksa bile ilk rozeti ver
    return BADGES[0];
}

/**
 * Sonraki rozete kaç XP kaldığını hesapla
 */
export function getXPToNextBadge(xp: number): { nextBadge: Badge | null; remainingXP: number; progress: number } {
    const currentBadge = getUserBadge(xp);
    const currentIndex = BADGES.findIndex(b => b.id === currentBadge.id);

    // Son rozetteyse
    if (currentIndex === BADGES.length - 1) {
        return { nextBadge: null, remainingXP: 0, progress: 100 };
    }

    const nextBadge = BADGES[currentIndex + 1];
    const remainingXP = nextBadge.requiredXP - xp;

    // İlerleme yüzdesi hesapla (Bulunduğu seviye ile bir sonraki seviye arası)
    const currentLevelBaseXP = currentBadge.requiredXP;
    const nextLevelXP = nextBadge.requiredXP;
    const levelSpan = nextLevelXP - currentLevelBaseXP;
    const xpInLevel = xp - currentLevelBaseXP;
    const progress = Math.min(100, Math.max(0, (xpInLevel / levelSpan) * 100));

    return { nextBadge, remainingXP, progress };
}

/**
 * Tüm rozetleri al
 */
export function getAllBadges(): Badge[] {
    return BADGES;
}

// Export badges as an alias for backward compatibility
export const badges = BADGES;
