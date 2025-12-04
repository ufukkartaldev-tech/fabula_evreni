'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Story } from '@/interfaces/Story';
import { Comment } from '@/interfaces/Comment';
import { getStoryById, getCommentsByStoryId, incrementStoryViews, deleteStory, updateStory } from '@/lib/firestore';
import CommentSection from '@/app/components/CommentSection';
import ShareButton from '@/app/components/ShareButton';
import AddToCollectionButton from '@/app/components/AddToCollectionButton';
import ReportButton from '@/app/components/ReportButton';
import ReadingSettings, { ReadingSettingsState } from '@/app/components/ReadingSettings';
import InteractiveStoryPlayer from '@/app/components/InteractiveStoryPlayer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface StoryPageProps {
    params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: StoryPageProps) {
    const [id, setId] = useState<string>('');
    const [story, setStory] = useState<Story | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    const [editContent, setEditContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [readingSettings, setReadingSettings] = useState<ReadingSettingsState>({
        font: 'sans',
        size: 'medium',
        theme: 'light'
    });

    useEffect(() => {
        // Load reading settings
        const savedSettings = localStorage.getItem('fabula-reading-settings');
        if (savedSettings) {
            try {
                setReadingSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error('Error parsing reading settings:', e);
            }
        }
    }, []);

    useEffect(() => {
        async function loadParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        loadParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            try {
                const [fetchedStory, fetchedComments] = await Promise.all([
                    getStoryById(id),
                    getCommentsByStoryId(id)
                ]);

                if (!fetchedStory) {
                    notFound();
                    return;
                }

                setStory(fetchedStory);
                setComments(fetchedComments);

                // Hikaye görüntülenme sayısını artır (async, UI'ı bloklamaz)
                incrementStoryViews(id).catch(err => {
                    console.error('Failed to increment views:', err);
                });
            } catch (error) {
                console.error('Error loading story:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    const handleDelete = async () => {
        if (!confirm('Bu hikayeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteStory(id);
            router.push('/');
        } catch (error) {
            console.error('Error deleting story:', error);
            alert('Hikaye silinirken bir hata oluştu.');
            setIsDeleting(false);
        }
    };

    const handleEdit = () => {
        if (story) {
            setEditTitle(story.title);
            setEditContent(story.content);
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle('');
        setEditContent('');
    };

    const handleSave = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            alert('Başlık ve içerik boş olamaz.');
            return;
        }

        setIsSaving(true);
        try {
            await updateStory(id, {
                title: editTitle,
                content: editContent
            });

            // Yerel state'i güncelle
            setStory(prev => prev ? { ...prev, title: editTitle, content: editContent } : null);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating story:', error);
            alert('Hikaye güncellenirken bir hata oluştu.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="story-page">
                <div className="story-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Hikaye yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!story) {
        notFound();
        return null;
    }

    return (
        <div className="story-page">
            <div className="story-container">
                <Link href="/" className="back-button">
                    <span>←</span>
                    Ana Sayfaya Dön
                </Link>

                <article className="story-article">
                    <header className="story-header">
                        <div className="story-meta">
                            <span className="category-badge">{story.category}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ReadingSettings
                                    onSettingsChange={setReadingSettings}
                                    initialSettings={readingSettings}
                                />
                                <ShareButton storyId={story.id} storyTitle={story.title} size="small" />
                                <AddToCollectionButton storyId={story.id} />
                                <ReportButton
                                    targetId={story.id}
                                    targetType="story"
                                    targetContent={story.title}
                                    className="opacity-50 hover:opacity-100"
                                />
                            </div>
                            <span className="story-date">{formatDate(story.createdAt)}</span>

                            {user && (user.uid === story.authorId) && (
                                <div className="author-actions" style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                                    {!isEditing ? (
                                        <>
                                            <button
                                                onClick={handleEdit}
                                                className="action-button edit-button"
                                                style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    background: '#3b82f6',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                disabled={isDeleting}
                                                className="action-button delete-button"
                                                style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                {isDeleting ? 'Siliniyor...' : 'Sil'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="action-button save-button"
                                                style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    background: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: isSaving ? 'not-allowed' : 'pointer',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                disabled={isSaving}
                                                className="action-button cancel-button"
                                                style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    background: '#6b7280',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: isSaving ? 'not-allowed' : 'pointer',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                İptal
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="story-title-input"
                                style={{
                                    width: '100%',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    color: 'black'
                                }}
                            />
                        ) : (
                            <h1 className="story-title">{story.title}</h1>
                        )}

                        <div className="author-section">
                            <div className="author-info">
                                <span className="author-avatar">
                                    {story.author.avatar.startsWith('http') ? (
                                        <img src={story.author.avatar} alt={story.author.name} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        story.author.avatar
                                    )}
                                </span>
                                <span className="author-name">{story.author.name}</span>
                            </div>

                            <div className="story-stats">
                                <span className="stat">
                                    <span className="stat-icon">👁️</span>
                                    {formatNumber(story.stats.views)} görüntülenme
                                </span>
                                <span className="stat">
                                    <span className="stat-icon">💬</span>
                                    {formatNumber(story.stats.comments)} yorum
                                </span>
                                <span className="stat">
                                    <span className="stat-icon">❤️</span>
                                    {formatNumber(story.stats.likes)} beğeni
                                </span>
                            </div>
                        </div>
                    </header>

                    {story.type === 'interactive' && story.nodes ? (
                        <InteractiveStoryPlayer
                            story={story}
                            readingSettings={readingSettings}
                            onProgressUpdate={(path) => console.log('Path updated:', path)}
                        />
                    ) : (
                        <div
                            className="story-content"
                            style={{
                                fontFamily: readingSettings.font === 'serif' ? 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' :
                                    readingSettings.font === 'mono' ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' :
                                        'ui-sans-serif, system-ui, sans-serif',
                                fontSize: readingSettings.size === 'small' ? '0.95rem' :
                                    readingSettings.size === 'large' ? '1.25rem' :
                                        readingSettings.size === 'xlarge' ? '1.5rem' : '1.1rem',
                                lineHeight: readingSettings.size === 'xlarge' ? '2' : '1.8',
                                backgroundColor: readingSettings.theme === 'sepia' ? '#f4ecd8' :
                                    readingSettings.theme === 'dark' ? '#1f2937' : 'transparent',
                                color: readingSettings.theme === 'sepia' ? '#433422' :
                                    readingSettings.theme === 'dark' ? '#e5e7eb' : 'inherit',
                                padding: readingSettings.theme !== 'light' ? '3rem' : '0',
                                borderRadius: readingSettings.theme !== 'light' ? '4px' : '0',
                                transition: 'all 0.3s ease',
                                // Skeuomorphic styles for Sepia
                                boxShadow: readingSettings.theme === 'sepia'
                                    ? 'inset 20px 0 50px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)'
                                    : 'none',
                                borderLeft: readingSettings.theme === 'sepia' ? '2px solid rgba(0,0,0,0.05)' : 'none',
                                backgroundImage: readingSettings.theme === 'sepia'
                                    ? 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 5%, rgba(255,255,255,0) 10%)'
                                    : 'none'
                            }}
                        >
                            {isEditing ? (
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="story-content-textarea"
                                    style={{
                                        width: '100%',
                                        minHeight: '400px',
                                        fontSize: 'inherit',
                                        lineHeight: 'inherit',
                                        fontFamily: 'inherit',
                                        padding: '1rem',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        color: 'black',
                                        backgroundColor: 'white'
                                    }}
                                />
                            ) : (
                                story.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} style={{ marginBottom: '1.5em' }}>{paragraph}</p>
                                ))
                            )}
                        </div>
                    )}
                </article>

                <CommentSection
                    storyId={id}
                    storyAuthorId={story.authorId}
                    storyTitle={story.title}
                    initialComments={comments}
                />
            </div>
        </div>
    );
}
