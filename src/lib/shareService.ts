export interface ShareData {
    title: string;
    text: string;
    url: string;
}

// Web Share API desteğini kontrol et
export function isWebShareSupported(): boolean {
    return typeof navigator !== 'undefined' && 'share' in navigator;
}

// Web Share API ile paylaş
export async function shareViaWebShare(data: ShareData): Promise<boolean> {
    if (!isWebShareSupported()) {
        return false;
    }

    try {
        await navigator.share(data);
        return true;
    } catch (error) {
        // Kullanıcı paylaşımı iptal etti veya hata oluştu
        console.log('Share cancelled or failed:', error);
        return false;
    }
}

// Twitter paylaşım linki oluştur
export function getTwitterShareUrl(text: string, url: string): string {
    const params = new URLSearchParams({
        text: text,
        url: url
    });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
}

// Facebook paylaşım linki oluştur
export function getFacebookShareUrl(url: string): string {
    const params = new URLSearchParams({
        u: url
    });
    return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

// WhatsApp paylaşım linki oluştur
export function getWhatsAppShareUrl(text: string, url: string): string {
    const message = `${text} ${url}`;
    const params = new URLSearchParams({
        text: message
    });
    return `https://wa.me/?${params.toString()}`;
}

// LinkedIn paylaşım linki oluştur
export function getLinkedInShareUrl(url: string): string {
    const params = new URLSearchParams({
        url: url
    });
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

// Clipboard'a kopyala
export async function copyToClipboard(text: string): Promise<boolean> {
    if (typeof navigator === 'undefined') {
        return false;
    }

    try {
        // Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback: eski yöntem
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        return successful;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
}

// Hikaye için paylaşım verisi oluştur
export function createStoryShareData(storyTitle: string, storyId: string): ShareData {
    const url = `${window.location.origin}/story/${storyId}`;
    return {
        title: storyTitle,
        text: `"${storyTitle}" hikayesini okuyun - Fabula`,
        url: url
    };
}
