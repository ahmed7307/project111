import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { useSession } from '@/lib/session';

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const [location, setLocation] = useLocation();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading && user) {
      const target = '/profile';
      if (location !== target) setLocation(target);
    }
  }, [user, loading, location, setLocation]);

  if (loading) return null;
  if (user) return null;
  return <>{children}</>;
}