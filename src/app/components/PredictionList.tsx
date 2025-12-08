'use client';

import { useState, useEffect } from 'react';
import { Prediction } from '@/interfaces/Prediction';
import { getPredictionsForStory, upvotePrediction } from '@/lib/predictionService';
import { useAuth } from '@/contexts/AuthContext';

interface PredictionListProps {
    storyId: string;
    refreshTrigger?: number;
}

/**
 * Tahmin Listesi Bileşeni
 */
export default function PredictionList({ storyId, refreshTrigger }: PredictionListProps) {
    const { user } = useAuth();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPredictions();
    }, [storyId, refreshTrigger]);

    const loadPredictions = async () => {
        setLoading(true);
        try {
            const data = await getPredictionsForStory(storyId);
            setPredictions(data);
        } catch (error) {
            console.error('Error loading predictions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (predictionId: string) => {
        if (!user) {
            alert('Beğenmek için giriş yapmalısınız.');
            return;
        }

        try {
            await upvotePrediction(predictionId, user.uid);
            await loadPredictions(); // Refresh
        } catch (error) {
            console.error('Error upvoting prediction:', error);
        }
    };

    const getStatusBadge = (status: Prediction['status']) => {
        switch (status) {
            case 'correct':
                return <span className="prediction-badge prediction-badge-correct">✅ Doğru</span>;
            case 'incorrect':
                return <span className="prediction-badge prediction-badge-incorrect">❌ Yanlış</span>;
            case 'partially_correct':
                return <span className="prediction-badge prediction-badge-partial">⚡ Kısmen Doğru</span>;
            default:
                return <span className="prediction-badge prediction-badge-pending">⏳ Beklemede</span>;
        }
    };

    if (loading) {
        return (
            <div className="prediction-list-loading">
                <div className="spinner"></div>
                <p>Kehanetler yükleniyor...</p>
            </div>
        );
    }

    if (predictions.length === 0) {
        return (
            <div className="prediction-list-empty">
                <span className="empty-icon">🔮</span>
                <h3>Henüz kehanet yok</h3>
                <p>İlk kehanette bulunan siz olun!</p>
            </div>
        );
    }

    return (
        <div className="prediction-list">
            <div className="prediction-list-header">
                <h3>🔮 Topluluk Kehanetleri</h3>
                <span className="prediction-count">{predictions.length} kehanet</span>
            </div>

            <div className="predictions">
                {predictions.map((prediction) => (
                    <div key={prediction.id} className="prediction-card">
                        <div className="prediction-card-header">
                            <div className="prediction-author">
                                <span className="prediction-author-avatar">
                                    {prediction.userAvatar}
                                </span>
                                <div className="prediction-author-info">
                                    <span className="prediction-author-name">{prediction.userName}</span>
                                    <span className="prediction-date">
                                        {prediction.createdAt.toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {getStatusBadge(prediction.status)}
                        </div>

                        <div className="prediction-content">
                            <p>{prediction.prediction}</p>
                        </div>

                        <div className="prediction-card-footer">
                            <button
                                onClick={() => handleUpvote(prediction.id)}
                                className={`prediction-upvote-button ${user && prediction.upvotedBy.includes(user.uid) ? 'upvoted' : ''
                                    }`}
                                disabled={!user}
                            >
                                <span className="upvote-icon">👍</span>
                                <span className="upvote-count">{prediction.upvotes}</span>
                            </button>

                            {prediction.status !== 'pending' && (
                                <div className="prediction-points">
                                    <span className="points-icon">⭐</span>
                                    <span className="points-value">{prediction.points} puan</span>
                                </div>
                            )}

                            {prediction.accuracy !== undefined && (
                                <div className="prediction-accuracy">
                                    <span className="accuracy-icon">🎯</span>
                                    <span className="accuracy-value">%{prediction.accuracy} doğruluk</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
