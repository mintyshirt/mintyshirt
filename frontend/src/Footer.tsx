import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-10 px-6 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-400">MintyShirt</h2>
            <p className="text-gray-400 mt-2">La plateforme de design décentralisée</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h5 className="font-semibold mb-3">Explorer</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/explore" className="hover:text-blue-400">Tous les designs</Link></li>
                <li><Link to="/creators" className="hover:text-blue-400">Créateurs</Link></li>
                <li><Link to="/tokenswap" className="hover:text-blue-400">TokenSwap</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Ressources</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/docs" className="hover:text-blue-400">Documentation</Link></li>
                <li><Link to="/tutorials" className="hover:text-blue-400">Tutoriels</Link></li>
                <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Communauté</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://discord.gg/mintyshirt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Discord</a></li>
                <li><a href="https://twitter.com/mintyshirt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a></li>
                <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} MintyShirt. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
