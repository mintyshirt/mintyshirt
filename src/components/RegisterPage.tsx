import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../lib/api';
import { useTranslations } from '../contexts/LanguageContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const t = useTranslations();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.message || 'Erreur');
        return;
      }

      try {
        await login(username, password);
        navigate('/choose-role');
      } catch (err: any) {
        setMessage(err.message || 'Erreur');
      }
    } catch (err: any) {
      if (err instanceof TypeError) {
        setMessage('Erreur réseau. Veuillez réessayer plus tard.');
      } else {
        setMessage(err.message || 'Erreur');
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">{t.register.title}</h1>
      <form onSubmit={submit} className="space-y-2 max-w-sm">
        <input
          className="border p-2 w-full text-black bg-white"
          placeholder={t.register.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black bg-white"
          placeholder={t.register.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black bg-white"
          type="password"
          placeholder={t.register.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-4 py-2" type="submit">{t.register.submit}</button>
      </form>
      {message && <p className="mt-2 text-white">{message}</p>}
    </div>
  );
}
