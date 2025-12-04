'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounceSearch } from '@/lib/debounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Hikaye ara...' }: SearchBarProps) {
    const [query, setQuery] = useState('');

    // Debounced search function - 300ms optimal
    // Kullanıcı "Gümüşhane" yazarken 10 tuş yerine 1 sorgu gider
    // %90 sunucu yükü azalması
    const debouncedSearchRef = useRef(
        debounceSearch((searchQuery: string) => {
            onSearch(searchQuery);
        }, 300)
    );

    useEffect(() => {
        debouncedSearchRef.current(query);
    }, [query]);

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button className="search-clear" onClick={handleClear} title="Temizle">
                    ✕
                </button>
            )}
        </div>
    );
}
