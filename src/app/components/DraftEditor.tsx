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
    }, [title, content, category, excerpt, coverImage, user, draftId]);

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
                <div className="editor-actions">
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
