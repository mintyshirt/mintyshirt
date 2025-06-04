import axios from 'axios';

// Types pour les paramètres des fonctions
interface UserData {
  email?: string;
  password?: string;
  name?: string;
  [key: string]: any;
}

// Création d'une instance axios avec une configuration de base
const api = axios.create({
  // Avec Vite, les variables d'environnement doivent commencer par VITE_
  // afin d'être exposées au code client via import.meta.env
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Gestion des erreurs 401 (non autorisé)
    if (error.response && error.response.status === 401) {
      // Si le token est expiré, on peut essayer de le rafraîchir
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          // Tentative de rafraîchissement du token
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
            { refreshToken }
          );
          
          // Si le rafraîchissement réussit, on met à jour les tokens
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            if (response.data.refreshToken) {
              localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            
            // On réessaie la requête originale avec le nouveau token
            if (error.config && error.config.headers) {
              error.config.headers.Authorization = `Bearer ${response.data.token}`;
              return axios(error.config);
            }
          }
        } catch (refreshError) {
          // Si le rafraîchissement échoue, on déconnecte l'utilisateur
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        // Pas de refreshToken, on déconnecte l'utilisateur
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Service d'authentification
const authService = {
  // Enregistrement d'un nouvel utilisateur
  register: async (userData: UserData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  // Connexion avec email et mot de passe
  loginWithEmail: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  // Obtenir un message pour la connexion avec wallet
  getWalletLoginMessage: async (address: string) => {
    const response = await api.get(`/auth/wallet-message?address=${address}`);
    return response.data;
  },
  
  // Connexion avec wallet et signature
  loginWithWallet: async (address: string, signature: string, message: string) => {
    const response = await api.post('/auth/wallet-login', {
      address,
      signature,
      message
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    
    return response.data;
  },
  
  // Demander un code de vérification par email
  requestVerificationCode: async (email: string) => {
    const response = await api.post('/auth/request-verification', { email });
    return response.data;
  },
  
  // Vérifier l'email avec un code
  verifyEmail: async (email: string, code: string) => {
    const response = await api.post('/auth/verify-email', { email, code });
    return response.data;
  },
  
  // Initier le processus KYC
  initiateKyc: async (redirectUrl: string) => {
    const response = await api.post('/auth/initiate-kyc', { redirectUrl });
    return response.data;
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
  
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
