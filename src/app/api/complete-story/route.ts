import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { getUserBadge } from '@/interfaces/Badge';

export async function POST(request: Request) {
    try {
        const { storyId, history, idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // Get the story
        const storyDoc = await adminDb.collection('stories').doc(storyId).get();
        if (!storyDoc.exists) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }

        const storyData = storyDoc.data();
        if (!storyData || storyData.type !== 'interactive' || !storyData.nodes) {
            return NextResponse.json({ error: 'Invalid story type' }, { status: 400 });
        }

        // Validate history and calculate result
        // This is a simplified validation. In a real app, you'd verify the path connectivity.
        const lastNodeId = history[history.length - 1];
        const lastNode = storyData.nodes[lastNodeId];

        if (!lastNode || !lastNode.isEnding) {
            return NextResponse.json({ error: 'Story not finished' }, { status: 400 });
        }

        // Calculate XP (Example: 10 XP per step + 50 bonus for finishing)
        const xpEarned = (history.length * 10) + 50;

        // Update user profile with transaction to ensure badge consistency
        const userRef = adminDb.collection('users').doc(userId);

        await adminDb.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);

            if (!userDoc.exists) {
                const initialXP = xpEarned;
                const initialBadge = getUserBadge(initialXP);

                transaction.set(userRef, {
                    xp: initialXP,
                    completedStories: [storyId],
                    lastPlayedAt: FieldValue.serverTimestamp(),
                    totalWins: 0,
                    currentBadge: initialBadge.name
                }, { merge: true });
                return;
            }

            const userData = userDoc.data();
            const currentXP = userData?.xp || 0;
            const newXP = currentXP + xpEarned;
            const newBadge = getUserBadge(newXP);

            transaction.update(userRef, {
                xp: newXP,
                currentBadge: newBadge.name,
                completedStories: FieldValue.arrayUnion(storyId),
                lastPlayedAt: FieldValue.serverTimestamp()
            });
        });

        return NextResponse.json({
            success: true,
            xpEarned,
            message: 'Story completed successfully!'
        });

    } catch (error) {
        console.error('Error completing story:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
