
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (user: any) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { 
      email: formData.email, 
      name: formData.name || (formData.email.includes('admin') ? 'Administrator' : 'Customer'), 
      role: formData.email.includes('admin') ? 'admin' : 'user' 
    };
    localStorage.setItem('hannora_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="glass w-full max-w-md p-8 md:p-12 rounded-[40px] shadow-2xl relative animate-slide-up">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-4xl font-serif text-slate-800 mb-2">{isLogin ? 'Welcome Back' : 'Join the Ritual'}</h2>
        <p className="text-slate-500 mb-8">{isLogin ? 'Sign in to HANNORA' : 'Become a part of the botanical community'}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
              <input 
                type="text" required
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-hannora-green transition-all"
                placeholder="Jane Doe"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
            <input 
              type="email" required
              className="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-hannora-green transition-all"
              placeholder="admin@hannora.com"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
            <input 
              type="password" required
              className="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-hannora-green transition-all"
              placeholder="••••••••"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full bg-hannora-green text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg mt-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-hannora-green font-bold hover:underline"
          >
            {isLogin ? 'Join now' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
