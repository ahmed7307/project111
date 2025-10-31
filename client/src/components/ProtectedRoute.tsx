import { useLocation } from 'wouter';
import { getCurrentUser } from '@/lib/auth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      setLocation('/login');
      return;
    }

    if (requireAdmin && user.role !== 'admin') {
      setLocation('/dashboard');
      return;
    }

    if (!requireAdmin && user.role === 'admin' && window.location.pathname === '/dashboard') {
      setLocation('/admin/dashboard');
      return;
    }
  }, [user, requireAdmin, setLocation]);

  if (!user) {
    return null;
  }

  if (requireAdmin && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}