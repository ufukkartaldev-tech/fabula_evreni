'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Collection } from '@/interfaces/Collection';
import { Story } from '@/interfaces/Story';
import StoryCard from '@/app/components/StoryCard';
import { useRouter } from 'next/navigation';

interface CollectionDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [collection, setCollection] = useState<Collection & { stories: Story[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        async function loadParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        loadParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;
        fetchCollection();
    }, [id]);

    const fetchCollection = async () => {
        try {
            const response = await fetch(`/api/collections/${id}`);
            const data = await response.json();
            if (data.collection) {
                setCollection(data.collection);
            } else {
                // Handle not found or private
            }
        } catch (error) {
            console.error('Error fetching collection:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bu listeyi silmek istediğinize emin misiniz?') || !user) return;

        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/collections/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                router.push('/collections');
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!collection) return <div className="p-8 text-center">Liste bulunamadı veya erişim izniniz yok.</div>;

    const isOwner = user?.uid === collection.userId;

    return (
        <div className="collection-detail-page max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{collection.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300">{collection.description}</p>
                    </div>
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            🗑️ Sil
                        </button>
                    )}
                </div>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                    <span>{collection.stories?.length || 0} Hikaye</span>
                    <span>•</span>
                    <span>{collection.isPublic ? '🌐 Herkese Açık' : '🔒 Gizli'}</span>
                    <span>•</span>
                    <span>Oluşturulma: {new Date(collection.createdAt as any).toLocaleDateString('tr-TR')}</span>
                </div>
            </div>

            <div className="stories-grid grid grid-cols-1 gap-6">
                {collection.stories && collection.stories.length > 0 ? (
                    collection.stories.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <p className="text-gray-500">Bu listede henüz hikaye yok.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
