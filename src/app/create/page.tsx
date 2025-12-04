'use client';

import { useEffect, useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import DraftEditor from '../components/DraftEditor';
import { getDraftById, Draft } from '@/lib/draftService';

function CreatePageContent() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const draftId = searchParams.get('draftId');

    const [initialDraft, setInitialDraft] = useState<Draft | undefined>(undefined);
    const [isLoadingDraft, setIsLoadingDraft] = useState(!!draftId);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!draftId || !user) return;

        async function fetchDraft() {
            try {
                const draft = await getDraftById(draftId!);
                if (draft && draft.userId === user?.uid) {
                    setInitialDraft(draft);
                } else {
                    // Taslak bulunamadı veya yetki yok
                    router.push('/create');
                }
            } catch (error) {
                console.error('Error loading draft:', error);
            } finally {
                setIsLoadingDraft(false);
            }
        }

        fetchDraft();
    }, [draftId, user, router]);

    if (loading || isLoadingDraft) {
        return (
            <div className="create-page">
                <div className="create-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="create-page">
            <div className="create-container">
                <div className="create-header">
                    <h1 className="page-title">
                        <span className="title-icon">✍️</span>
                        {initialDraft ? 'Taslağı Düzenle' : 'Yeni Hikaye Yaz'}
                    </h1>
                    <p className="page-subtitle">
                        {initialDraft
                            ? 'Kaldığınız yerden devam edin...'
                            : 'Hayal gücünüzü serbest bırakın ve hikayenizi dünyayla paylaşın'}
                    </p>
                </div>

                <DraftEditor initialDraft={initialDraft} />
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={<div className="loading-state"><div className="spinner"></div></div>}>
            <CreatePageContent />
        </Suspense>
    );
}
