'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Draft, saveDraft, autoSaveDraft, deleteDraft } from '@/lib/draftService';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface DraftEditorProps {
    initialDraft?: Draft;
}

export default function DraftEditor({ initialDraft }: DraftEditorProps) {
    const { user } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState(initialDraft?.title || '');
    const [content, setContent] = useState(initialDraft?.content || '');
    const [category, setCategory] = useState(initialDraft?.category || '');
    const [excerpt, setExcerpt] = useState(initialDraft?.excerpt || '');
    const [coverImage, setCoverImage] = useState(initialDraft?.coverImage || '');
    const [mode, setMode] = useState<'solo' | 'community' | 'chain'>(initialDraft?.mode || 'solo');

    const [draftId, setDraftId] = useState(initialDraft?.id || null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(
        initialDraft?.lastSaved?.toDate() || null
    );
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'unsaved'>('saved');

    // Auto-save logic
    useEffect(() => {
        if (!user || !title) return;

        const saveData = async () => {
            setSaveStatus('saving');

            const draftData = {
                userId: user.uid,
                title,
                content,
                category,
                excerpt,
                coverImage,
                mode,
                autoSaveEnabled: true
            };

            try {
                if (draftId) {
                    // Mevcut taslağı güncelle
                    await autoSaveDraft(draftId, draftData);
                    setLastSaved(new Date());
                    setSaveStatus('saved');
                } else {
                    // Yeni taslak oluştur (ilk karakterde hemen oluşturma, biraz bekle)
                    if (title.length > 3) {
                        const result = await saveDraft(draftData as any);
                        if (result.success && result.draftId) {
                            setDraftId(result.draftId);
                            setLastSaved(new Date());
                            setSaveStatus('saved');
                        }
                    }
                }
            } catch (error) {
                console.error('Auto-save error:', error);
                setSaveStatus('error');
            }
        };

        const timeoutId = setTimeout(saveData, 2000); // 2 saniye debounce
        return () => clearTimeout(timeoutId);
    }, [title, content, category, excerpt, coverImage, mode, user, draftId]);

    const handlePublish = async () => {
        if (!draftId || !user) return;

        if (!title.trim() || !content.trim()) {
            alert('Lütfen başlık ve içerik alanlarını doldurun.');
            return;
        }

        setIsSaving(true);
        try {
            // 1. Get ID Token for secure API call
            const idToken = await user.getIdToken();

            // 2. Call the secure API
            const response = await fetch('/api/create-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    excerpt,
                    category,
                    coverImage,
                    mode,
                    idToken
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // 3. Delete the draft after successful publication
                await deleteDraft(draftId);

                // 4. Redirect to the new story
                router.push(`/story/${result.storyId}`);
            } else {
                // Show validation errors or server error
                const errorMessage = result.details ? result.details.join('\n') : (result.error || 'Yayınlama başarısız');
                alert('Hata:\n' + errorMessage);
            }
        } catch (error) {
            console.error('Publish error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="draft-editor">
            <div className="editor-header">
                <div className="save-status">
                    {saveStatus === 'saving' && 'Kaydediliyor...'}
                    {saveStatus === 'saved' && lastSaved && `Son kayıt: ${lastSaved.toLocaleTimeString()}`}
                    {saveStatus === 'error' && 'Kayıt hatası!'}
                </div>
                <div className="editor-actions flex gap-2">
                    <button
                        className="generate-image-button px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        onClick={() => alert('Yapay zeka görsel oluşturma özelliği yakında eklenecek! 🎨')}
                        title="Yapay Zeka ile Görsel Oluştur"
                    >
                        <span>🎨</span>
                        <span className="hidden md:inline">Görsel Oluştur</span>
                    </button>
                    <button
                        className="publish-button"
                        onClick={handlePublish}
                        disabled={isSaving || !title || !content}
                    >
                        {isSaving ? 'Yayınlanıyor...' : 'Yayınla'}
                    </button>
                </div>
            </div>

            <div className="editor-form">
                <input
                    type="text"
                    className="editor-title"
                    placeholder="Hikaye Başlığı"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className="editor-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Kategori Seçin</option>
                    <option value="Macera">Macera</option>
                    <option value="Bilim Kurgu">Bilim Kurgu</option>
                    <option value="Romantik">Romantik</option>
                    <option value="Korku">Korku</option>
                    <option value="Fantastik">Fantastik</option>
                    <option value="Dram">Dram</option>
                    <option value="Komedi">Komedi</option>
                </select>

                <div className="mode-selector mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hikaye Modu</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            className={`p-3 rounded-lg border text-left transition-all ${mode === 'solo'
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-200 dark:ring-indigo-800'
                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            onClick={() => setMode('solo')}
                        >
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">👤 Solo Yazar</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Klasik hikaye yazımı. Sadece siz yazarsınız.</div>
                        </button>

                        <button
                            className={`p-3 rounded-lg border text-left transition-all ${mode === 'community'
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-800'
                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            onClick={() => setMode('community')}
                        >
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">👥 Topluluk Odaklı</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Okuyucular devam bölümleri önerebilir ve oylayabilir.</div>
                        </button>

                        <button
                            className={`p-3 rounded-lg border text-left transition-all ${mode === 'chain'
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-200 dark:ring-green-800'
                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            onClick={() => setMode('chain')}
                        >
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">🔗 Zincirleme</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Sırayla yazın. Pası istediğiniz yazara atın.</div>
                        </button>
                    </div>
                </div>

                <textarea
                    className="editor-excerpt"
                    placeholder="Kısa Açıklama (Özet)"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                />

                <div className="quill-editor-container">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="Hikayenizi buraya yazın..."
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link'],
                                ['clean']
                            ],
                        }}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
