import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
    try {
        // 1. Verify Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        if (!decodedToken.admin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Get Query Params
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        // const offset = searchParams.get('offset'); // Firestore doesn't support simple offset, use cursors if needed. For admin, simple limit is okay for now or just fetch latest.

        // 3. Fetch Stories
        const snapshot = await adminDb.collection('stories')
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();

        const stories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate().toISOString(),
        }));

        return NextResponse.json({ stories });

    } catch (error) {
        console.error('Error fetching admin stories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
