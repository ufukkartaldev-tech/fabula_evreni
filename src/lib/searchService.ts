import { Story } from '@/interfaces/Story';

export type SortOption = 'newest' | 'popular' | 'mostLiked' | 'mostViewed';

export interface SearchFilters {
    query?: string;
    category?: string;
    authorId?: string;
    startDate?: Date;
    endDate?: Date;
    sortBy?: SortOption;
}

// Hikayelerde arama yap
export function searchStories(stories: Story[], filters: SearchFilters): Story[] {
    let filtered = [...stories];

    // Metin araması (başlık ve içerikte)
    if (filters.query && filters.query.trim()) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter(story =>
            story.title.toLowerCase().includes(query) ||
            story.content.toLowerCase().includes(query) ||
            story.excerpt.toLowerCase().includes(query)
        );
    }

    // Kategori filtresi
    if (filters.category) {
        filtered = filtered.filter(story => story.category === filters.category);
    }

    // Yazar filtresi
    if (filters.authorId) {
        filtered = filtered.filter(story => story.authorId === filters.authorId);
    }

    // Tarih aralığı filtresi
    if (filters.startDate) {
        filtered = filtered.filter(story => story.createdAt >= filters.startDate!);
    }
    if (filters.endDate) {
        filtered = filtered.filter(story => story.createdAt <= filters.endDate!);
    }

    // Sıralama
    if (filters.sortBy) {
        filtered = sortStories(filtered, filters.sortBy);
    }

    return filtered;
}

// Hikayeleri sırala
export function sortStories(stories: Story[], sortBy: SortOption): Story[] {
    const sorted = [...stories];

    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        case 'popular':
            // Popülerlik = görüntülenme + yorum + beğeni kombinasyonu
            return sorted.sort((a, b) => {
                const scoreA = a.stats.views + (a.stats.comments * 10) + (a.stats.likes * 5);
                const scoreB = b.stats.views + (b.stats.comments * 10) + (b.stats.likes * 5);
                return scoreB - scoreA;
            });
        case 'mostLiked':
            return sorted.sort((a, b) => b.stats.likes - a.stats.likes);
        case 'mostViewed':
            return sorted.sort((a, b) => b.stats.views - a.stats.views);
        default:
            return sorted;
    }
}

// Tüm kategorileri getir
export function getAllCategories(stories: Story[]): string[] {
    const categories = new Set(stories.map(story => story.category));
    return Array.from(categories).sort();
}

// Tüm yazarları getir
export function getAllAuthors(stories: Story[]): Array<{ id: string; name: string }> {
    const authorsMap = new Map<string, string>();

    stories.forEach(story => {
        if (story.authorId && !authorsMap.has(story.authorId)) {
            authorsMap.set(story.authorId, story.author.name);
        }
    });

    return Array.from(authorsMap.entries())
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}
