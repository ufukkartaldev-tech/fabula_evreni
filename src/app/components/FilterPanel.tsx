'use client';

import { useRef, useEffect } from 'react';
import { SortOption } from '@/lib/searchService';
import { debounceFilter } from '@/lib/debounce';

interface FilterPanelProps {
    categories: string[];
    authors: Array<{ id: string; name: string }>;
    selectedCategory?: string;
    selectedAuthor?: string;
    selectedSort: SortOption;
    onCategoryChange: (category: string) => void;
    onAuthorChange: (authorId: string) => void;
    onSortChange: (sort: SortOption) => void;
    onClearFilters: () => void;
}

export default function FilterPanel({
    categories,
    authors,
    selectedCategory,
    selectedAuthor,
    selectedSort,
    onCategoryChange,
    onAuthorChange,
    onSortChange,
    onClearFilters
}: FilterPanelProps) {
    const hasActiveFilters = selectedCategory || selectedAuthor || selectedSort !== 'newest';

    // Debounced filter functions - 400ms optimal
    // Hızlı 3-4 tık tek sorguda birleşir
    const debouncedCategoryChange = useRef(
        debounceFilter((category: string) => {
            onCategoryChange(category);
        }, 400)
    );

    const debouncedAuthorChange = useRef(
        debounceFilter((authorId: string) => {
            onAuthorChange(authorId);
        }, 400)
    );

    const debouncedSortChange = useRef(
        debounceFilter((sort: SortOption) => {
            onSortChange(sort);
        }, 400)
    );

    return (
        <div className="filter-panel">
            <div className="filter-group">
                <label className="filter-label">Kategori</label>
                <select
                    className="filter-select"
                    value={selectedCategory || ''}
                    onChange={(e) => debouncedCategoryChange.current(e.target.value)}
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Yazar</label>
                <select
                    className="filter-select"
                    value={selectedAuthor || ''}
                    onChange={(e) => debouncedAuthorChange.current(e.target.value)}
                >
                    <option value="">Tüm Yazarlar</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Sıralama</label>
                <select
                    className="filter-select"
                    value={selectedSort}
                    onChange={(e) => debouncedSortChange.current(e.target.value as SortOption)}
                >
                    <option value="newest">En Yeni</option>
                    <option value="popular">En Popüler</option>
                    <option value="mostLiked">En Çok Beğenilen</option>
                    <option value="mostViewed">En Çok Görüntülenen</option>
                </select>
            </div>

            {hasActiveFilters && (
                <button className="clear-filters-button" onClick={onClearFilters}>
                    <span>🔄</span>
                    Filtreleri Temizle
                </button>
            )}
        </div>
    );
}
