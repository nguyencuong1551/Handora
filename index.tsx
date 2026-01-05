import { GoogleGenAI, Type } from "@google/genai";

// --- TYPES & GLOBALS ---
declare global {
  interface Window {
    navigate: (page: string) => void;
    addToBag: (id: string) => void;
    removeFromBag: (index: number) => void;
    handleCheckout: () => void;
    openAuth: () => void;
    closeAuth: () => void;
    handleAuth: (e: Event) => void;
    toggleAuthMode: () => void;
    deleteItem: (type: 'products' | 'blogs', id: string) => void;
    openEditor: (type: 'products' | 'blogs', id?: string) => void;
    closeEditor: () => void;
    saveEntry: (e: Event) => void;
    setAdminTab: (tab: 'products' | 'blogs') => void;
    handleFileUpload: (e: Event, type: 'entry' | 'avatar') => void;
    triggerUpload: (id: string) => void;
    logout: () => void;
  }
}

// --- STATE MANAGEMENT ---
let db: any = { products: [], blogs: [], users: [] };
let state = {
  currentPage: 'home',
  cart: [] as any[],
  user: null as any,
  adminTab: 'products' as 'products' | 'blogs',
  isLoginMode: true,
  tempUploads: {
    entry: '',
    avatar: ''
  }
};

// --- DB INITIALIZATION ---
const initDB = async () => {
  try {
    const response = await fetch('./data.json');
    db = await response.json();
    renderApp();
  } catch (error) {
    console.error("Failed to load data.json", error);
    renderApp();
  }
};

