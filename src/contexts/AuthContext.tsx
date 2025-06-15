import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../lib/api';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: UserInfo | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    const storedRole = localStorage.getItem('authRole');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    localStorage.setItem('authUser', JSON.stringify(data));
    if (data.role) {
      localStorage.setItem('authRole', data.role);
      setRole(data.role);
    } else {
      setRole(null);
      localStorage.removeItem('authRole');
    }
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('authRole');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
