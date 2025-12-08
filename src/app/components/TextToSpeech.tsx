'use client';

import { useState, useEffect, useRef } from 'react';

interface TextToSpeechProps {
    text: string;
    title?: string;
    className?: string;
}

/**
 * Text-to-Speech (Sesli Okuma) Bileşeni
 * Web Speech API kullanarak hikayeleri sesli okur
 */
export default function TextToSpeech({ text, title, className = '' }: TextToSpeechProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<number>(0);
    const [rate, setRate] = useState(1.0); // Okuma hızı
    const [pitch, setPitch] = useState(1.0); // Ses tonu
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        // Tarayıcı desteğini kontrol et
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true);

            // Sesleri yükle
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                // Türkçe sesleri önceliklendir
                const turkishVoices = availableVoices.filter(voice => voice.lang.startsWith('tr'));
                const otherVoices = availableVoices.filter(voice => !voice.lang.startsWith('tr'));
                setVoices([...turkishVoices, ...otherVoices]);
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            // Cleanup
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handlePlay = () => {
        if (!isSupported) return;

        if (isPaused) {
            // Devam ettir
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
        } else {
            // Yeni okuma başlat
            window.speechSynthesis.cancel(); // Önceki okumaları durdur

            const utterance = new SpeechSynthesisUtterance(text);

            // Ses ayarları
            if (voices[selectedVoice]) {
                utterance.voice = voices[selectedVoice];
            }
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = 1.0;

            // Event listeners
            utterance.onstart = () => {
                setIsPlaying(true);
                setIsPaused(false);
            };

            utterance.onend = () => {
                setIsPlaying(false);
                setIsPaused(false);
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                setIsPlaying(false);
                setIsPaused(false);
            };

            utteranceRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handlePause = () => {
        if (!isSupported) return;
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
    };

    const handleStop = () => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    };

    if (!isSupported) {
        return null; // Tarayıcı desteklemiyorsa gösterme
    }

    return (
        <div className={`text-to-speech ${className}`}>
            <div className="tts-controls">
                <div className="tts-buttons">
                    {!isPlaying && !isPaused && (
                        <button
                            onClick={handlePlay}
                            className="tts-button tts-play"
                            title="Sesli Oku"
                        >
                            <span className="tts-icon">🔊</span>
                            <span className="tts-label">Sesli Oku</span>
                        </button>
                    )}

                    {isPlaying && (
                        <button
                            onClick={handlePause}
                            className="tts-button tts-pause"
                            title="Duraklat"
                        >
                            <span className="tts-icon">⏸️</span>
                            <span className="tts-label">Duraklat</span>
                        </button>
                    )}

                    {isPaused && (
                        <button
                            onClick={handlePlay}
                            className="tts-button tts-resume"
                            title="Devam Et"
                        >
                            <span className="tts-icon">▶️</span>
                            <span className="tts-label">Devam Et</span>
                        </button>
                    )}

                    {(isPlaying || isPaused) && (
                        <button
                            onClick={handleStop}
                            className="tts-button tts-stop"
                            title="Durdur"
                        >
                            <span className="tts-icon">⏹️</span>
                            <span className="tts-label">Durdur</span>
                        </button>
                    )}
                </div>

                {/* Gelişmiş Ayarlar (Opsiyonel) */}
                {(isPlaying || isPaused) && (
                    <div className="tts-settings">
                        <div className="tts-setting">
                            <label>
                                <span className="tts-setting-icon">⚡</span>
                                Hız: {rate.toFixed(1)}x
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                                className="tts-slider"
                            />
                        </div>

                        {voices.length > 0 && (
                            <div className="tts-setting">
                                <label>
                                    <span className="tts-setting-icon">🎤</span>
                                    Ses
                                </label>
                                <select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                                    className="tts-select"
                                >
                                    {voices.map((voice, index) => (
                                        <option key={index} value={index}>
                                            {voice.name} ({voice.lang})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
