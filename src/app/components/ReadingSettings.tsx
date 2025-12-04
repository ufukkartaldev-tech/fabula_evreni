'use client';

import { useState, useEffect, useRef } from 'react';

export type ReadingFont = 'sans' | 'serif' | 'mono';
export type ReadingTheme = 'light' | 'dark' | 'sepia';
export type ReadingSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ReadingSettingsState {
    font: ReadingFont;
    size: ReadingSize;
    theme: ReadingTheme;
}

interface ReadingSettingsProps {
    onSettingsChange: (settings: ReadingSettingsState) => void;
    initialSettings?: ReadingSettingsState;
}

export default function ReadingSettings({ onSettingsChange, initialSettings }: ReadingSettingsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<ReadingSettingsState>(initialSettings || {
        font: 'sans',
        size: 'medium',
        theme: 'light'
    });
    const menuRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const updateSettings = (newSettings: Partial<ReadingSettingsState>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        onSettingsChange(updated);

        // Save to localStorage
        localStorage.setItem('fabula-reading-settings', JSON.stringify(updated));
    };

    return (
        <div className="reading-settings-container" ref={menuRef} style={{ position: 'relative', zIndex: 50 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="reading-settings-toggle"
                title="Okuma Ayarları"
                style={{
                    background: '#e0e5ec',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isOpen
                        ? 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'
                        : '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
                    color: '#4a5568'
                }}
            >
                Aa
            </button>

            {isOpen && (
                <div className="reading-settings-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '16px',
                    background: '#e0e5ec',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
                    width: '300px',
                    color: '#4a5568',
                    zIndex: 100
                }}>
                    {/* Font Family */}
                    <div className="setting-group" style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>Yazı Tipi</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => updateSettings({ font: 'sans' })}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    background: '#e0e5ec',
                                    boxShadow: settings.font === 'sans'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    cursor: 'pointer',
                                    fontFamily: 'sans-serif',
                                    color: '#4a5568',
                                    fontWeight: settings.font === 'sans' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Sans
                            </button>
                            <button
                                onClick={() => updateSettings({ font: 'serif' })}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    background: '#e0e5ec',
                                    boxShadow: settings.font === 'serif'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    cursor: 'pointer',
                                    fontFamily: 'serif',
                                    color: '#4a5568',
                                    fontWeight: settings.font === 'serif' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Serif
                            </button>
                            <button
                                onClick={() => updateSettings({ font: 'mono' })}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    background: '#e0e5ec',
                                    boxShadow: settings.font === 'mono'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    cursor: 'pointer',
                                    fontFamily: 'monospace',
                                    color: '#4a5568',
                                    fontWeight: settings.font === 'mono' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Mono
                            </button>
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="setting-group" style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>Boyut</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                                onClick={() => updateSettings({ size: 'small' })}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: settings.size === 'small' ? 'bold' : 'normal' }}
                            >A</button>
                            <div style={{ flex: 1, height: '4px', background: '#e5e7eb', borderRadius: '2px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: settings.size === 'small' ? '0%' : settings.size === 'medium' ? '33%' : settings.size === 'large' ? '66%' : '100%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#3b82f6'
                                }} />
                            </div>
                            <button
                                onClick={() => updateSettings({ size: 'xlarge' })}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', fontWeight: settings.size === 'xlarge' ? 'bold' : 'normal' }}
                            >A</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 8px' }}>
                            {['small', 'medium', 'large', 'xlarge'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => updateSettings({ size: s as ReadingSize })}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        border: 'none',
                                        borderRadius: '50%',
                                        background: '#e0e5ec',
                                        boxShadow: settings.size === s
                                            ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                            : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: s === 'small' ? '12px' : s === 'medium' ? '14px' : s === 'large' ? '16px' : '18px',
                                        fontWeight: 'bold',
                                        color: settings.size === s ? '#3b82f6' : '#4a5568',
                                        transition: 'all 0.2s ease'
                                    }}
                                    aria-label={`Select ${s} size`}
                                >
                                    A
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="setting-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600 }}>Tema</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => updateSettings({ theme: 'light' })}
                                style={{
                                    flex: 1,
                                    height: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: '#e0e5ec',
                                    boxShadow: settings.theme === 'light'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    color: '#000',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: settings.theme === 'light' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Açık
                            </button>
                            <button
                                onClick={() => updateSettings({ theme: 'sepia' })}
                                style={{
                                    flex: 1,
                                    height: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: '#e0e5ec',
                                    boxShadow: settings.theme === 'sepia'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    color: '#5b4636',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: settings.theme === 'sepia' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Sepya
                            </button>
                            <button
                                onClick={() => updateSettings({ theme: 'dark' })}
                                style={{
                                    flex: 1,
                                    height: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: '#e0e5ec',
                                    boxShadow: settings.theme === 'dark'
                                        ? 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff'
                                        : '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                                    color: '#1f2937',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: settings.theme === 'dark' ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Koyu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
