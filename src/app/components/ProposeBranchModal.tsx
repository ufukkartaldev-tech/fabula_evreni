'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProposeBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    storyId: string;
    nodeId: string;
    onSuccess: () => void;
    isContinuation?: boolean;
}

export default function ProposeBranchModal({ isOpen, onClose, storyId, nodeId, onSuccess, isContinuation = false }: ProposeBranchModalProps) {
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !text.trim() || !content.trim()) return;

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
                    content,
                    idToken: token
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message);
                onSuccess();
                onClose();
                setText('');
                setContent('');
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
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {isContinuation ? "Hikayeyi Devam Ettir" : "Yeni Yol Öner"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {isContinuation
                            ? "Hikayenin bir sonraki adımını yazın."
                            : "Hikayenin gidişatını değiştirecek bir seçenek ve devamını önerin."}
                    </p>

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hikaye Devamı</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32 resize-none"
                            placeholder="Seçenek seçildiğinde ne olacak? Hikayeyi devam ettir..."
                            maxLength={1000}
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">{content.length}/1000</div>
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
                            disabled={isSubmitting || !text.trim() || !content.trim()}
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
