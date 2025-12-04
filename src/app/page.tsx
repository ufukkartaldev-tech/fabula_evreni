'use client';

import { useEffect, useState, useCallback } from 'react';
import StoryCard from './components/StoryCard';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import { StoryGridSkeleton } from './components/SkeletonLoader';
import { Story } from '@/interfaces/Story';
import { getStoriesPaginated } from '@/lib/firestore';
import { searchStories, getAllCategories, getAllAuthors, SearchFilters, SortOption } from '@/lib/searchService';

const STORIES_PER_PAGE = 12; // Sayfa başına hikaye sayısı

export default function Home() {
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [topStories, setTopStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDocRef, setLastDocRef] = useState<any>(null); // Store lastDoc reference

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');

  // Categories and authors for filters
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<Array<{ id: string; name: string }>>([]);

  // İlk yükleme - Paginated query kullan (OPTIMIZE EDİLDİ)
  useEffect(() => {
    async function fetchInitialStories() {
      try {
        const { stories, lastDoc } = await getStoriesPaginated(STORIES_PER_PAGE);
        setAllStories(stories);
        setFilteredStories(stories);
        setHasMore(lastDoc !== null);
        setLastDocRef(lastDoc);

        // Extract categories and authors
        setCategories(getAllCategories(stories));
        setAuthors(getAllAuthors(stories));
      } catch (error) {
        console.error('Error loading stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialStories();
    fetchInitialStories();
  }, []);

  // Fetch Top Stories (Cached)
  useEffect(() => {
    async function fetchTopStories() {
      try {
        const response = await fetch('/api/get-top-stories');
        const data = await response.json();
        if (data.success) {
          // Convert ISO strings back to Date objects if needed, 
          // but for display purposes strings might be fine or need parsing
          const storiesWithDates = data.stories.map((s: any) => ({
            ...s,
            createdAt: new Date(s.createdAt)
          }));
          setTopStories(storiesWithDates);
        }
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    }

    fetchTopStories();
  }, []);

  // Daha fazla hikaye yükle
  const loadMoreStories = async () => {
    if (loadingMore || !hasMore || !lastDocRef) return;

    setLoadingMore(true);
    try {
      const { stories: newStories, lastDoc } = await getStoriesPaginated(
        STORIES_PER_PAGE,
        lastDocRef
      );

      const updatedStories = [...allStories, ...newStories];
      setAllStories(updatedStories);
      setHasMore(lastDoc !== null);
      setLastDocRef(lastDoc);

      // Update categories and authors
      setCategories(getAllCategories(updatedStories));
      setAuthors(getAllAuthors(updatedStories));

      // Filtreleri yeniden uygula
      const filters: SearchFilters = {
        query: searchQuery,
        category: selectedCategory || undefined,
        authorId: selectedAuthor || undefined,
        sortBy: selectedSort
      };
      const filtered = searchStories(updatedStories, filters);
      setFilteredStories(filtered);
    } catch (error) {
      console.error('Error loading more stories:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Apply filters whenever any filter changes
  useEffect(() => {
    const filters: SearchFilters = {
      query: searchQuery,
      category: selectedCategory || undefined,
      authorId: selectedAuthor || undefined,
      sortBy: selectedSort
    };

    const filtered = searchStories(allStories, filters);
    setFilteredStories(filtered);
  }, [searchQuery, selectedCategory, selectedAuthor, selectedSort, allStories]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedAuthor('');
    setSelectedSort('newest');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Fabula</span>
          </h1>
          <p className="hero-subtitle">
            Hikayelerin buluşma noktası. Oku, yorum yap, paylaş.
          </p>
        </div>
      </div>

      <main className="main-content">
        <div className="search-filter-section">
          <SearchBar onSearch={handleSearch} />
          <FilterPanel
            categories={categories}
            authors={authors}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
            selectedSort={selectedSort}
            onCategoryChange={setSelectedCategory}
            onAuthorChange={setSelectedAuthor}
            onSortChange={setSelectedSort}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Top Stories Section */}
        {!searchQuery && !selectedCategory && !selectedAuthor && topStories.length > 0 && (
          <div className="top-stories-section mb-12">
            <div className="section-header flex items-center gap-2 mb-6">
              <span className="text-2xl">🏆</span>
              <h2 className="text-2xl font-bold">Haftanın En İyileri</h2>
            </div>
            <div className="top-stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topStories.slice(0, 3).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        )}

        <div className="stories-header">
          <h2>
            {searchQuery ? `"${searchQuery}" için sonuçlar` : '✨ Hikayeler'}
          </h2>
          <p>
            {filteredStories.length} hikaye bulundu
          </p>
        </div>

        {loading ? (
          <StoryGridSkeleton count={12} />
        ) : filteredStories.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>Aradığınız kriterlere uygun hikaye bulunamadı.</p>
            {(searchQuery || selectedCategory || selectedAuthor) && (
              <button className="browse-button" onClick={handleClearFilters}>
                Tüm Hikayeleri Göster
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="stories-grid">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Daha fazla yükle butonu - sadece filtre yoksa göster */}
            {hasMore && !searchQuery && !selectedCategory && !selectedAuthor && (
              <div className="load-more-section">
                <button
                  className="load-more-button"
                  onClick={loadMoreStories}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <span className="spinner-small"></span>
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <span>📚</span>
                      Daha Fazla Hikaye Yükle
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
