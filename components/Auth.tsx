
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 w-screen h-screen">
      {/* Background Overlay - Full màn hình */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Form Card - Căn giữa với margin auto và position relative */}
      <div className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-12 animate-fade-in mx-auto">
        {/* Nút đóng */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-all hover:rotate-90 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-hannora-green/10 text-hannora-green rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🌿</div>
          <h2 className="text-3xl font-serif text-slate-800 mb-2">{isLogin ? 'Welcome Back' : 'Join the Ritual'}</h2>
          <p className="text-slate-400 text-sm italic">
            {isLogin ? 'Enter your ritual access details.' : 'Start your botanical skincare journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <input 
                type="text" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
                placeholder="Full Name"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <input 
              type="email" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
              placeholder="Email Address"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <input 
              type="password" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
              placeholder="Password"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full btn-shimmer text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] shadow-lg hover:shadow-xl transition-all mt-4">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-50">
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
