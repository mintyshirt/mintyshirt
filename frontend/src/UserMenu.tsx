import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    role: 'client' | 'creator' | 'admin';
    creatorId?: string;
  } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Ouvrir le menu utilisateur</span>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </button>
      </div>

      {/* Menu déroulant - à implémenter avec un état pour l'affichage/masquage */}
      <div
        className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
        >
          Votre profil
        </a>
        {user.role === 'creator' && (
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-1"
          >
            Dashboard créateur
          </a>
        )}
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
          onClick={handleLogout}
        >
          Se déconnecter
        </a>
      </div>
    </div>
  );
};

export default UserMenu;
