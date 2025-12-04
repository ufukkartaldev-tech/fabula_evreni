import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useAdmin() {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function checkAdminStatus() {
            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                // Force token refresh to get the latest claims
                const idTokenResult = await user.getIdTokenResult(true);
                setIsAdmin(!!idTokenResult.claims.admin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        }

        checkAdminStatus();
    }, [user]);

    return { isAdmin, loading };
}
