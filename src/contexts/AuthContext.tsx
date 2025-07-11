import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../lib/api';

type Role = 'fan' | 'creator';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('API unavailable');
      }

      const data = await res.json().catch(() => {
        throw new Error('API unavailable');
      });

      if (!data.id) {
        throw new Error('API unavailable');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      const userData: UserInfo = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role || 'fan',
      };
      localStorage.setItem('authUser', JSON.stringify(userData));
      setUser(userData);
    } catch (err: any) {
      if (err instanceof TypeError) {
        throw new Error('Network error. Please try again later.');
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const setRole = (newRole: Role) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('authUser', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
