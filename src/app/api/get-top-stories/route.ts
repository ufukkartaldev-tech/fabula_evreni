import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

// Cache duration in milliseconds (e.g., 1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET() {
    try {
        const cacheRef = adminDb.collection('cache').doc('top_stories');
        const cacheDoc = await cacheRef.get();
        const now = Date.now();

        let cachedData = cacheDoc.exists ? cacheDoc.data() : null;

        // Check if cache is valid
        if (cachedData && cachedData.updatedAt) {
            const lastUpdate = cachedData.updatedAt.toMillis();
            if (now - lastUpdate < CACHE_DURATION) {
                return NextResponse.json({
                    success: true,
                    stories: cachedData.stories,
                    source: 'cache'
                });
            }
        }

        // Cache is expired or missing, regenerate it
        console.log('Regenerating top stories cache...');

        const storiesSnapshot = await adminDb.collection('stories')
            .orderBy('stats.views', 'desc')
            .limit(15) // Fetch more to account for potential deleted ones
            .get();

        const stories = storiesSnapshot.docs
            .map(doc => {
                const data = doc.data();
                // Convert timestamps to ISO strings for JSON serialization
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString(),
                    updatedAt: data.updatedAt?.toDate().toISOString(),
                    // Ensure stats exist
                    stats: {
                        views: data.stats?.views || 0,
                        likes: data.stats?.likes || 0,
                        comments: data.stats?.comments || 0
                    }
                };
            })
            .filter((story: any) => story.status !== 'DELETED')
            .slice(0, 10); // Take top 10 after filtering

        // Save to cache
        await cacheRef.set({
            stories,
            updatedAt: FieldValue.serverTimestamp()
        });

        return NextResponse.json({
            success: true,
            stories,
            source: 'database'
        });

    } catch (error) {
        console.error('Error fetching top stories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
