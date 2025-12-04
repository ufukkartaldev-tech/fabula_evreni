'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProposeBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    storyId: string;
    nodeId: string;
    onSuccess: () => void;
}

export default function ProposeBranchModal({ isOpen, onClose, storyId, nodeId, onSuccess }: ProposeBranchModalProps) {
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !text.trim()) return;

        setIsSubmitting(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/stories/${storyId}/propose`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodeId,
                    text,
                    idToken: token
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message);
                onSuccess();
                onClose();
                setText('');
            } else {
                alert(result.error || 'Bir hata oluştu.');
            }
        } catch (error) {
            console.error('Error proposing branch:', error);
            alert('Bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
                <form onSubmit={handleSubmit} className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Yeni Yol Öner</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Hikayenin gidişatını değiştirecek bir seçenek önerin.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seçenek Metni</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Örn: Ormana doğru koş..."
                            maxLength={100}
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">{text.length}/100</div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !text.trim()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Gönderiliyor...' : 'Öner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
