
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { DB } from '../db';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = DB.users.getAll();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid identity credentials.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-3xl bg-amber-600/20 mb-6 text-amber-500">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
          <h2 className="text-4xl font-serif font-bold text-amber-500">Welcome Back</h2>
          <p className="text-slate-400 mt-2 uppercase text-[10px] font-black tracking-[0.2em]">The Chair Awaits</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <div className="bg-amber-900/40 text-amber-200 border border-amber-800 p-4 rounded-xl text-xs font-bold uppercase tracking-tight">{error}</div>}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Identity Email</label>
            <input 
              type="email" required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white placeholder-slate-600" 
              placeholder="v.singh@example.in"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Password</label>
            <input 
              type="password" required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-700 transition shadow-xl shadow-amber-900/30">
            Sign In
          </button>
        </form>
        <div className="mt-10 text-center text-xs font-bold text-slate-500">
          First visit? <Link to="/register" className="text-amber-500 hover:text-amber-400 transition ml-2 uppercase tracking-widest">Register Identity</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
