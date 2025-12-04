'use client';

import { useState } from 'react';

interface CommentFormProps {
    onSubmit: (content: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function CommentForm({
    onSubmit,
    placeholder = 'Yorumunuzu yazın...',
    disabled = false
}: CommentFormProps) {
    const [content, setContent] = useState('');
    const maxLength = 500;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim() && content.length <= maxLength) {
            onSubmit(content.trim());
            setContent('');
        }
    };

    const remainingChars = maxLength - content.length;
    const isNearLimit = remainingChars < 50;

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-header">
                <h3>💬 Yorum Yap</h3>
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                rows={4}
                className="comment-textarea"
                disabled={disabled}
            />

            <div className="form-footer">
                <span className={`char-counter ${isNearLimit ? 'warning' : ''}`}>
                    {remainingChars} karakter kaldı
                </span>

                <button
                    type="submit"
                    disabled={!content.trim() || content.length > maxLength || disabled}
                    className="submit-button"
                >
                    <span>📤</span>
                    {disabled ? 'Gönderiliyor...' : 'Gönder'}
                </button>
            </div>
        </form>
    );
}
