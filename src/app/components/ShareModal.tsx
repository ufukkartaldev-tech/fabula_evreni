'use client';

import { useState, useEffect } from 'react';
import {
    createStoryShareData,
    isWebShareSupported,
    shareViaWebShare,
    getTwitterShareUrl,
    getFacebookShareUrl,
    getWhatsAppShareUrl,
    getLinkedInShareUrl,
    copyToClipboard
} from '@/lib/shareService';

interface ShareModalProps {
    storyId: string;
    storyTitle: string;
    onClose: () => void;
}

export default function ShareModal({ storyId, storyTitle, onClose }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [webShareAvailable, setWebShareAvailable] = useState(false);

    useEffect(() => {
        setWebShareAvailable(isWebShareSupported());
    }, []);

    const shareData = createStoryShareData(storyTitle, storyId);

    const handleWebShare = async () => {
        const success = await shareViaWebShare(shareData);
        if (success) {
            onClose();
        }
    };

    const handleCopyLink = async () => {
        const success = await copyToClipboard(shareData.url);
        if (success) {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    const handleSocialShare = (url: string) => {
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="share-modal">
                <div className="modal-header">
                    <h3>Hikayeyi Paylaş</h3>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-content">
                    <p className="share-title">{storyTitle}</p>

                    {webShareAvailable && (
                        <button className="web-share-button" onClick={handleWebShare}>
                            <span className="button-icon">📱</span>
                            Paylaş
                        </button>
                    )}

                    <div className="social-buttons">
                        <button
                            className="social-button twitter"
                            onClick={() => handleSocialShare(getTwitterShareUrl(shareData.text, shareData.url))}
                            title="Twitter'da paylaş"
                        >
                            <span className="social-icon">𝕏</span>
                            <span className="social-name">Twitter</span>
                        </button>

                        <button
                            className="social-button facebook"
                            onClick={() => handleSocialShare(getFacebookShareUrl(shareData.url))}
                            title="Facebook'ta paylaş"
                        >
                            <span className="social-icon">f</span>
                            <span className="social-name">Facebook</span>
                        </button>

                        <button
                            className="social-button whatsapp"
                            onClick={() => handleSocialShare(getWhatsAppShareUrl(shareData.text, shareData.url))}
                            title="WhatsApp'ta paylaş"
                        >
                            <span className="social-icon">📱</span>
                            <span className="social-name">WhatsApp</span>
                        </button>

                        <button
                            className="social-button linkedin"
                            onClick={() => handleSocialShare(getLinkedInShareUrl(shareData.url))}
                            title="LinkedIn'de paylaş"
                        >
                            <span className="social-icon">in</span>
                            <span className="social-name">LinkedIn</span>
                        </button>
                    </div>

                    <div className="copy-link-section">
                        <input
                            type="text"
                            value={shareData.url}
                            readOnly
                            className="link-input"
                        />
                        <button
                            className={`copy-button ${copied ? 'copied' : ''}`}
                            onClick={handleCopyLink}
                        >
                            {copied ? '✓ Kopyalandı' : '📋 Kopyala'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
