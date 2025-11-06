import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { useSession } from '@/lib/session';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
      return;
    }
  }, [user, loading, requireAdmin, setLocation]);

  if (loading) return null;
  if (!user) {
    return null;
  }

  return <>{children}</>;
}