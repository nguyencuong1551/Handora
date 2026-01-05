
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import SkinQuiz from './components/SkinQuiz';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import { Product, CartItem, Order, TeamMember } from './types';
import { INITIAL_PRODUCTS, TEAM_MEMBERS } from './constants';

const App: React.FC = () => {
  const [page, setPage] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const savedProducts = localStorage.getItem('hannora_products');
    const savedUser = localStorage.getItem('hannora_user');
    
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(INITIAL_PRODUCTS);

    if (savedUser) setUser(JSON.parse(savedUser));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, subscription: 'none' }];
    });
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-hannora-light">
      <Navbar 
        onNavigate={setPage} 
        cartCount={cart.length} 
        onAuth={() => setShowAuth(true)} 
        user={user} 
        onLogout={() => { setUser(null); localStorage.removeItem('hannora_user'); setPage('home'); }}
        isScrolled={scrolled}
        currentPage={page}
      />

      {showAuth && <Auth onLogin={(u) => { setUser(u); setShowAuth(false); }} onClose={() => setShowAuth(false)} />}

      <main>
        {page === 'home' && (
          <div className="animate-fade-in">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-90" alt="Botanical Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-hannora-light" />
              </div>
              <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="reveal">
                  <span className="inline-block px-8 py-3 rounded-full border border-hannora-green/30 text-[10px] font-black uppercase tracking-[0.5em] text-hannora-green mb-10 bg-white/50 backdrop-blur-md">Botanical Engineering</span>
                  <h1 className="text-7xl md:text-9xl font-serif text-slate-900 leading-tight mb-12">Vegan <span className="italic font-light text-hannora-green">Essence</span>,<br/>Modern Rituals.</h1>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button onClick={() => setPage('shop')} className="btn-shimmer px-12 py-5 rounded-full text-white font-bold text-xs uppercase tracking-[0.3em] shadow-xl">Explore Now</button>
                    <button onClick={() => setPage('quiz')} className="glass px-12 py-5 rounded-full text-slate-800 font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all">Find Your Ritual</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'shipping' && (
          <div className="animate-fade-in pt-48 pb-32">
            <section className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-24">
                <span className="text-xs font-black uppercase tracking-[0.6em] text-hannora-green mb-6 block">Care & Delivery</span>
                <h1 className="text-6xl md:text-7xl font-serif text-slate-900 mb-8">Shipping <span className="italic">& Returns</span></h1>
                <p className="text-lg text-slate-500 italic">Crafted with care, delivered with respect for the planet.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                <div className="reveal">
                  <h3 className="text-2xl font-serif text-slate-800 mb-8">The Delivery Ritual</h3>
                  <div className="space-y-8">
                    <div className="border-l-2 border-hannora-light pl-6">
                      <h4 className="font-bold text-slate-700 uppercase text-[11px] tracking-widest mb-2">Standard Delivery</h4>
                      <p className="text-slate-500 text-sm">Hanoi & HCMC: 1-2 Business Days<br/>Provinces: 3-5 Business Days</p>
                    </div>
                    <div className="border-l-2 border-hannora-green/20 pl-6">
                      <h4 className="font-bold text-hannora-green uppercase text-[11px] tracking-widest mb-2">Complimentary Shipping</h4>
                      <p className="text-slate-500 text-sm italic">Free standard delivery on all orders above $50.00.</p>
                    </div>
                  </div>
                </div>

                <div className="reveal delay-1">
                  <h3 className="text-2xl font-serif text-slate-800 mb-8">Handora Returns</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">If our botanical extracts do not meet your expectations, we offer a refined 30-day return experience.</p>
                  <ul className="space-y-4 text-sm text-slate-500">
                    <li className="flex gap-3"><span>•</span> Return within 30 days of receipt.</li>
                    <li className="flex gap-3"><span>•</span> Items must be unused and in original glass packaging.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'shop' && (
          <section className="pt-48 pb-40 container mx-auto px-6 reveal">
            <div className="text-center mb-24">
               <h1 className="text-8xl font-serif mb-8 text-slate-900">Collection</h1>
               <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {['All', 'Skincare', 'Hand Wash', 'Refill'].map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`transition-all pb-1 ${selectedCategory === cat ? 'text-hannora-green border-b-2 border-hannora-green' : 'hover:text-hannora-green'}`}>{cat}</button>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => {}} onAddToCart={() => addToCart(p)} />
              ))}
            </div>
          </section>
        )}

        {page === 'about' && (
          <section className="pt-48 pb-40 container mx-auto px-6 text-center">
             <h1 className="text-8xl font-serif mb-8 text-slate-900">About Us</h1>
             <p className="text-xl text-slate-500 max-w-3xl mx-auto italic">Connecting modern souls with the pure intelligence of plants.</p>
          </section>
        )}

        {page === 'quiz' && (
          <section className="pt-48 pb-40 container mx-auto px-6 text-center">
             <SkinQuiz availableProducts={products} onRecommendation={(rec) => alert(rec)} />
          </section>
        )}
      </main>

      {/* Footer đã được sửa đổi: Bỏ phần Join the Ritual */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-slate-300">Customer Care</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Direct</p>
                  <p className="text-lg font-serif text-slate-700">+84 1800 5588</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Email</p>
                  <p className="text-lg font-serif text-slate-700">care@handora.com</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
               <span className="text-[120px] font-serif text-slate-50 select-none pointer-events-none opacity-50">Handora</span>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <button onClick={() => setPage('shipping')} className="hover:text-hannora-green transition-colors">Privacy</button>
              <button onClick={() => setPage('shipping')} className="hover:text-hannora-green transition-colors">Terms</button>
              <span className="text-slate-200">© 2024 HANDORA Botanical Systems</span>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-hannora-green transition-colors">Instagram</a>
              <a href="#" className="hover:text-hannora-green transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
