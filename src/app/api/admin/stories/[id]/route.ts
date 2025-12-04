import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // 1. Verify Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        if (!decodedToken.admin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. SOFT DELETE İŞLEMİ
        const docRef = adminDb.collection('stories').doc(id);

        // Sadece durumu güncelleyerek yayından kaldır (veri yerinde kalır!)
        await docRef.update({
            status: 'DELETED', // 'DELETED' durumunu Soft Delete için kullanıyoruz
            deletedAt: FieldValue.serverTimestamp(),
            deletedBy: decodedToken.uid // Kimin sildiğini not al.
        });

        // 3. Başarı Durumu
        return NextResponse.json({ success: true, message: `Hikaye (${id}) yayından kaldırıldı (Soft Delete).` });

    } catch (error) {
        console.error('Error deleting story:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
