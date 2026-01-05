
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

        {page === 'about' && (
          <div className="animate-fade-in pt-32">
            {/* About Hero */}
            <section className="py-24 container mx-auto px-6 text-center">
              <div className="reveal">
                <span className="text-xs font-black uppercase tracking-[0.6em] text-hannora-green mb-6 block">Our Story</span>
                <h1 className="text-7xl md:text-8xl font-serif mb-12 text-slate-900">About <span className="italic font-light text-hannora-green">Handora</span></h1>
                <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">Born in the heart of botanical gardens, Handora blends ancient plant wisdom with modern ethical standards to create rituals that nourish both skin and soul.</p>
              </div>
            </section>

            {/* Mission & Philosophy - NEW SECTION */}
            <section className="py-32 bg-white">
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="reveal">
                  <h2 className="text-5xl font-serif mb-8 text-slate-900">The Purity <span className="italic">Manifesto</span></h2>
                  <p className="text-slate-600 mb-6 text-lg">We believe that nature holds the key to true radiance. Our process begins with wild-harvested botanicals, ethically sourced to ensure the longevity of our ecosystems.</p>
                  <p className="text-slate-600 mb-10 text-lg">Every drop of Handora is free from synthetic fragrances, parabens, and sulfates. We are 100% vegan, because beauty should never come at the cost of life.</p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-hannora-green uppercase tracking-widest text-xs mb-2">Cruelty Free</h4>
                      <p className="text-sm text-slate-400">Never tested on animals, certified by global ethical standards.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-hannora-green uppercase tracking-widest text-xs mb-2">Sustainable</h4>
                      <p className="text-sm text-slate-400">Glass and recycled packaging for a zero-waste future.</p>
                    </div>
                  </div>
                </div>
                <div className="relative reveal delay-1">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=1000" className="rounded-[60px] shadow-2xl" alt="Philosophy" />
                </div>
              </div>
            </section>

            {/* Sustainability Commitment - NEW SECTION */}
            <section className="py-32 container mx-auto px-6 text-center">
              <h2 className="text-5xl font-serif mb-16 text-slate-900">Our Commitments</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 bg-hannora-light rounded-[40px] border border-hannora-green/10">
                  <div className="text-4xl mb-6">🌿</div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Ethical Sourcing</h3>
                  <p className="text-slate-500 text-sm">We partner with local farmers to ensure fair trade and organic cultivation methods.</p>
                </div>
                <div className="p-10 bg-hannora-light rounded-[40px] border border-hannora-green/10">
                  <div className="text-4xl mb-6">♻️</div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Plastic-Free</h3>
                  <p className="text-slate-500 text-sm">Our goal is to be 100% plastic-free by 2025. We currently use 85% recycled glass.</p>
                </div>
                <div className="p-10 bg-hannora-light rounded-[40px] border border-hannora-green/10">
                  <div className="text-4xl mb-6">💧</div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Water Conscious</h3>
                  <p className="text-slate-500 text-sm">Low-water manufacturing processes that protect our most precious resource.</p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-40 container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-24 reveal">
                <span className="text-xs font-black uppercase tracking-[0.6em] text-hannora-green mb-6 block">Creative Team</span>
                <h2 className="text-6xl font-serif text-slate-900">Meet the Creators</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-16">
                {TEAM_MEMBERS.map((member, i) => (
                  <div key={member.id} className="reveal text-center group">
                    <div className="relative mx-auto w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full overflow-hidden shadow-xl border-2 border-white group-hover:-translate-y-2 transition-transform duration-500">
                        <img src={member.imageUrl} className="w-full h-full object-cover" alt={member.name} />
                      </div>
                    </div>
                    <h4 className="text-lg font-serif mb-1 text-slate-800">{member.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-hannora-green/60">{member.role}</p>
                  </div>
                ))}
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

        {page === 'quiz' && (
          <section className="pt-48 pb-40 container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-serif mb-4 text-slate-900">Skin Ritual Quiz</h1>
              <p className="text-slate-500">Let our AI curate the perfect botanical ritual for your unique skin profile.</p>
            </div>
            <SkinQuiz availableProducts={products} onRecommendation={(rec, items) => {
              // Custom recommendation handling could go here
              console.log(rec, items);
              alert("AI Recommendation: " + rec);
              setPage('shop');
            }} />
          </section>
        )}

        {page === 'admin' && user?.role === 'admin' && (
          <section className="pt-48 pb-40 container mx-auto px-6">
            <AdminDashboard 
              products={products} 
              orders={[]} 
              onUpdateProducts={(newP) => {
                setProducts(newP);
                localStorage.setItem('hannora_products', JSON.stringify(newP));
              }}
              onUpdateOrders={() => {}} 
            />
          </section>
        )}
      </main>

      <footer className="bg-hannora-green text-white py-24 px-6 mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <h2 className="text-4xl font-bold tracking-[0.5em] mb-8 uppercase">HANDORA</h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md italic">"Connecting modern souls with the pure intelligence of plants."</p>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-hannora-accent">Explore</h4>
            <ul className="space-y-4 text-white/60 text-xs font-bold uppercase tracking-widest">
               <li><button onClick={() => setPage('shop')} className="hover:text-white transition-colors">The Collection</button></li>
               <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors">Our Story</button></li>
               <li><button onClick={() => setPage('quiz')} className="hover:text-white transition-colors">Botanical Quiz</button></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-10 border-t border-white/10 text-center text-[10px] uppercase font-black tracking-[0.5em] text-white/30">&copy; 2024 HANDORA — Crafted with care for the planet</div>
      </footer>
    </div>
  );
};

export default App;
