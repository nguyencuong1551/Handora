
import React, { useState, useRef } from 'react';
import { User } from '../types';

interface AuthProps {
  users: User[];
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ users, onLogin, onRegister, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '', 
    avatar: '' 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Logic Đăng nhập
      const existingUser = users.find(u => u.email === formData.email);
      if (existingUser) {
        onLogin(existingUser);
      } else if (formData.email.includes('admin')) {
        // Fallback cho admin mới lần đầu
        const adminUser: User = {
          id: 'admin-1',
          name: 'System Admin',
          email: formData.email,
          role: 'admin',
          createdAt: new Date().toISOString(),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
        };
        onLogin(adminUser);
      } else {
        alert("Account not found. Please register first.");
      }
    } else {
      // Logic Đăng ký
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=4a7c59&color=fff`,
        role: formData.email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      onRegister(newUser);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 w-screen h-screen">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-[50px] shadow-2xl p-8 md:p-12 animate-reveal mx-auto overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all hover:rotate-90 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-hannora-green/10 text-hannora-green rounded-[30px] flex items-center justify-center text-4xl mx-auto mb-6">🌿</div>
          <h2 className="text-4xl font-serif text-slate-800 mb-3">{isLogin ? 'Welcome Back' : 'Join Handora'}</h2>
          <p className="text-slate-400 text-sm italic font-medium">
            {isLogin ? 'Enter your ritual access details.' : 'Create your botanical soul profile.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="flex flex-col items-center mb-8">
              <div 
                className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-hannora-green transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.avatar ? (
                  <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <div className="text-center">
                    <span className="text-2xl">📷</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <span className="text-[9px] font-bold text-white uppercase tracking-widest">Change</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">Personal Portrait</p>
            </div>
          )}

          {!isLogin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
                  placeholder="Huyen Minh"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Phone Number</label>
                <input 
                  type="tel" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
                  placeholder="090 123 4567"
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
              placeholder="care@handora.com"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Secure Password</label>
            <input 
              type="password" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-hannora-green/10 focus:bg-white transition-all text-slate-700"
              placeholder="••••••••"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full btn-shimmer text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:shadow-2xl transition-all mt-6">
            {isLogin ? 'Authenticate Access' : 'Initialize Profile'}
          </button>
        </form>

        <div className="mt-10 text-center pt-8 border-t border-slate-50">
          <p className="text-slate-400 text-[11px] font-medium">
            {isLogin ? "New to the Handora ecosystem?" : "Already part of the ritual?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-hannora-green font-black uppercase tracking-[0.1em] hover:underline"
            >
              {isLogin ? 'Register Profile' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
