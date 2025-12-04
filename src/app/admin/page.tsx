'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Toplam Hikaye</h3>
                        <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                    <span className="text-sm text-green-500 mt-2 inline-block">Yayında</span>
                </div>

                <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Toplam Kullanıcı</h3>
                        <span className="text-2xl">👥</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                    <span className="text-sm text-blue-500 mt-2 inline-block">Aktif</span>
                </div>

                <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Bekleyen Raporlar</h3>
                        <span className="text-2xl">🚩</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                    <span className="text-sm text-red-500 mt-2 inline-block">İncelenmeli</span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Hızlı İşlemler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                        <span className="block text-lg mb-1">📢 Duyuru Yap</span>
                        <span className="text-sm text-gray-500">Tüm kullanıcılara bildirim gönder</span>
                    </button>
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                        <span className="block text-lg mb-1">🔍 İçerik Tara</span>
                        <span className="text-sm text-gray-500">Otomatik moderasyonu çalıştır</span>
                    </button>
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
                        <span className="block text-lg mb-1">⚙️ Bakım Modu</span>
                        <span className="text-sm text-gray-500">Siteyi bakıma al</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
