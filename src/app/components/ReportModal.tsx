'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ReportReason, ReportTargetType } from '@/interfaces/Report';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetId: string;
    targetType: ReportTargetType;
    targetContent?: string;
}

export default function ReportModal({ isOpen, onClose, targetId, targetType, targetContent }: ReportModalProps) {
    const { user } = useAuth();
    const [reason, setReason] = useState<ReportReason>('spam');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetId,
                    targetType,
                    targetContent,
                    reason,
                    description,
                    idToken: token
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setDescription('');
                    setReason('spam');
                }, 2000);
            } else {
                alert('Rapor gönderilirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Report error:', error);
            alert('Bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
                {success ? (
                    <div className="p-8 text-center">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Rapor Gönderildi</h3>
                        <p className="text-gray-500 dark:text-gray-400">Bildiriminiz için teşekkürler. İncelenecektir.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">İçeriği Raporla</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sebep</label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value as ReportReason)}
                                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="spam">Spam / Reklam</option>
                                <option value="harassment">Taciz / Zorbalık</option>
                                <option value="inappropriate">Uygunsuz İçerik</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Açıklama (Opsiyonel)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-24 resize-none"
                                placeholder="Daha fazla detay..."
                            />
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
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Raporla'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
