'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addStory } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    'Macera',
    'Romantik',
    'Bilim Kurgu',
    'Fantastik',
    'Gizem',
    'Korku',
    'Komedi',
    'Dram',
    'Tarih',
    'Diğer'
];

interface StoryFormProps {
    onSuccess?: () => void;
}

export default function StoryForm({ onSuccess }: StoryFormProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Başlık gereklidir';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Başlık en az 5 karakter olmalıdır';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Başlık en fazla 100 karakter olabilir';
        }

        if (!formData.category) {
            newErrors.category = 'Kategori seçmelisiniz';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Hikaye içeriği gereklidir';
        } else if (formData.content.length < 100) {
            newErrors.content = 'Hikaye en az 100 karakter olmalıdır';
        } else if (formData.content.length > 10000) {
            newErrors.content = 'Hikaye en fazla 10,000 karakter olabilir';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert('Hikaye yazmak için giriş yapmalısınız');
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Otomatik excerpt oluştur (ilk 150 karakter)
            const excerpt = formData.content.substring(0, 150) + (formData.content.length > 150 ? '...' : '');

            const storyData = {
                title: formData.title.trim(),
                category: formData.category,
                content: formData.content.trim(),
                excerpt,
                author: {
                    name: user.displayName || 'Anonim',
                    avatar: user.photoURL || '👤'
                },
                authorId: user.uid,
                stats: {
                    views: 0,
                    comments: 0,
                    likes: 0
                }
            };

            const storyId = await addStory(storyData);

            // Başarılı kayıt
            if (onSuccess) {
                onSuccess();
            }

            // Hikaye sayfasına yönlendir
            router.push(`/story/${storyId}`);
        } catch (error) {
            console.error('Error creating story:', error);
            alert('Hikaye kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form className="story-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
                <label htmlFor="title" className="form-label">
                    Başlık *
                </label>
                <input
                    type="text"
                    id="title"
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    placeholder="Hikayenize çekici bir başlık verin"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    maxLength={100}
                />
                <div className="form-meta">
                    <span className={errors.title ? 'error-text' : ''}>
                        {errors.title || `${formData.title.length}/100`}
                    </span>
                </div>
            </div>

            {/* Category */}
            <div className="form-group">
                <label htmlFor="category" className="form-label">
                    Kategori *
                </label>
                <select
                    id="category"
                    className={`form-select ${errors.category ? 'error' : ''}`}
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">Kategori seçin</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && (
                    <span className="error-text">{errors.category}</span>
                )}
            </div>

            {/* Content */}
            <div className="form-group">
                <label htmlFor="content" className="form-label">
                    Hikaye *
                </label>
                <textarea
                    id="content"
                    className={`form-textarea ${errors.content ? 'error' : ''}`}
                    placeholder="Hikayenizi buraya yazın..."
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={15}
                    maxLength={10000}
                />
                <div className="form-meta">
                    <span className={errors.content ? 'error-text' : ''}>
                        {errors.content || `${formData.content.length}/10,000`}
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    İptal
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Kaydediliyor...' : 'Hikayeyi Yayınla'}
                </button>
            </div>
        </form>
    );
}
