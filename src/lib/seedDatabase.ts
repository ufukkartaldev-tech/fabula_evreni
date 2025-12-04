import { addDoc, collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import { demoUsers, demoStories, demoComments } from './expandedSeedData';

/**
 * Firestore'a demo verileri yükler
 * Bu script sadece bir kere çalıştırılmalıdır
 */
export async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Check if data already exists
        const storiesSnapshot = await getDocs(collection(db, 'stories'));
        if (storiesSnapshot.size > 0) {
            console.log('⚠️  Database already contains data. Skipping seed.');
            console.log(`Found ${storiesSnapshot.size} existing stories.`);
            return {
                success: false,
                message: 'Database already seeded',
                existingStories: storiesSnapshot.size
            };
        }

        const batch = writeBatch(db);
        let usersAdded = 0;
        let storiesAdded = 0;
        let commentsAdded = 0;

        // 1. Add users
        console.log('👥 Adding demo users...');
        for (const user of demoUsers) {
            const userRef = doc(db, 'users', user.uid);
            batch.set(userRef, {
                ...user,
                createdAt: user.createdAt
            });
            usersAdded++;
        }

        // Commit users first
        await batch.commit();
        console.log(`✅ Added ${usersAdded} users`);

        // 2. Add stories (with new batch)
        console.log('📚 Adding demo stories...');
        const storyBatch = writeBatch(db);
        const storyIds: string[] = [];

        for (let i = 0; i < demoStories.length; i++) {
            const story = demoStories[i];
            const storyRef = doc(collection(db, 'stories'));
            storyIds.push(storyRef.id);

            storyBatch.set(storyRef, {
                ...story,
                createdAt: story.createdAt
            });
            storiesAdded++;
        }

        await storyBatch.commit();
        console.log(`✅ Added ${storiesAdded} stories`);

        // 3. Add comments (with new batch)
        console.log('💬 Adding demo comments...');
        const commentBatch = writeBatch(db);

        for (const comment of demoComments) {
            // Map story_XXX to actual Firestore IDs
            const storyIndex = parseInt(comment.storyId.replace('story_', '')) - 1;
            const actualStoryId = storyIds[storyIndex] || storyIds[0];

            const commentRef = doc(collection(db, 'comments'));
            commentBatch.set(commentRef, {
                ...comment,
                storyId: actualStoryId,
                createdAt: new Date()
            });
            commentsAdded++;
        }

        await commentBatch.commit();
        console.log(`✅ Added ${commentsAdded} comments`);

        console.log('🎉 Database seeding completed successfully!');
        console.log(`Summary: ${usersAdded} users, ${storiesAdded} stories, ${commentsAdded} comments`);

        return {
            success: true,
            users: usersAdded,
            stories: storiesAdded,
            comments: commentsAdded
        };

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

/**
 * Tüm demo verileri siler (dikkatli kullanın!)
 */
export async function clearDemoData() {
    try {
        console.log('🗑️  Clearing demo data...');

        const batch = writeBatch(db);

        // Delete all stories
        const storiesSnapshot = await getDocs(collection(db, 'stories'));
        storiesSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Delete all comments
        const commentsSnapshot = await getDocs(collection(db, 'comments'));
        commentsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Delete all users (except authenticated ones)
        const usersSnapshot = await getDocs(collection(db, 'users'));
        usersSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('✅ Demo data cleared');

        return { success: true };
    } catch (error) {
        console.error('❌ Error clearing demo data:', error);
        throw error;
    }
}

// Make functions available in browser console for manual execution
if (typeof window !== 'undefined') {
    (window as any).seedDatabase = seedDatabase;
    (window as any).clearDemoData = clearDemoData;
}
