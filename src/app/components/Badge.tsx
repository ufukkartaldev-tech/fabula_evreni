import { Badge as BadgeType } from '@/interfaces/Badge';

interface BadgeProps {
    badge: BadgeType;
    size?: 'small' | 'medium' | 'large';
    showName?: boolean;
    showTooltip?: boolean;
}

export default function Badge({
    badge,
    size = 'small',
    showName = false,
    showTooltip = true
}: BadgeProps) {
    const sizeClasses = {
        small: 'badge-small',
        medium: 'badge-medium',
        large: 'badge-large'
    };

    return (
        <div
            className={`badge ${sizeClasses[size]}`}
            title={showTooltip ? `${badge.name} - ${badge.description}` : undefined}
        >
            <span className="badge-emoji">{badge.emoji}</span>
            {showName && <span className="badge-name">{badge.name}</span>}
        </div>
    );
}
