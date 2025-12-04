'use client';

/**
 * Skeleton Loader Component
 * Loading state'leri için profesyonel görünüm
 */

interface SkeletonLoaderProps {
    type?: 'text' | 'title' | 'card' | 'avatar' | 'image';
    width?: string;
    height?: string;
    count?: number;
    className?: string;
}

export default function SkeletonLoader({
    type = 'text',
    width,
    height,
    count = 1,
    className = ''
}: SkeletonLoaderProps) {
    const getSkeletonClass = () => {
        switch (type) {
            case 'title':
                return 'skeleton skeleton-title';
            case 'card':
                return 'skeleton skeleton-card';
            case 'avatar':
                return 'skeleton skeleton-avatar';
            case 'image':
                return 'skeleton skeleton-image';
            default:
                return 'skeleton skeleton-text';
        }
    };

    const style: React.CSSProperties = {
        width: width || undefined,
        height: height || undefined,
    };

    if (count > 1) {
        return (
            <div className={`skeleton-group ${className}`}>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className={getSkeletonClass()} style={style} />
                ))}
            </div>
        );
    }

    return <div className={`${getSkeletonClass()} ${className}`} style={style} />;
}

/**
 * Story Card Skeleton
 */
export function StoryCardSkeleton() {
    return (
        <div className="story-card skeleton-card-wrapper">
            <SkeletonLoader type="image" height="200px" />
            <div className="story-card-content">
                <SkeletonLoader type="title" width="80%" />
                <SkeletonLoader type="text" count={3} />
                <div className="story-card-footer">
                    <SkeletonLoader type="avatar" width="32px" height="32px" />
                    <SkeletonLoader type="text" width="100px" />
                </div>
            </div>
        </div>
    );
}

/**
 * Story Grid Skeleton
 */
export function StoryGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="stories-grid">
            {Array.from({ length: count }).map((_, index) => (
                <StoryCardSkeleton key={index} />
            ))}
        </div>
    );
}

/**
 * Comment Skeleton
 */
export function CommentSkeleton() {
    return (
        <div className="comment-skeleton">
            <SkeletonLoader type="avatar" width="40px" height="40px" />
            <div className="comment-skeleton-content">
                <SkeletonLoader type="text" width="120px" />
                <SkeletonLoader type="text" count={2} />
            </div>
        </div>
    );
}
