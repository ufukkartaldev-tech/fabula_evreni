'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Story } from '@/interfaces/Story';
import LikeButton from './LikeButton';
import FavoriteButton from './FavoriteButton';
import ReportButton from './ReportButton';
import AddToCollectionButton from './AddToCollectionButton';
import { formatReadingTimeWithEmoji } from '@/lib/readingTime';

interface StoryCardProps {
    story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
    const router = useRouter();
    const readingTime = formatReadingTimeWithEmoji(story.content);

    const formatDate = (date: any) => {
        if (!date) return '';

        // Handle Firestore Timestamp
        if (date?.toDate && typeof date.toDate === 'function') {
            return date.toDate().toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Handle string or number (timestamp)
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        return d.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // LikeButton tıklamalarını ignore et
        if ((e.target as HTMLElement).closest('.like-button') || (e.target as HTMLElement).closest('button')) {
            return;
        }
        router.push(`/story/${story.id}`);
    };

    return (
        <div className="story-card" onClick={handleCardClick}>
            <div className="story-card-header">
                <span className="category-badge">{story.category}</span>
                <div className="header-actions">
                    <span className="reading-time-badge">{readingTime}</span>
                    <FavoriteButton storyId={story.id} size="small" />
                    <AddToCollectionButton storyId={story.id} />
                    <ReportButton
                        targetId={story.id}
                        targetType="story"
                        targetContent={story.title}
                        className="opacity-50 hover:opacity-100"
                    />
                    <span className="story-date">{formatDate(story.createdAt)}</span>
                </div>
            </div>

            <h3 className="story-title">{story.title}</h3>
            <p className="story-excerpt">{story.excerpt}</p>

            <div className="story-footer">
                <div className="author-info">
                    <span className="author-avatar">
                        {story.author.avatar.startsWith('http') ? (
                            <img src={story.author.avatar} alt={story.author.name} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                            story.author.avatar
                        )}
                    </span>
                    <span className="author-name">{story.author.name}</span>
                </div>

                <div className="story-stats">
                    <span className="stat">
                        <span className="stat-icon">👁️</span>
                        {formatNumber(story.stats.views)}
                    </span>
                    <span className="stat">
                        <span className="stat-icon">💬</span>
                        {formatNumber(story.stats.comments)}
                    </span>
                    <LikeButton
                        targetId={story.id}
                        targetType="story"
                        initialLikeCount={story.stats.likes}
                        size="small"
                        storyAuthorId={story.authorId}
                        storyTitle={story.title}
                    />
                </div>
            </div>
        </div>
    );
}
