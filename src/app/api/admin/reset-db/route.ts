import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { demoUsers, demoStories, demoComments } from '@/lib/expandedSeedData';

export async function GET() {
    try {
        const batch = adminDb.batch();
        let operationCount = 0;

        // 1. Delete all existing stories
        const storiesSnapshot = await adminDb.collection('stories').get();
        storiesSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
            operationCount++;
        });

        // 2. Delete all existing comments
        const commentsSnapshot = await adminDb.collection('comments').get();
        commentsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
            operationCount++;
        });

        // Commit deletions first to avoid batch limit issues if many docs
        if (operationCount > 0) {
            await batch.commit();
            console.log(`Deleted ${storiesSnapshot.size} stories and ${commentsSnapshot.size} comments.`);
        }

        // Start a new batch for additions
        const seedBatch = adminDb.batch();

        // 3. Upsert Demo Users
        for (const user of demoUsers) {
            const userRef = adminDb.collection('users').doc(user.uid);
            seedBatch.set(userRef, {
                ...user,
                // Ensure dates are handled correctly
                createdAt: user.createdAt,
                lastUpdated: new Date()
            }, { merge: true });
        }

        // 4. Add Demo Stories
        const storyIds: string[] = [];
        for (const story of demoStories) {
            const storyRef = adminDb.collection('stories').doc();
            storyIds.push(storyRef.id);
            seedBatch.set(storyRef, {
                ...story,
                createdAt: story.createdAt
            });
        }

        // 5. Add Demo Comments
        for (const comment of demoComments) {
            // Map story_XXX to actual Firestore IDs
            // Assuming storyId format is 'story_001', 'story_002', etc.
            const storyIndex = parseInt(comment.storyId.replace('story_', '')) - 1;

            // Safety check
            if (storyIndex >= 0 && storyIndex < storyIds.length) {
                const actualStoryId = storyIds[storyIndex];
                const commentRef = adminDb.collection('comments').doc();

                seedBatch.set(commentRef, {
                    ...comment,
                    storyId: actualStoryId,
                    createdAt: new Date()
                });
            }
        }

        await seedBatch.commit();

        return NextResponse.json({
            success: true,
            message: 'Database reset and seeded successfully',
            details: {
                deletedStories: storiesSnapshot.size,
                deletedComments: commentsSnapshot.size,
                addedUsers: demoUsers.length,
                addedStories: demoStories.length,
                addedComments: demoComments.length
            }
        });

    } catch (error: any) {
        console.error('Error resetting database:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
