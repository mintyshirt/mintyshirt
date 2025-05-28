import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'creator' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Si l'authentification est en cours de vérification, afficher un loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si un rôle spécifique est requis, vérifier que l'utilisateur a ce rôle
  if (requiredRole && user?.role !== requiredRole) {
    // Rediriger vers la page appropriée en fonction du rôle de l'utilisateur
    if (user?.role === 'creator') {
      return <Navigate to="/creator/dashboard" replace />;
    } else if (user?.role === 'client') {
      return <Navigate to="/marketplace" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Si tout est OK, afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedRoute;
