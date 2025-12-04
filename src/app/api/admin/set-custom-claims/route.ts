import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
    try {
        const { uid, action, secret } = await request.json();

        // Simple security check for bootstrapping
        // In production, this should be a strong secret environment variable
        if (secret !== 'fabula-admin-bootstrap-2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!uid) {
            return NextResponse.json({ error: 'UID is required' }, { status: 400 });
        }

        if (action === 'grant') {
            await adminAuth.setCustomUserClaims(uid, { admin: true });
            return NextResponse.json({ success: true, message: `Admin privileges granted to ${uid}` });
        } else if (action === 'revoke') {
            await adminAuth.setCustomUserClaims(uid, { admin: false });
            return NextResponse.json({ success: true, message: `Admin privileges revoked from ${uid}` });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Error setting custom claims:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
