import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, role }: { children: JSX.Element; role?: 'creator' | 'client' }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.type !== role) return <Navigate to="/" replace />;
  return children;
}
