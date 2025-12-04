'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface AdminStory {
    id: string;
    title: string;
    author: {
        name: string;
        avatar?: string;
    };
    createdAt: string;
    stats: {
        views: number;
        likes: number;
        comments: number;
    };
}

export default function AdminStoriesPage() {
    const { user } = useAuth();
    const [stories, setStories] = useState<AdminStory[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchStories();
    }, [user]);

    const fetchStories = async () => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/admin/stories', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.stories) {
                setStories(data.stories);
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu hikayeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        if (!user) return;

        setDeletingId(id);
        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/admin/stories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setStories(stories.filter(s => s.id !== id));
            } else {
                alert('Silme işlemi başarısız oldu.');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
            alert('Bir hata oluştu.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Yükleniyor...</div>;
    }

    return (
        <div className="admin-stories-page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hikaye Yönetimi</h1>
                <button
                    onClick={fetchStories}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    🔄 Yenile
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Başlık</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Yazar</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">İstatistikler</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Tarih</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {stories.map((story) => (
                                <tr key={story.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4">
                                        <Link href={`/story/${story.id}`} target="_blank" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                            {story.title}
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{story.author.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        👁️ {story.stats?.views || 0} • ❤️ {story.stats?.likes || 0}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(story.id)}
                                            disabled={deletingId === story.id}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                                        >
                                            {deletingId === story.id ? 'Siliniyor...' : 'Sil'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {stories.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Henüz hiç hikaye yok.
                    </div>
                )}
            </div>
        </div>
    );
}
