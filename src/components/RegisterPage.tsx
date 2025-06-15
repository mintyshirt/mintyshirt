import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (res.ok) {
      setMessage('Inscription réussie');
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.message || 'Erreur');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">Inscription</h1>
      <form onSubmit={submit} className="space-y-2 max-w-sm">
        <input
          className="border p-2 w-full text-black bg-white"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black bg-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black bg-white"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-4 py-2" type="submit">S'inscrire</button>
      </form>
      {message && <p className="mt-2 text-white">{message}</p>}
    </div>
  );
}
