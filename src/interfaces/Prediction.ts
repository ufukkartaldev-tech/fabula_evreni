/**
 * Hikaye Kehanetleri (Story Predictions) Interface
 */

export interface Prediction {
    id: string;
    storyId: string;
    userId: string;
    userName: string;
    userAvatar: string;

    // Tahmin içeriği
    prediction: string; // Kullanıcının tahmini
    chapterNumber?: number; // Hangi bölüm için tahmin (opsiyonel)

    // Durum
    status: 'pending' | 'correct' | 'incorrect' | 'partially_correct';
    accuracy?: number; // 0-100 arası doğruluk yüzdesi

    // Puanlama
    points: number; // Kazanılan puan

    // Sosyal
    upvotes: number; // Diğer kullanıcıların beğenisi
    upvotedBy: string[]; // Beğenen kullanıcı ID'leri

    // Zaman damgaları
    createdAt: Date;
    evaluatedAt?: Date; // Tahmin değerlendirildiğinde
}

export interface PredictionChallenge {
    id: string;
    storyId: string;
    storyTitle: string;
    authorId: string;

    // Challenge detayları
    question: string; // "Sıradaki ne olacak?"
    hint?: string; // Opsiyonel ipucu
    deadline: Date; // Tahmin son tarihi

    // Durum
    status: 'active' | 'closed' | 'evaluated';

    // İstatistikler
    totalPredictions: number;
    participantCount: number;

    // Ödül
    rewardPoints: number; // Doğru tahmin için puan

    createdAt: Date;
    closedAt?: Date;
}

export interface UserPredictionStats {
    userId: string;

    // Genel istatistikler
    totalPredictions: number;
    correctPredictions: number;
    incorrectPredictions: number;
    partiallyCorrectPredictions: number;

    // Puan
    totalPoints: number;
    averageAccuracy: number; // 0-100

    // Rozet ve seviye
    rank: PredictionRank;
    badges: PredictionBadge[];

    // Streak (ardışık doğru tahminler)
    currentStreak: number;
    longestStreak: number;

    // Sosyal
    totalUpvotes: number; // Tahminlerine gelen toplam beğeni

    // Zaman
    lastPredictionAt?: Date;
    updatedAt: Date;
}

export type PredictionRank =
    | 'novice'           // Acemi (0-100 puan)
    | 'apprentice'       // Çırak (100-500 puan)
    | 'seer'             // Kahin (500-1000 puan)
    | 'oracle'           // Bilge (1000-2500 puan)
    | 'prophet'          // Peygamber (2500-5000 puan)
    | 'grandmaster';     // Büyük Üstat (5000+ puan)

export interface PredictionBadge {
    id: string;
    name: string;
    description: string;
    icon: string; // Emoji veya icon adı
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earnedAt: Date;
}

// Rozet tipleri
export const PREDICTION_BADGES = {
    FIRST_PREDICTION: {
        id: 'first_prediction',
        name: 'İlk Kehanet',
        description: 'İlk tahminini yaptın',
        icon: '🔮',
        rarity: 'common' as const
    },
    PERFECT_WEEK: {
        id: 'perfect_week',
        name: 'Mükemmel Hafta',
        description: 'Bir hafta boyunca tüm tahminlerin doğru',
        icon: '⭐',
        rarity: 'rare' as const
    },
    STREAK_5: {
        id: 'streak_5',
        name: 'Seri Kahin',
        description: '5 ardışık doğru tahmin',
        icon: '🔥',
        rarity: 'rare' as const
    },
    STREAK_10: {
        id: 'streak_10',
        name: 'Bilge',
        description: '10 ardışık doğru tahmin',
        icon: '✨',
        rarity: 'epic' as const
    },
    TOP_PREDICTOR: {
        id: 'top_predictor',
        name: 'Baş Kahin',
        description: 'Liderlik tablosunda 1. oldun',
        icon: '👑',
        rarity: 'legendary' as const
    },
    POPULAR_PREDICTION: {
        id: 'popular_prediction',
        name: 'Halk Kahini',
        description: 'Bir tahminin 50+ beğeni aldı',
        icon: '💫',
        rarity: 'epic' as const
    },
    CENTURY: {
        id: 'century',
        name: 'Yüzüncü Kehanet',
        description: '100 tahmin yaptın',
        icon: '💯',
        rarity: 'epic' as const
    }
} as const;

// Rank seviyeleri ve gereksinimleri
export const RANK_REQUIREMENTS = {
    novice: { minPoints: 0, maxPoints: 100, name: 'Acemi', icon: '🌱' },
    apprentice: { minPoints: 100, maxPoints: 500, name: 'Çırak', icon: '📚' },
    seer: { minPoints: 500, maxPoints: 1000, name: 'Kahin', icon: '🔮' },
    oracle: { minPoints: 1000, maxPoints: 2500, name: 'Bilge', icon: '🧙' },
    prophet: { minPoints: 2500, maxPoints: 5000, name: 'Peygamber', icon: '⚡' },
    grandmaster: { minPoints: 5000, maxPoints: Infinity, name: 'Büyük Üstat', icon: '👑' }
} as const;
