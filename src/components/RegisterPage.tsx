import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [type, setType] = useState<'creator' | 'client'>('client');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    login({ type, email });
    setMessage('Compte créé');
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-2">Inscription</h1>
      <form onSubmit={submit} className="space-y-2 max-w-sm">
        <select value={type} onChange={e => setType(e.target.value as any)} className="border p-2 w-full text-black">
          <option value="client">Client</option>
          <option value="creator">Créateur</option>
        </select>
        <input className="border p-2 w-full text-black" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border p-2 w-full text-black" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full text-black" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="border p-2 w-full text-black" type="password" placeholder="Confirmez le mot de passe" value={confirm} onChange={e => setConfirm(e.target.value)} />
        {type === 'creator' && (
          <div className="space-y-2">
            <input className="border p-2 w-full text-black" placeholder="Pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} />
            <textarea className="border p-2 w-full text-black" placeholder="Description courte" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="file" className="border p-2 w-full text-black" />
          </div>
        )}
        <button className="bg-purple-600 text-white px-4 py-2" type="submit">S'inscrire</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
