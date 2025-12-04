import { MetadataRoute } from 'next';
import { getStories } from '@/lib/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fabula.app';

    try {
        // Get all stories for sitemap
        const stories = await getStories();

        // Static pages
        const staticPages: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/create`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/leaderboard`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/favorites`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            },
        ];

        // Story pages
        const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
            url: `${baseUrl}/story/${story.id}`,
            lastModified: story.createdAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));

        return [...staticPages, ...storyPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return at least static pages if stories fail
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ];
    }
}
