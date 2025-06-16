import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslations } from '../contexts/LanguageContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/choose-role');
    } catch (err: any) {
      setMessage(err.message || 'Erreur');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">{t.login.title}</h1>
      <form onSubmit={submit} className="space-y-2 max-w-sm">
        <input
          className="border p-2 w-full text-black"
          placeholder={t.login.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black"
          type="password"
          placeholder={t.login.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-4 py-2" type="submit">
          {t.login.submit}
        </button>
      </form>
      <p className="mt-2 text-white">
        {t.login.noAccount} {' '}
        <a href="/register" className="text-purple-300 hover:underline">
          {t.login.createAccount}
        </a>
      </p>
      {message && <p className="mt-2 text-white">{message}</p>}
    </div>
  );
}
