'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Draft, getDrafts, deleteDraft } from '@/lib/draftService';
import { getRelativeTime } from '@/lib/notificationService';

export default function DraftsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/giris');
            return;
        }

        async function fetchDrafts() {
            if (!user) return;
            try {
                const userDrafts = await getDrafts(user.uid);
                setDrafts(userDrafts);
            } catch (error) {
                console.error('Error fetching drafts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDrafts();
    }, [user, router]);

    const handleDelete = async (draftId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Bu taslağı silmek istediğinize emin misiniz?')) return;

        try {
            await deleteDraft(draftId);
            setDrafts(drafts.filter(d => d.id !== draftId));
        } catch (error) {
            console.error('Error deleting draft:', error);
            alert('Taslak silinirken bir hata oluştu');
        }
    };

    const handleEdit = (draftId: string) => {
        router.push(`/create?draftId=${draftId}`);
    };

    if (loading) {
        return (
            <div className="drafts-page">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Taslaklar yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="drafts-page">
            <div className="container">
                <div className="page-header">
                    <h1>Taslaklarım</h1>
                    <button
                        className="new-draft-button"
                        onClick={() => router.push('/create')}
                    >
                        + Yeni Taslak
                    </button>
                </div>

                {drafts.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <h2>Henüz taslağınız yok</h2>
                        <p>Aklınızdakileri yazıya dökmeye başlayın.</p>
                    </div>
                ) : (
                    <div className="drafts-grid">
                        {drafts.map((draft) => (
                            <div
                                key={draft.id}
                                className="draft-card"
                                onClick={() => handleEdit(draft.id!)}
                            >
                                <div className="draft-content">
                                    <h3 className="draft-title">
                                        {draft.title || 'İsimsiz Taslak'}
                                    </h3>
                                    <p className="draft-excerpt">
                                        {draft.excerpt || draft.content?.substring(0, 100) || 'İçerik yok...'}
                                    </p>
                                    <div className="draft-meta">
                                        <span className="draft-date">
                                            Son düzenleme: {draft.lastSaved ? getRelativeTime(draft.lastSaved.toDate()) : 'Az önce'}
                                        </span>
                                        {draft.category && (
                                            <span className="draft-category">{draft.category}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="draft-actions">
                                    <button
                                        className="delete-button"
                                        onClick={(e) => handleDelete(draft.id!, e)}
                                        title="Sil"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
