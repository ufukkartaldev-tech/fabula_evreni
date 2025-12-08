'use client';

import { useEffect } from 'react';

interface AdSenseScriptProps {
    publisherId: string;
}

/**
 * Google AdSense script loader component
 * Bu bileşen Google AdSense scriptini sayfaya yükler
 */
export default function AdSenseScript({ publisherId }: AdSenseScriptProps) {
    useEffect(() => {
        // Script zaten yüklenmişse tekrar yükleme
        if (document.querySelector(`script[data-ad-client="${publisherId}"]`)) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', publisherId);

        document.head.appendChild(script);

        return () => {
            // Cleanup - script'i kaldır
            const existingScript = document.querySelector(`script[data-ad-client="${publisherId}"]`);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [publisherId]);

    return null;
}
