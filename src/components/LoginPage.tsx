import { useState } from 'react';
import { API_BASE } from '../lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      setMessage('Connexion réussie');
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.message || 'Erreur');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">Connexion</h1>
      <form onSubmit={submit} className="space-y-2 max-w-sm">
        <input
          className="border p-2 w-full text-black"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-4 py-2" type="submit">
          Se connecter
        </button>
      </form>
      <p className="mt-2 text-white">
        Pas encore de compte ?{' '}
        <a href="/register" className="text-purple-300 hover:underline">
          Créer un compte
        </a>
      </p>
      {message && <p className="mt-2 text-white">{message}</p>}
    </div>
  );
}