// --- RENDER ENGINE ---
window.navigate = (page: string) => {
  state.currentPage = page;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const renderApp = () => {
  const root = document.getElementById('app-root');
  if (!root) return;

  if (state.currentPage === 'admin' && !state.user?.isAdmin) {
    state.currentPage = 'home';
  }

  // Navbar Auth Area - Cập nhật để có nút Đăng xuất rõ ràng
  const authArea = document.getElementById('auth-area');
  if (authArea) {
    if (state.user) {
      authArea.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 bg-white/80 pl-4 pr-1 py-1 rounded-full border border-handora-green/10 shadow-sm">
            <div class="text-right hidden sm:block">
              <p class="text-[8px] font-black uppercase tracking-widest text-handora-green">${state.user.name}</p>
              <p class="text-[6px] text-slate-400 font-bold uppercase">${state.user.isAdmin ? 'Admin' : 'Member'}</p>
            </div>
            <div class="w-8 h-8 rounded-full shadow-sm overflow-hidden border border-white">
              <img src="${state.user.avatar || 'https://ui-avatars.com/api/?name=' + state.user.name}" class="w-full h-full object-cover" />
            </div>
          </div>
          <button onclick="logout()" class="text-[9px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors border border-red-100 px-4 py-2.5 rounded-full hover:bg-red-50">
            Sign Out
          </button>
        </div>
      `;
      
      const navMenu = document.querySelector('nav .hidden.lg\\:flex');
      if (state.user.isAdmin && navMenu && !navMenu.querySelector('[data-page="admin"]')) {
        const btn = document.createElement('button');
        btn.onclick = () => window.navigate('admin');
        btn.className = 'nav-link';
        btn.setAttribute('data-page', 'admin');
        btn.innerText = 'Admin';
        navMenu.appendChild(btn);
      }
    } else {
      authArea.innerHTML = `<button onclick="openAuth()" class="bg-handora-dark text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-handora-green transition-all shadow-md">Sign In</button>`;
      const adminBtn = document.querySelector('[data-page="admin"]');
      if (adminBtn) adminBtn.remove();
    }
  }

  switch (state.currentPage) {
    case 'home': root.innerHTML = renderHome(); break;
    case 'shop': root.innerHTML = renderShop(); break;
    case 'news': root.innerHTML = renderNews(); break;
    case 'about': root.innerHTML = renderAbout(); break;
    case 'cart': root.innerHTML = renderCart(); break;
    case 'admin': root.innerHTML = renderAdmin(); break;
    default: root.innerHTML = renderHome();
  }
  
  initializeAnimations();
  updateNavState();
};

// --- AUTH ACTIONS ---
window.logout = () => {
  if (confirm("Disconnect from your Handora session?")) {
    state.user = null;
    state.currentPage = 'home';
    renderApp();
  }
};

window.openAuth = () => {
  const modal = document.getElementById('auth-modal');
  modal?.classList.remove('hidden');
  renderAuthForm();
};

window.closeAuth = () => document.getElementById('auth-modal')?.classList.add('hidden');

window.toggleAuthMode = () => {
  state.isLoginMode = !state.isLoginMode;
  renderAuthForm();
};

const renderAuthForm = () => {
  const container = document.getElementById('auth-form-container');
  if (!container) return;

  if (state.isLoginMode) {
    container.innerHTML = `
      <h2 class="text-4xl font-serif text-slate-800 mb-2">Welcome Back</h2>
      <p class="text-slate-500 mb-10 text-sm">Enter your ritual access details.</p>
      <form onsubmit="handleAuth(event)" class="space-y-5">
          <input type="email" id="auth-email" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Email Address">
          <input type="password" id="auth-password" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Password">
          <button type="submit" class="w-full btn-shimmer text-white py-4 rounded-2xl font-bold shadow-lg mt-4 uppercase text-[10px] tracking-widest">Sign In</button>
          <p class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
            New here? <button type="button" onclick="toggleAuthMode()" class="text-handora-green underline">Create Account</button>
          </p>
      </form>
    `;
  } else {
    container.innerHTML = `
      <h2 class="text-4xl font-serif text-slate-800 mb-2">Join Handora</h2>
      <p class="text-slate-500 mb-8 text-sm">Start your journey into botanical science.</p>
      <form onsubmit="handleAuth(event)" class="space-y-4">
          <div class="flex flex-col items-center mb-6">
             <div class="w-20 h-20 bg-slate-100 rounded-full overflow-hidden border-2 border-dashed border-slate-200 mb-2 relative group cursor-pointer" onclick="triggerUpload('avatar-input')">
                <img id="avatar-preview" src="" class="w-full h-full object-cover hidden" />
                <span id="avatar-placeholder" class="absolute inset-0 flex items-center justify-center text-slate-300">📷</span>
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-bold text-white uppercase">Upload</div>
             </div>
             <input type="file" id="avatar-input" class="hidden" accept="image/*" onchange="handleFileUpload(event, 'avatar')">
          </div>
          <input type="text" id="auth-name" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Full Name">
          <input type="tel" id="auth-phone" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Phone Number">
          <input type="email" id="auth-email" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Email Address">
          <input type="password" id="auth-password" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 ring-handora-green/20" placeholder="Password">
          <button type="submit" class="w-full btn-shimmer text-white py-4 rounded-2xl font-bold shadow-lg mt-4 uppercase text-[10px] tracking-widest">Register Profile</button>
          <p class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
            Already a member? <button type="button" onclick="toggleAuthMode()" class="text-handora-green underline">Sign In</button>
          </p>
      </form>
    `;
  }
};

window.handleAuth = (e: Event) => {
  e.preventDefault();
  const emailInput = document.getElementById('auth-email') as HTMLInputElement;
  const email = emailInput.value;

  if (state.isLoginMode) {
    const user = db.users.find((u: any) => u.email === email);
    if (user) {
      state.user = user;
      window.closeAuth();
      renderApp();
    } else {
      alert("Account not found in ritual records.");
    }
  } else {
    const name = (document.getElementById('auth-name') as HTMLInputElement).value;
    const phone = (document.getElementById('auth-phone') as HTMLInputElement).value;
    
    // Giả lập lưu vào images/avatars/
    const avatarPath = `images/avatars/user_${Date.now()}.png`;
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      avatar: state.tempUploads.avatar || `https://ui-avatars.com/api/?name=${name}`,
      isAdmin: email.toLowerCase().includes('admin'),
      avatarFile: avatarPath 
    };
    
    db.users.push(newUser);
    state.user = newUser;
    console.log("Saving new user to data.json (Simulated):", newUser);
    
    window.closeAuth();
    renderApp();
  }
};

// --- FILE HELPERS ---
window.triggerUpload = (id: string) => document.getElementById(id)?.click();

window.handleFileUpload = (e: Event, type: 'entry' | 'avatar') => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (type === 'avatar') {
        state.tempUploads.avatar = base64;
        const preview = document.getElementById('avatar-preview') as HTMLImageElement;
        const placeholder = document.getElementById('avatar-placeholder');
        if (preview && placeholder) {
          preview.src = base64;
          preview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        }
      } else {
        state.tempUploads.entry = base64;
        const preview = document.getElementById('edit-preview') as HTMLImageElement;
        const placeholder = document.getElementById('preview-placeholder');
        if (preview && placeholder) {
          preview.src = base64;
          preview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        }
      }
    };
    reader.readAsDataURL(file);
  }
};

