'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Collection } from '@/interfaces/Collection';

interface AddToCollectionButtonProps {
    storyId: string;
    className?: string;
}

export default function AddToCollectionButton({ storyId, className = '' }: AddToCollectionButtonProps) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [creating, setCreating] = useState(false);

    const fetchCollections = async () => {
        if (!user) return;
        setLoading(true);
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

    const handleOpen = () => {
        if (!user) {
            alert('Lütfen önce giriş yapın.');
            return;
        }
        setIsOpen(true);
        fetchCollections();
    };

    const handleCreateCollection = async () => {
        if (!newCollectionName.trim() || !user) return;
        setCreating(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newCollectionName,
                    idToken: token
                })
            });

            if (response.ok) {
                setNewCollectionName('');
                fetchCollections(); // Refresh list
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        } finally {
            setCreating(false);
        }
    };

    const toggleStoryInCollection = async (collection: Collection) => {
        if (!user) return;

        const isPresent = collection.storyIds?.includes(storyId);
        const action = isPresent ? 'remove_story' : 'add_story';

        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/collections/${collection.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    storyId,
                    idToken: token
                })
            });

            if (response.ok) {
                // Optimistic update
                setCollections(collections.map(c => {
                    if (c.id === collection.id) {
                        const newStoryIds = isPresent
                            ? c.storyIds.filter(id => id !== storyId)
                            : [...(c.storyIds || []), storyId];
                        return { ...c, storyIds: newStoryIds };
                    }
                    return c;
                }));
            }
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className={`text-gray-400 hover:text-indigo-500 transition-colors ${className}`}
                title="Listeye Ekle"
            >
                🔖
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 dark:text-white">Listeye Ekle</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>

                        <div className="p-4 max-h-64 overflow-y-auto">
                            {loading ? (
                                <div className="text-center py-4">Yükleniyor...</div>
                            ) : collections.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">Henüz listeniz yok.</div>
                            ) : (
                                <div className="space-y-2">
                                    {collections.map(collection => {
                                        const isSelected = collection.storyIds?.includes(storyId);
                                        return (
                                            <button
                                                key={collection.id}
                                                onClick={() => toggleStoryInCollection(collection)}
                                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${isSelected
                                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                                                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                <span className="font-medium">{collection.name}</span>
                                                {isSelected && <span>✓</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCollectionName}
                                    onChange={(e) => setNewCollectionName(e.target.value)}
                                    placeholder="Yeni liste adı..."
                                    className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                                />
                                <button
                                    onClick={handleCreateCollection}
                                    disabled={creating || !newCollectionName.trim()}
                                    className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
                                >
                                    {creating ? '...' : 'Oluştur'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
