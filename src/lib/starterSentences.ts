/**
 * Başlangıç cümleleri
 * Kullanıcıların hikaye yazmaya başlaması için ilham verici cümleler
 */

export interface StarterSentence {
    id: number;
    text: string;
    category: string;
    emoji: string;
}

export const STARTER_SENTENCES: StarterSentence[] = [
    {
        id: 1,
        text: "Kapı çalındığında, kimsenin gelmeyeceğini düşünüyordum. Ama karşımda duran kişi, hayatımı sonsuza dek değiştirecekti...",
        category: "Gizem",
        emoji: "🚪"
    },
    {
        id: 2,
        text: "Eski sandığın dibinde bulduğum mektup, her şeyi değiştirdi. Dedemin el yazısıyla yazılmış satırlar, ailemizin en karanlık sırrını açığa çıkarıyordu...",
        category: "Macera",
        emoji: "📜"
    },
    {
        id: 3,
        text: "Sabah uyandığımda, dün yaşananların gerçek olmadığını anladım. Ya da belki de gerçek olan, şu an yaşadığım değildi...",
        category: "Fantastik",
        emoji: "✨"
    }
];

/**
 * Rastgele başlangıç cümlesi getir
 */
export function getRandomStarters(count: number = 3): StarterSentence[] {
    const shuffled = [...STARTER_SENTENCES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, STARTER_SENTENCES.length));
}

/**
 * ID'ye göre başlangıç cümlesi getir
 */
export function getStarterById(id: number): StarterSentence | undefined {
    return STARTER_SENTENCES.find(s => s.id === id);
}
