import { addStory } from './firestore';
import { mockStories } from '@/interfaces/mockData';

// Mock verileri Firestore'a yüklemek için yardımcı fonksiyon
export async function seedFirestore() {
    try {
        console.log('Seeding Firestore with mock data...');

        for (const story of mockStories) {
            const { id, createdAt, ...storyData } = story;
            await addStory(storyData);
            console.log(`Added story: ${story.title}`);
        }

        console.log('Firestore seeding completed!');
    } catch (error) {
        console.error('Error seeding Firestore:', error);
    }
}

// Bu fonksiyonu bir kere çalıştırarak mock verileri Firestore'a yükleyebilirsiniz
// Örnek kullanım: Tarayıcı konsolunda seedFirestore() çağırın
if (typeof window !== 'undefined') {
    (window as any).seedFirestore = seedFirestore;
}
