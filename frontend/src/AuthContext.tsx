import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWeb3 } from './Web3Context';
import authService from '../services/authService';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithWallet: () => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  logout: () => void;
  switchRole?: (role: 'client' | 'creator' | 'admin') => void;
}

interface UserType {
  id: string;
  email?: string;
  name?: string;
  walletAddress?: string;
  creatorId?: number;
  role?: 'client' | 'creator' | 'admin';
}

interface UserData {
  email: string;
  password: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { account, connectWallet } = useWeb3();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.loginWithEmail(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        
        setUser({
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          walletAddress: response.user.walletAddress,
          creatorId: response.user.creatorId,
          role: response.user.role || 'client'
        });
        
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Connecter le wallet si ce n'est pas déjà fait
      if (!account) {
        await connectWallet();
        if (!account) {
          throw new Error('Impossible de se connecter au wallet');
        }
      }
      
      // Obtenir le message à signer
      const messageResponse = await authService.getWalletLoginMessage(account);
      const message = messageResponse.message;
      
      // Demander la signature
      if (!window.ethereum) {
        throw new Error('MetaMask n\'est pas disponible');
      }
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      });
      
      // Envoyer la signature au backend
      const response = await authService.loginWithWallet(account, signature, message);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        
        setUser({
          id: response.user.id,
          name: response.user.name,
          walletAddress: account,
          creatorId: response.user.creatorId,
          role: response.user.role || 'client'
        });
        
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion avec le wallet');
      console.error('Erreur de connexion wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: UserData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        // Rediriger vers la page de connexion ou connecter automatiquement
        await login(userData.email, userData.password);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Fonction pour changer de rôle (pour les tests)
  const switchRole = (role: 'client' | 'creator' | 'admin') => {
    if (user) {
      setUser({
        ...user,
        role
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        loginWithWallet,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
