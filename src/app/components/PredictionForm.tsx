'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createPrediction } from '@/lib/predictionService';

interface PredictionFormProps {
    storyId: string;
    storyTitle: string;
    onPredictionCreated?: () => void;
}

/**
 * Tahmin Oluşturma Formu
 */
export default function PredictionForm({
    storyId,
    storyTitle,
    onPredictionCreated
}: PredictionFormProps) {
    const { user } = useAuth();
    const [prediction, setPrediction] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !prediction.trim()) return;

        setIsSubmitting(true);
        try {
            await createPrediction(
                storyId,
                user.uid,
                user.displayName || 'Anonim',
                user.photoURL || '👤',
                prediction.trim()
            );

            setPrediction('');
            setShowForm(false);
            onPredictionCreated?.();

            // Başarı mesajı
            alert('🔮 Kehanetiniz kaydedildi!');
        } catch (error) {
            console.error('Error creating prediction:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="prediction-form-login">
                <p>Kehanette bulunmak için giriş yapmalısınız.</p>
            </div>
        );
    }

    return (
        <div className="prediction-form-container">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="prediction-trigger-button"
                >
                    <span className="prediction-icon">🔮</span>
                    <span className="prediction-label">Kehanette Bulun</span>
                    <span className="prediction-subtitle">Sıradaki ne olacak?</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="prediction-form">
                    <div className="prediction-form-header">
                        <h3>🔮 Kehanetinizi Paylaşın</h3>
                        <p>"{storyTitle}" hikayesinde sıradaki ne olacak?</p>
                    </div>

                    <textarea
                        value={prediction}
                        onChange={(e) => setPrediction(e.target.value)}
                        placeholder="Tahmininizi buraya yazın... (En az 20 karakter)"
                        className="prediction-textarea"
                        rows={4}
                        minLength={20}
                        maxLength={500}
                        required
                    />

                    <div className="prediction-form-footer">
                        <div className="prediction-char-count">
                            {prediction.length}/500 karakter
                        </div>

                        <div className="prediction-form-actions">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setPrediction('');
                                }}
                                className="prediction-cancel-button"
                                disabled={isSubmitting}
                            >
                                İptal
                            </button>

                            <button
                                type="submit"
                                className="prediction-submit-button"
                                disabled={isSubmitting || prediction.trim().length < 20}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span>
                                        Kehaneti Gönder
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="prediction-form-hint">
                        💡 <strong>İpucu:</strong> Ne kadar detaylı ve yaratıcı olursanız,
                        diğer okuyucular tarafından o kadar çok beğenilirsiniz!
                    </div>
                </form>
            )}
        </div>
    );
}
