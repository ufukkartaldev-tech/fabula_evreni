import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
    try {
        const usersRef = adminDb.collection('users');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            return NextResponse.json({ message: 'No users found' });
        }

        const batch = adminDb.batch();
        let count = 0;

        snapshot.docs.forEach((doc) => {
            // Sadece rolü olmayan veya writer olmayanları güncelle
            const data = doc.data();
            if (data.role !== 'writer') {
                batch.update(doc.ref, { role: 'writer' });
                count++;
            }
        });

        if (count > 0) {
            await batch.commit();
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${count} users to writer role`,
            totalUsers: snapshot.size
        });
    } catch (error: any) {
        console.error('Error updating users:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
