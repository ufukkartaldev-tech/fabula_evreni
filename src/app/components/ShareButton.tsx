'use client';

import { useState } from 'react';
import ShareModal from './ShareModal';

interface ShareButtonProps {
    storyId: string;
    storyTitle: string;
    size?: 'small' | 'medium' | 'large';
}

export default function ShareButton({ storyId, storyTitle, size = 'medium' }: ShareButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const sizeClasses = {
        small: 'share-button-small',
        medium: 'share-button-medium',
        large: 'share-button-large'
    };

    return (
        <>
            <button
                className={`share-button ${sizeClasses[size]}`}
                onClick={() => setShowModal(true)}
                title="Hikayeyi paylaş"
            >
                <span className="share-icon">📤</span>
                <span className="share-text">Paylaş</span>
            </button>

            {showModal && (
                <ShareModal
                    storyId={storyId}
                    storyTitle={storyTitle}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}
