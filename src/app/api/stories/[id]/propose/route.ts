import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { nodeId, text, content, idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;
        const userName = decodedToken.name || decodedToken.email || 'Anonymous';

        const storyRef = adminDb.collection('stories').doc(id);
        const storyDoc = await storyRef.get();

        if (!storyDoc.exists) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }

        const storyData = storyDoc.data();
        const nodes = storyData?.nodes || {};

        if (!nodes[nodeId]) {
            return NextResponse.json({ error: 'Node not found' }, { status: 404 });
        }

        const newProposedChoice = {
            id: uuidv4(),
            text,
            content, // Store content in proposal too
            authorId: userId,
            authorName: userName,
            votes: 1, // Auto-vote for self
            voters: [userId],
            createdAt: new Date().toISOString()
        };

        // Check threshold immediately (Threshold = 1)
        const THRESHOLD = 1;

        if (newProposedChoice.votes >= THRESHOLD) {
            // Accept immediately
            const newNextNodeId = uuidv4();

            const newNode = {
                id: newNextNodeId,
                content: content || "Bu bölüm henüz yazılmadı. Devamını yazmak için düzenleyin!",
                choices: [],
                isEnding: false
            };

            const newChoice = {
                id: newProposedChoice.id,
                text: newProposedChoice.text,
                nextNodeId: newNextNodeId
            };

            // Update Firestore
            await storyRef.update({
                [`nodes.${nodeId}.choices`]: FieldValue.arrayUnion(newChoice),
                [`nodes.${newNextNodeId}`]: newNode
            });

            return NextResponse.json({
                success: true,
                message: 'Dal kabul edildi ve eklendi!',
                accepted: true
            });

        } else {
            // Add to proposed choices
            // Note: Firestore doesn't support updating a specific item in an array easily without reading.
            // But we can use arrayUnion if the object is unique.
            // However, we need to update the specific node's proposedChoices.

            // Since we read the doc, we can just update the whole node or use dot notation if we are sure.
            // `nodes.${nodeId}.proposedChoices`

            await storyRef.update({
                [`nodes.${nodeId}.proposedChoices`]: FieldValue.arrayUnion(newProposedChoice)
            });

            return NextResponse.json({
                success: true,
                message: 'Öneri gönderildi. Oylanmayı bekliyor.',
                accepted: false
            });
        }

    } catch (error) {
        console.error('Error proposing branch:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
