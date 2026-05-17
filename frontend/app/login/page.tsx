"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Token Saved in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        router.push('/');
        router.refresh();
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <span className="text-3xl">🔒</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Account Login</h1>
          <p className="text-slate-400 text-xs mt-1">Authorized users only for administrative actions.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-800">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-2.5 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-2.5 outline-none transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors text-xs tracking-wide uppercase disabled:bg-blue-400"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-slate-600">
            ← Back to Board
          </Link>
        </div>
      </div>
    </main>
  );
}