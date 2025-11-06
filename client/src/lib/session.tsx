import { createContext, useContext, useEffect, useState } from 'react';
import { currentUser as apiCurrentUser, login as apiLogin, logout as apiLogout } from './ctfdClient';

type Session = {
  user: any | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<Session | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const me = await apiCurrentUser();
      setUser(me);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const login = async (username: string, password: string) => {
    const ok = await apiLogin(username, password);
    if (ok) await refresh();
    return ok;
  };

  const logout = async () => {
    await apiLogout();
    await refresh();
  };

  return (
    <SessionContext.Provider value={{ user, loading, refresh, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}


