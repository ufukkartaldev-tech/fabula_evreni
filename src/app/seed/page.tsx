'use client';

import { useState } from 'react';
import { resetDatabase } from '@/lib/seedDatabase';

export default function AdminSeedPage() {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!confirm('TÜM HİKAYELER VE YORUMLAR SİLİNECEK! Emin misiniz?')) return;

        setLoading(true);
        setStatus('İşlem başlıyor...');

        try {
            const result = await resetDatabase();
            setStatus(`Başarılı! \nKullanıcılar: ${result.users}\nHikayeler: ${result.stories}\nYorumlar: ${result.comments}`);
        } catch (error: any) {
            console.error(error);
            setStatus('Hata oluştu: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Veritabanı Yönetimi</h1>

                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                        Bu işlem mevcut tüm hikayeleri ve yorumları silecek, ardından 10 adet örnek hikaye ve kullanıcı verisi yükleyecektir.
                    </p>

                    <button
                        onClick={handleReset}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                İşleniyor...
                            </>
                        ) : (
                            'Veritabanını Sıfırla ve Yükle'
                        )}
                    </button>

                    {status && (
                        <div className={`mt-4 p-4 rounded-lg text-sm whitespace-pre-line ${status.startsWith('Hata')
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
