'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Report, ReportStatus } from '@/interfaces/Report';
import Link from 'next/link';

export default function AdminReportsPage() {
    const { user } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchReports();
    }, [user]);

    const fetchReports = async () => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/admin/reports', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.reports) {
                setReports(data.reports);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: ReportStatus) => {
        if (!user) return;

        setUpdatingId(id);
        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/admin/reports/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setReports(reports.map(r => r.id === id ? { ...r, status } : r));
            } else {
                alert('Güncelleme başarısız oldu.');
            }
        } catch (error) {
            console.error('Error updating report:', error);
            alert('Bir hata oluştu.');
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusBadge = (status: ReportStatus) => {
        switch (status) {
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Bekliyor</span>;
            case 'resolved':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Çözüldü</span>;
            case 'dismissed':
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Reddedildi</span>;
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Yükleniyor...</div>;
    }

    return (
        <div className="admin-reports-page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Rapor Yönetimi</h1>
                <button
                    onClick={fetchReports}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    🔄 Yenile
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Durum</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Sebep</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Hedef</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Raporlayan</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Tarih</th>
                                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4">
                                        {getStatusBadge(report.status)}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium">{report.reason}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs" title={report.description}>
                                            {report.description}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm">
                                            <span className="font-bold uppercase text-xs text-gray-400 mr-2">{report.targetType}</span>
                                            {report.targetType === 'story' && (
                                                <Link href={`/story/${report.targetId}`} target="_blank" className="text-indigo-600 hover:underline">
                                                    Görüntüle
                                                </Link>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 italic truncate max-w-xs">
                                            "{report.targetContent}"
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        {report.reporterName}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(report.createdAt as any).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {report.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(report.id, 'resolved')}
                                                        disabled={updatingId === report.id}
                                                        className="text-green-600 hover:bg-green-50 px-2 py-1 rounded text-sm disabled:opacity-50"
                                                    >
                                                        ✅ Çöz
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(report.id, 'dismissed')}
                                                        disabled={updatingId === report.id}
                                                        className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded text-sm disabled:opacity-50"
                                                    >
                                                        ❌ Reddet
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reports.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Harika! Bekleyen rapor yok. 🎉
                    </div>
                )}
            </div>
        </div>
    );
}
