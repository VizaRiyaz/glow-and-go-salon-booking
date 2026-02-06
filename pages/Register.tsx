
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DB } from '../db';
import { User } from '../types';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = DB.users.getAll();
    if (users.find(u => u.email === formData.email)) {
      setError('Email already exists');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'user'
    };

    DB.users.add(newUser);
    navigate('/login');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-3xl bg-amber-600/20 mb-6 text-amber-500">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
             </svg>
          </div>
          <h2 className="text-4xl font-serif font-bold text-amber-500">Create Identity</h2>
          <p className="text-slate-400 mt-2 uppercase text-[10px] font-black tracking-[0.2em]">Join the Elite Registry</p>
        </div>
        <form className="space-y-4" onSubmit={handleRegister}>
          {error && <div className="bg-amber-900/40 text-amber-200 border border-amber-800 p-4 rounded-xl text-xs font-bold uppercase tracking-tight">{error}</div>}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
            <input 
              type="text" required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
            <input 
              type="tel" required 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confirm</label>
              <input 
                type="password" required 
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-amber-500 transition text-white" 
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-700 transition mt-6 shadow-xl shadow-amber-900/30">
            Sign Up
          </button>
        </form>
        <div className="mt-10 text-center text-xs font-bold text-slate-500">
          Already registered? <Link to="/login" className="text-amber-500 hover:text-amber-400 transition ml-2 uppercase tracking-widest">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
