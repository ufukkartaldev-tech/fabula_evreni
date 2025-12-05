import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { validateContent } from '@/lib/contentModeration';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const { title, content, excerpt, category, coverImage, mode, idToken } = await request.json();

        // 1. Yetkilendirme Kontrolü
        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        const userName = decodedToken.name || userEmail?.split('@')[0] || 'Anonymous';
        const userPicture = decodedToken.picture || '';

        // 2. İçerik Doğrulama (Server-Side Validation)
        const validation = validateContent(title, content);
        if (!validation.valid) {
            return NextResponse.json({
                error: 'Validation failed',
                details: validation.errors
            }, { status: 400 });
        }

        // 3. Veritabanına Kayıt (Admin SDK ile)
        const storyData = {
            title: title.trim(),
            content: content.trim(),
            excerpt: excerpt ? excerpt.trim() : content.substring(0, 150) + '...',
            category: category || 'Genel',
            coverImage: coverImage || null,
            authorId: userId,
            author: {
                name: userName,
                avatar: userPicture
            },
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            stats: {
                views: 0,
                likes: 0,
                comments: 0
            },
            type: mode === 'solo' ? 'linear' : 'interactive',
            mode: mode || 'solo',
            status: 'ACTIVE'
        };

        const docRef = await adminDb.collection('stories').add(storyData);

        // 4. Kullanıcı İstatistiklerini Güncelle (Opsiyonel)
        // await adminDb.collection('users').doc(userId).update({
        //     storyCount: FieldValue.increment(1)
        // });

        return NextResponse.json({
            success: true,
            storyId: docRef.id,
            message: 'Story published successfully'
        });

    } catch (error) {
        console.error('Error creating story:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
