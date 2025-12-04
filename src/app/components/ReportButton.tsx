'use client';

import { useState } from 'react';
import ReportModal from './ReportModal';
import { ReportTargetType } from '@/interfaces/Report';

interface ReportButtonProps {
    targetId: string;
    targetType: ReportTargetType;
    targetContent?: string;
    className?: string;
}

export default function ReportButton({ targetId, targetType, targetContent, className = '' }: ReportButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`text-gray-400 hover:text-red-500 transition-colors ${className}`}
                title="Raporla"
            >
                🚩
            </button>

            <ReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                targetId={targetId}
                targetType={targetType}
                targetContent={targetContent}
            />
        </>
    );
}
