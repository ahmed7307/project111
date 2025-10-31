// Client-side authentication using localStorage
// todo: remove mock functionality

import { mockUsers, type User } from './mockData';

const AUTH_KEY = 'hacking_vidya_auth';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
}

export const login = (username: string, password: string): AuthUser | null => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password && u.status === 'active'
  );

  if (user) {
    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
    return authUser;
  }

  return null;
};

export const register = (username: string, email: string, password: string): AuthUser | null => {
  const existingUser = mockUsers.find((u) => u.username === username || u.email === email);

  if (existingUser) {
    return null;
  }

  const newUser: AuthUser = {
    id: Date.now().toString(),
    username,
    email,
    role: 'user',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = (): AuthUser | null => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};