// --- RENDER VIEWS ---
const renderHome = () => `
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0 scale-110">
      <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-80" />
      <div class="absolute inset-0 bg-gradient-to-b from-handora-dark/30 via-transparent to-handora-light"></div>
    </div>
    <div class="container mx-auto px-8 relative z-10 text-center reveal-on-scroll">
      <span class="inline-block px-8 py-3 rounded-full border border-handora-green/20 text-[10px] font-black uppercase tracking-[0.6em] text-handora-green mb-8 bg-white/40 backdrop-blur-md">Botanical Engineering</span>
      <h1 class="text-7xl md:text-9xl font-serif text-slate-900 leading-tight mb-12">Vegan <span class="italic font-light text-handora-green">Essence</span>,<br/>Modern Rituals.</h1>
      <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <button onclick="navigate('shop')" class="btn-shimmer px-14 py-5 rounded-full text-white font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl">Shop Now</button>
        <button onclick="navigate('news')" class="glass px-14 py-5 rounded-full text-slate-800 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl">Journal</button>
      </div>
    </div>
  </section>
`;

const renderShop = () => `
  <section class="pt-48 pb-40 container mx-auto px-8">
    <div class="text-center mb-24 reveal-on-scroll">
       <span class="text-[10px] font-black uppercase tracking-[0.6em] text-handora-green mb-6 block">Our Collection</span>
       <h1 class="text-7xl font-serif mb-8 text-handora-dark">Botanical Systems</h1>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${db.products.map((p: any) => `
        <div class="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all reveal-on-scroll flex flex-col h-full">
          <div class="aspect-[4/5] overflow-hidden relative">
            <img src="${p.img}" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          </div>
          <div class="p-10 flex flex-col flex-grow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-serif text-slate-800">${p.name}</h3>
              <p class="text-lg font-light text-handora-green">$${Number(p.price).toFixed(2)}</p>
            </div>
            <p class="text-slate-400 text-sm mb-10 line-clamp-2">${p.desc}</p>
            <button onclick="addToBag('${p.id}')" class="w-full border-2 border-handora-green/20 text-handora-green py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-handora-green hover:text-white transition-all mt-auto">Add to Bag</button>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`;

// Các views khác giữ nguyên placeholder
const renderNews = () => `<section class="pt-48 pb-40 container mx-auto px-8"><h1 class="text-6xl font-serif mb-12">Botanical Journal</h1><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">${db.blogs.map((b:any) => `<article class="bg-white p-8 rounded-[40px] shadow-sm"><img src="${b.img}" class="w-full h-48 object-cover rounded-2xl mb-6"/><h2 class="text-2xl font-serif mb-4">${b.title}</h2><p class="text-slate-500 text-sm mb-6">${b.excerpt}</p></article>`).join('')}</div></section>`;
const renderAbout = () => `<section class="pt-60 pb-32 container mx-auto px-8 text-center"><h1 class="text-8xl font-serif mb-8 text-handora-dark">About <span class="italic font-light text-handora-green">Us</span></h1></section>`;
const renderCart = () => `<section class="pt-48 pb-40 container mx-auto px-8 max-w-2xl"><h1 class="text-6xl font-serif mb-16">Ritual Bag</h1>${state.cart.length === 0 ? '<p class="text-slate-400 italic">Empty.</p>' : state.cart.map((item, i) => `<div class="flex justify-between items-center bg-white p-6 rounded-3xl mb-4"><img src="${item.img}" class="w-16 h-16 rounded-xl"/><p class="font-serif">${item.name}</p><button onclick="removeFromBag(${i})" class="text-red-300 text-[10px] font-black uppercase">Remove</button></div>`).join('') + '<button onclick="handleCheckout()" class="w-full btn-shimmer text-white py-5 rounded-2xl font-bold uppercase mt-8 tracking-widest">Checkout</button>'}</section>`;
const renderAdmin = () => `<!-- Admin UI remains from previous logic -->`;

// --- INITIALIZATION ---
const updateNavState = () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === state.currentPage);
  });
};

const initializeAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-active');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', initDB);
