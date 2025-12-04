'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SetupAdminPage() {
    const { user } = useAuth();
    const [secret, setSecret] = useState('');
    const [status, setStatus] = useState('');

    const handleMakeAdmin = async () => {
        if (!user) return;

        setStatus('Processing...');
        try {
            const response = await fetch('/api/admin/set-custom-claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    action: 'grant',
                    secret: secret
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setStatus('Success! You are now an admin. Please refresh the page/re-login to update claims.');
            } else {
                setStatus('Error: ' + data.error);
            }
        } catch (error) {
            setStatus('Error: ' + error);
        }
    };

    if (!user) {
        return <div className="p-8">Please login first.</div>;
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Setup</h1>
            <p className="mb-4">Current User: {user.email} ({user.uid})</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Bootstrap Secret</label>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    onClick={handleMakeAdmin}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Make Me Admin
                </button>

                {status && (
                    <div className={`p-4 rounded ${status.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
