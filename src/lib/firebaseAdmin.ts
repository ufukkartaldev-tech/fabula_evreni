import 'server-only';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            // Vercel / Custom Environment (Parse JSON string)
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log('Firebase Admin initialized with service account from env');
        } else {
            // Google Cloud / Local with GOOGLE_APPLICATION_CREDENTIALS file path
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
            console.log('Firebase Admin initialized with application default credentials');
        }
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error);
    }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
