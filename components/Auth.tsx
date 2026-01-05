
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in overflow-hidden">
      {/* Background mờ */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-all" onClick={onClose} />
      
      {/* Form Card chính giữa màn hình */}
      <div className="relative w-full max-w-md bg-white rounded-[50px] shadow-2xl overflow-hidden p-10 md:p-14 animate-slide-up">
        {/* Nút đóng */}
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-hannora-green/10 text-hannora-green rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🌿</div>
          <h2 className="text-4xl font-serif text-slate-800 mb-2">{isLogin ? 'Welcome Back' : 'Create Ritual'}</h2>
          <p className="text-slate-400 text-sm italic">
            {isLogin ? 'Enter your ritual access details.' : 'Start your botanical skincare journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Full Name</label>
              <input 
                type="text" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
                placeholder="Your Name"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
              placeholder="email@handora.com"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Password</label>
            <input 
              type="password" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
              placeholder="••••••••"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full btn-shimmer text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl mt-6">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-xs">
            {isLogin ? "New to Handora?" : "Already part of the ritual?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-hannora-green font-black uppercase tracking-widest text-[10px] hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
