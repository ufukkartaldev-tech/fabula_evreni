'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Collection } from '@/interfaces/Collection';
import Link from 'next/link';

export default function CollectionsPage() {
    const { user } = useAuth();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetchCollections();
    }, [user]);

    const fetchCollections = async () => {
        if (!user) return;
        try {
            const response = await fetch(`/api/collections?userId=${user.uid}`);
            const data = await response.json();
            if (data.collections) {
                setCollections(data.collections);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="p-8 text-center">
                <p>Okuma listelerinizi görmek için giriş yapmalısınız.</p>
                <Link href="/login" className="text-indigo-600 hover:underline">Giriş Yap</Link>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center">Yükleniyor...</div>;
    }

    return (
        <div className="collections-page max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Okuma Listelerim</h1>
                {/* Create button could go here, but we handle creation via AddToCollectionButton mostly. 
                    Maybe add a standalone create button later. */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <Link href={`/collections/${collection.id}`} key={collection.id} className="block group">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl">
                                📚
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                    {collection.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {collection.description || 'Açıklama yok.'}
                                </p>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>{collection.storyIds?.length || 0} Hikaye</span>
                                    <span>{collection.isPublic ? '🌐 Herkese Açık' : '🔒 Gizli'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {collections.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <span className="text-4xl block mb-4">📂</span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Henüz listeniz yok</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Hikayeleri okurken "Listeye Ekle" butonunu kullanarak yeni listeler oluşturabilirsiniz.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
