import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const { name, description, isPublic, idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const collectionData = {
            userId,
            name,
            description: description || '',
            isPublic: isPublic || false,
            storyIds: [],
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        const docRef = await adminDb.collection('collections').add(collectionData);

        return NextResponse.json({ success: true, id: docRef.id });

    } catch (error) {
        console.error('Error creating collection:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const isPublic = searchParams.get('isPublic') === 'true';

        let query = adminDb.collection('collections');

        if (userId) {
            query = query.where('userId', '==', userId) as any;
            // If fetching for another user, only show public ones unless it's the owner (but we can't verify owner easily here without token, so let's assume client handles logic or we add token check)
            if (isPublic) {
                query = query.where('isPublic', '==', true) as any;
            }
        } else {
            // If no userId, maybe fetching public collections?
            query = query.where('isPublic', '==', true).limit(20) as any;
        }

        const snapshot = await query.get();
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate().toISOString(),
        }));

        return NextResponse.json({ collections });

    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
