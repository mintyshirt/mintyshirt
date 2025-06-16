import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from '../contexts/LanguageContext';

export default function ChooseRolePage() {
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();

  function select(r: 'fan' | 'creator') {
    setRole(r);
    if (r === 'creator') {
      navigate('/become-creator');
    } else {
      navigate('/');
    }
  }

  return (
    <div className="font-sans">
      <Navbar />
      <div className="p-4 text-white space-y-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold">{t.chooseRole.title}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => select('creator')}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            {t.chooseRole.creatorMode}
          </button>
          <button
            onClick={() => select('fan')}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            {t.chooseRole.fanMode}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
