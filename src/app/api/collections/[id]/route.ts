import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const doc = await adminDb.collection('collections').doc(id).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        const data = doc.data();

        // Fetch stories details if requested? For now just return IDs.
        // Or better, fetch story details here to avoid N+1 on client.
        // Let's fetch story details.

        let stories: any[] = [];
        if (data?.storyIds && data.storyIds.length > 0) {
            // Firestore 'in' query supports up to 10. If more, we need to batch or fetch individually.
            // For simplicity, let's fetch individually for now or limit.
            // Actually, let's just return IDs and let client fetch stories or use a separate endpoint.
            // But for a detail page, we want stories.

            const storyPromises = data.storyIds.slice(0, 20).map((sid: string) =>
                adminDb.collection('stories').doc(sid).get()
            );

            const storyDocs = await Promise.all(storyPromises);
            stories = storyDocs.map(d => d.exists ? { id: d.id, ...d.data(), createdAt: d.data()?.createdAt?.toDate().toISOString() } : null).filter(s => s);
        }

        return NextResponse.json({
            collection: {
                id: doc.id,
                ...data,
                createdAt: data?.createdAt?.toDate().toISOString(),
                updatedAt: data?.updatedAt?.toDate().toISOString(),
                stories
            }
        });

    } catch (error) {
        console.error('Error fetching collection:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { action, storyId, name, description, isPublic, idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const docRef = adminDb.collection('collections').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        if (doc.data()?.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (action === 'add_story') {
            await docRef.update({
                storyIds: FieldValue.arrayUnion(storyId),
                updatedAt: FieldValue.serverTimestamp()
            });
        } else if (action === 'remove_story') {
            await docRef.update({
                storyIds: FieldValue.arrayRemove(storyId),
                updatedAt: FieldValue.serverTimestamp()
            });
        } else if (action === 'update_details') {
            await docRef.update({
                name,
                description,
                isPublic,
                updatedAt: FieldValue.serverTimestamp()
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating collection:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const docRef = adminDb.collection('collections').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        if (doc.data()?.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await docRef.delete();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting collection:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
