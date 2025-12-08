'use client';

import { useEffect, useRef } from 'react';

// Publisher ID (environment variable'dan alınır, yoksa fallback kullanılır)
const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-1334433458655438';

interface AdBannerProps {
    /**
     * AdSense data-ad-slot ID
     */
    adSlot: string;

    /**
     * Ad format (auto, rectangle, horizontal, vertical)
     */
    adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';

    /**
     * Full width responsive ad
     */
    fullWidthResponsive?: boolean;

    /**
     * Custom className for styling
     */
    className?: string;

    /**
     * Ad style (display, in-article, in-feed)
     */
    adStyle?: 'display' | 'in-article' | 'in-feed';
}

/**
 * Google AdSense Banner Component
 * Responsive ve özelleştirilebilir reklam banner bileşeni
 */
export default function AdBanner({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = '',
    adStyle = 'display'
}: AdBannerProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // AdSense scriptinin yüklenmesini bekle
            if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <div className={`ad-banner-container ${className}`}>
            <div className="ad-label">Reklam</div>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={PUBLISHER_ID}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
                data-ad-layout={adStyle === 'in-feed' ? 'in-feed' : undefined}
                data-ad-layout-key={adStyle === 'in-article' ? '-fb+5w+4e-db+86' : undefined}
            />
        </div>
    );
}

/**
 * Önceden tanımlanmış banner tipleri
 */

// Ana sayfa üst banner (728x90 veya responsive)
export function TopBanner({ className }: { className?: string }) {
    return (
        <AdBanner
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT || ''}
            adFormat="horizontal"
            className={className}
        />
    );
}

// Sidebar banner (300x250 veya 300x600)
export function SidebarBanner({ className }: { className?: string }) {
    return (
        <AdBanner
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || ''}
            adFormat="rectangle"
            className={className}
        />
    );
}

// İçerik arası banner (responsive)
export function InArticleBanner({ className }: { className?: string }) {
    return (
        <AdBanner
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || ''}
            adStyle="in-article"
            className={className}
        />
    );
}

// Feed içi banner (hikaye listesi arası)
export function InFeedBanner({ className }: { className?: string }) {
    return (
        <AdBanner
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT || ''}
            adStyle="in-feed"
            className={className}
        />
    );
}
