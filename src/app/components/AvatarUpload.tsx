import { useState, useRef } from 'react';


interface AvatarUploadProps {
    userId: string;
    currentAvatar?: string;
    onUploadComplete: (url: string) => void;
    onError?: (error: string) => void;
}

export default function AvatarUpload({ userId, currentAvatar, onUploadComplete, onError }: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState<string | null>(currentAvatar || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            onError?.('Lütfen bir resim dosyası seçin');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            onError?.('Dosya boyutu 5MB\'dan küçük olmalıdır');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setUploading(true);
        setProgress(0);

        try {
            const { uploadAvatar } = await import('@/lib/storageService');
            const result = await uploadAvatar(userId, file, (prog) => {
                setProgress(prog);
            });

            if (result.success && result.url) {
                onUploadComplete(result.url);
            } else {
                onError?.(result.error || 'Yükleme başarısız');
                setPreview(currentAvatar || null);
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError?.('Beklenmeyen bir hata oluştu');
            setPreview(currentAvatar || null);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="avatar-upload">
            <div className="avatar-preview">
                {preview ? (
                    <img src={preview} alt="Avatar" className="avatar-image" />
                ) : (
                    <div className="avatar-placeholder">
                        <span>📷</span>
                    </div>
                )}
                {uploading && (
                    <div className="upload-overlay">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="progress-text">{Math.round(progress)}%</span>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            <button
                className="upload-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
            >
                {uploading ? 'Yükleniyor...' : 'Avatar Değiştir'}
            </button>
        </div>
    );
}
