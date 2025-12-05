import { addDoc, collection, getDocs, writeBatch, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { demoUsers, demoStories, demoComments } from './expandedSeedData';

/**
 * Firestore'a demo verileri yükler
 */
export async function seedDatabase(force = false) {
    try {
        console.log('🌱 Starting database seeding...');

        if (!force) {
            // Check if data already exists
            const storiesSnapshot = await getDocs(collection(db, 'stories'));
            if (storiesSnapshot.size > 0) {
                console.log('⚠️  Database already contains data. Skipping seed.');
                return {
                    success: false,
                    message: 'Database already seeded',
                    existingStories: storiesSnapshot.size
                };
            }
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

        // 2. Add stories
        console.log('📚 Adding demo stories...');
        const storyIds: string[] = [];
        for (const story of demoStories) {
            const storyRef = doc(collection(db, 'stories'));
            storyIds.push(storyRef.id);
            batch.set(storyRef, {
                ...story,
                createdAt: story.createdAt
            });
            storiesAdded++;
        }

        // 3. Add comments
        console.log('💬 Adding demo comments...');
        for (const comment of demoComments) {
            const storyIndex = parseInt(comment.storyId.replace('story_', '')) - 1;
            const actualStoryId = storyIds[storyIndex] || storyIds[0];

            const commentRef = doc(collection(db, 'comments'));
            batch.set(commentRef, {
                ...comment,
                storyId: actualStoryId,
                createdAt: new Date()
            });
            commentsAdded++;
        }

        await batch.commit();
        console.log('🎉 Database seeding completed successfully!');

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
 * Tüm verileri siler
 */
export async function clearDatabase() {
    try {
        console.log('🗑️  Clearing database...');

        // Helper to delete collection
        const deleteCollection = async (collectionName: string) => {
            const snapshot = await getDocs(collection(db, collectionName));
            const batch = writeBatch(db);
            let count = 0;

            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
                count++;
            });

            if (count > 0) {
                await batch.commit();
            }
            console.log(`Deleted ${count} documents from ${collectionName}`);
        };

        await deleteCollection('stories');
        await deleteCollection('comments');
        // Users collection is intentionally NOT deleted to preserve auth mappings
        // But we can update them in seedDatabase

        return { success: true };
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        throw error;
    }
}

/**
 * Veritabanını sıfırlar ve yeniden doldurur
 */
export async function resetDatabase() {
    await clearDatabase();
    return await seedDatabase(true);
}
