import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { nodeId, choiceId } = await request.json();

        if (!nodeId || !choiceId) {
            return NextResponse.json({ error: 'Missing nodeId or choiceId' }, { status: 400 });
        }

        const storyRef = adminDb.collection('stories').doc(id);

        // We need to use a transaction to ensure atomic updates
        await adminDb.runTransaction(async (transaction) => {
            const storyDoc = await transaction.get(storyRef);

            if (!storyDoc.exists) {
                throw new Error('Story not found');
            }

            const storyData = storyDoc.data();
            const nodes = storyData?.nodes || {};
            const node = nodes[nodeId];

            if (!node) {
                throw new Error('Node not found');
            }

            const choices = node.choices || [];
            const choiceIndex = choices.findIndex((c: any) => c.id === choiceId);

            if (choiceIndex === -1) {
                throw new Error('Choice not found');
            }

            // Increment votes
            const currentVotes = choices[choiceIndex].votes || 0;
            choices[choiceIndex].votes = currentVotes + 1;

            // Update the node in the nodes map
            nodes[nodeId].choices = choices;

            transaction.update(storyRef, { nodes });
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error voting for choice:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
