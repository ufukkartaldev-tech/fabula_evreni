import { ref, uploadBytesResumable, getDownloadURL, deleteObject, UploadTask } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Firebase Storage Service
 * Handles image uploads, downloads, and deletions
 */

// Maximum file sizes
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_STORY_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

// Allowed image types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Validates image file
 */
function validateImage(file: File, maxSize: number): { valid: boolean; error?: string } {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Geçersiz dosya tipi. Sadece JPEG, PNG, WebP ve GIF dosyaları yüklenebilir.'
        };
    }

    if (file.size > maxSize) {
        const maxSizeMB = maxSize / (1024 * 1024);
        return {
            valid: false,
            error: `Dosya boyutu çok büyük. Maksimum ${maxSizeMB}MB olmalıdır.`
        };
    }

    return { valid: true };
}

/**
 * Generates a unique filename
 */
function generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${randomString}.${extension}`;
}

/**
 * Upload avatar image
 */
export async function uploadAvatar(
    userId: string,
    file: File,
    onProgress?: (progress: number) => void
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        // Validate file
        const validation = validateImage(file, MAX_AVATAR_SIZE);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        // Create storage reference
        const filename = generateUniqueFilename(file.name);
        const storageRef = ref(storage, `avatars/${userId}/${filename}`);

        // Upload file
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress callback
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) {
                        onProgress(progress);
                    }
                },
                (error) => {
                    // Error callback
                    console.error('Avatar upload error:', error);
                    resolve({
                        success: false,
                        error: 'Avatar yüklenirken bir hata oluştu.'
                    });
                },
                async () => {
                    // Success callback
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve({
                            success: true,
                            url: downloadURL
                        });
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        resolve({
                            success: false,
                            error: 'URL alınırken bir hata oluştu.'
                        });
                    }
                }
            );
        });
    } catch (error) {
        console.error('Upload avatar error:', error);
        return {
            success: false,
            error: 'Beklenmeyen bir hata oluştu.'
        };
    }
}

/**
 * Upload story image
 */
export async function uploadStoryImage(
    storyId: string,
    file: File,
    onProgress?: (progress: number) => void
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        // Validate file
        const validation = validateImage(file, MAX_STORY_IMAGE_SIZE);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        // Create storage reference
        const filename = generateUniqueFilename(file.name);
        const storageRef = ref(storage, `stories/${storyId}/${filename}`);

        // Upload file
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress callback
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) {
                        onProgress(progress);
                    }
                },
                (error) => {
                    // Error callback
                    console.error('Story image upload error:', error);
                    resolve({
                        success: false,
                        error: 'Resim yüklenirken bir hata oluştu.'
                    });
                },
                async () => {
                    // Success callback
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve({
                            success: true,
                            url: downloadURL
                        });
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        resolve({
                            success: false,
                            error: 'URL alınırken bir hata oluştu.'
                        });
                    }
                }
            );
        });
    } catch (error) {
        console.error('Upload story image error:', error);
        return {
            success: false,
            error: 'Beklenmeyen bir hata oluştu.'
        };
    }
}

/**
 * Delete image from storage
 */
export async function deleteImage(imagePath: string): Promise<{ success: boolean; error?: string }> {
    try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        return { success: true };
    } catch (error: any) {
        console.error('Delete image error:', error);

        // If file doesn't exist, consider it a success
        if (error.code === 'storage/object-not-found') {
            return { success: true };
        }

        return {
            success: false,
            error: 'Resim silinirken bir hata oluştu.'
        };
    }
}

/**
 * Get download URL for an image
 */
export async function getImageUrl(imagePath: string): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        return { success: true, url };
    } catch (error) {
        console.error('Get image URL error:', error);
        return {
            success: false,
            error: 'Resim URL\'si alınırken bir hata oluştu.'
        };
    }
}

/**
 * Compress image before upload (client-side)
 * Returns a compressed File object
 */
export async function compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context not available'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Canvas to Blob failed'));
                            return;
                        }

                        const compressedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now()
                        });

                        resolve(compressedFile);
                    },
                    file.type,
                    quality
                );
            };

            img.onerror = () => {
                reject(new Error('Image load failed'));
            };
        };

        reader.onerror = () => {
            reject(new Error('File read failed'));
        };
    });
}
