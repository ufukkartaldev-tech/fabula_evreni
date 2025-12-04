import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const { targetId, targetType, targetContent, reason, description, idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const reporterId = decodedToken.uid;
        const reporterName = decodedToken.name || decodedToken.email || 'Anonymous';

        const reportData = {
            reporterId,
            reporterName,
            targetId,
            targetType,
            targetContent: targetContent ? targetContent.substring(0, 200) : '', // Limit preview length
            reason,
            description: description || '',
            status: 'pending',
            createdAt: FieldValue.serverTimestamp()
        };

        await adminDb.collection('reports').add(reportData);

        return NextResponse.json({ success: true, message: 'Report submitted successfully' });

    } catch (error) {
        console.error('Error submitting report:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
