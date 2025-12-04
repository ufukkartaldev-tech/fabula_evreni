'use client';

import { useState, useEffect } from 'react';
import { Story, StoryNode } from '@/interfaces/Story';
import { ReadingSettingsState } from './ReadingSettings';
import { useAuth } from '@/contexts/AuthContext';
import ProposeBranchModal from './ProposeBranchModal';

interface InteractiveStoryPlayerProps {
    story: Story;
    readingSettings: ReadingSettingsState;
    onProgressUpdate?: (path: string[]) => void;
}

export default function InteractiveStoryPlayer({ story, readingSettings, onProgressUpdate }: InteractiveStoryPlayerProps) {
    const { user } = useAuth();
    const [currentNodeId, setCurrentNodeId] = useState<string>(story.startNodeId || 'start');
    const [history, setHistory] = useState<string[]>([]);
    const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
    const [isCompleting, setIsCompleting] = useState(false);
    const [completionResult, setCompletionResult] = useState<{ xpEarned: number; message: string } | null>(null);
    const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);

    useEffect(() => {
        if (story.nodes && story.nodes[currentNodeId]) {
            const node = story.nodes[currentNodeId];
            setCurrentNode(node);

            // Check if ending
            if (node.isEnding && !completionResult && !isCompleting) {
                handleFinishStory([...history, currentNodeId]);
            }
        } else {
            // Fallback if node not found or linear content
            console.warn(`Node ${currentNodeId} not found in story`);
        }
    }, [currentNodeId, story.nodes]);

    const handleFinishStory = async (finalHistory: string[]) => {
        if (!user) return;

        setIsCompleting(true);
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/complete-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storyId: story.id,
                    history: finalHistory,
                    idToken
                }),
            });

            const result = await response.json();
            if (result.success) {
                setCompletionResult({
                    xpEarned: result.xpEarned,
                    message: result.message
                });
            }
        } catch (error) {
            console.error('Error completing story:', error);
        } finally {
            setIsCompleting(false);
        }
    };

    const handleChoice = (nextNodeId: string) => {
        const newHistory = [...history, currentNodeId];
        setHistory(newHistory);
        setCurrentNodeId(nextNodeId);

        if (onProgressUpdate) {
            onProgressUpdate([...newHistory, nextNodeId]);
        }
    };

    if (!currentNode) {
        return <div className="p-4 text-center">Yükleniyor...</div>;
    }

    // Styles based on reading settings
    const containerStyle = {
        fontFamily: readingSettings.font === 'serif' ? 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' :
            readingSettings.font === 'mono' ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' :
                'ui-sans-serif, system-ui, sans-serif',
        fontSize: readingSettings.size === 'small' ? '0.95rem' :
            readingSettings.size === 'large' ? '1.25rem' :
                readingSettings.size === 'xlarge' ? '1.5rem' : '1.1rem',
        lineHeight: readingSettings.size === 'xlarge' ? '2' : '1.8',
        backgroundColor: readingSettings.theme === 'sepia' ? '#f4ecd8' :
            readingSettings.theme === 'dark' ? '#1f2937' : 'transparent',
        color: readingSettings.theme === 'sepia' ? '#433422' :
            readingSettings.theme === 'dark' ? '#e5e7eb' : 'inherit',
        padding: readingSettings.theme !== 'light' ? '3rem' : '0',
        borderRadius: readingSettings.theme !== 'light' ? '4px' : '0',
        transition: 'all 0.3s ease',
        // Skeuomorphic styles for Sepia
        boxShadow: readingSettings.theme === 'sepia'
            ? 'inset 20px 0 50px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)'
            : 'none',
        borderLeft: readingSettings.theme === 'sepia' ? '2px solid rgba(0,0,0,0.05)' : 'none',
        backgroundImage: readingSettings.theme === 'sepia'
            ? 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 5%, rgba(255,255,255,0) 10%)'
            : 'none'
    };

    // Neumorphic button style
    const buttonStyle = {
        background: readingSettings.theme === 'dark' ? '#374151' : '#e0e5ec',
        border: 'none',
        padding: '16px 24px',
        borderRadius: '12px',
        color: readingSettings.theme === 'dark' ? '#e5e7eb' : '#4a5568',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left' as const,
        transition: 'all 0.2s ease',
        boxShadow: readingSettings.theme === 'dark'
            ? '5px 5px 10px #2d3542, -5px -5px 10px #414d5f'
            : '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
        marginBottom: '16px'
    };

    return (
        <div className="interactive-story-container">
            {/* Content Area */}
            <div className="story-content mb-8" style={containerStyle}>
                {currentNode.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1.5em' }}>{paragraph}</p>
                ))}
            </div>

            {/* Choices Area */}
            <div className="choices-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {currentNode.choices && currentNode.choices.length > 0 ? (
                    <div className="choices-list">
                        {currentNode.choices.map((choice) => (
                            <button
                                key={choice.id}
                                onClick={() => handleChoice(choice.nextNodeId)}
                                className="choice-button"
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = readingSettings.theme === 'dark'
                                        ? '6px 6px 12px #2d3542, -6px -6px 12px #414d5f'
                                        : '12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = readingSettings.theme === 'dark'
                                        ? '5px 5px 10px #2d3542, -5px -5px 10px #414d5f'
                                        : '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)';
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = 'translateY(1px)';
                                    e.currentTarget.style.boxShadow = readingSettings.theme === 'dark'
                                        ? 'inset 3px 3px 6px #2d3542, inset -3px -3px 6px #414d5f'
                                        : 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = readingSettings.theme === 'dark'
                                        ? '6px 6px 12px #2d3542, -6px -6px 12px #414d5f'
                                        : '12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255, 0.6)';
                                }}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="end-of-story text-center p-8">
                        <h3 className="text-xl font-bold mb-4">Son</h3>
                        {completionResult ? (
                            <div className="completion-result animate-fade-in">
                                <p className="text-lg mb-2">{completionResult.message}</p>
                                <p className="text-2xl font-bold text-yellow-500">+{completionResult.xpEarned} XP</p>
                            </div>
                        ) : isCompleting ? (
                            <p>Sonuçlar hesaplanıyor...</p>
                        ) : (
                            <p>Bu hikayenin sonuna geldiniz.</p>
                        )}
                    </div>
                )}

                {/* Propose Branch Button */}
                {user && !currentNode.isEnding && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 mb-2 text-sm">
                            {currentNode.choices && currentNode.choices.length > 0
                                ? "Aklında başka bir yol mu var?"
                                : "Hikaye burada bitmesin..."}
                        </p>
                        <button
                            onClick={() => setIsProposeModalOpen(true)}
                            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm font-medium"
                        >
                            {currentNode.choices && currentNode.choices.length > 0
                                ? "✨ Yeni Bir Yol Öner"
                                : "✍️ Hikayeyi Devam Ettir"}
                        </button>
                    </div>
                )}

                <ProposeBranchModal
                    isOpen={isProposeModalOpen}
                    onClose={() => setIsProposeModalOpen(false)}
                    storyId={story.id}
                    nodeId={currentNodeId}
                    isContinuation={!currentNode.choices || currentNode.choices.length === 0}
                    onSuccess={() => {
                        // Refresh logic would be ideal here, but for now maybe just close
                        // Since we are using props, we might need to trigger a refresh in parent
                        // Or we can just rely on realtime updates if we had them
                        // For now, let's just alert user (already done in modal)
                        window.location.reload(); // Simple brute force refresh to see new branch
                    }}
                />
            </div>
        </div>
    );
}
