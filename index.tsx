
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
    runAI: (skinType: string) => void;
    // New Admin Actions
    saveProduct: (e: Event) => void;
    editProduct: (id: string) => void;
    deleteProduct: (id: string) => void;
    handleImageUpload: (e: Event) => void;
  }
}

// --- DATA ---
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Pomelo Peel Wash', category: 'Hand Rituals', price: 18.00, desc: 'Natural pomelo extracts gently cleanse while maintaining essential moisture.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800', tag: 'Refreshing', ingredients: ['Cold-pressed Pomelo', 'Vitamin E'] },
  { id: '2', name: 'Green Tea Revitalizer', category: 'Hand Rituals', price: 16.00, desc: 'Antioxidant-rich soap that protects sensitive skin with botanical barrier.', img: 'https://images.unsplash.com/photo-1600175107436-1199b44585ec?auto=format&fit=crop&q=80&w=800', tag: 'Detoxifying', ingredients: ['Matcha Leaf', 'Glycerin'] },
  { id: '3', name: 'Aloe Vera Calm', category: 'Hand Rituals', price: 17.50, desc: 'Instant hydration boost with organic, succulent aloe vera juices.', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800', tag: 'Soothing', ingredients: ['Inner Fillet Aloe', 'Cucumber'] },
  { id: '4', name: 'Lavender Hand Balm', category: 'Skin Therapy', price: 22.00, desc: 'Soothe your mind and nourish your hands with calming lavender essence.', img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800', tag: 'Nocturnal', ingredients: ['Organic Lavender', 'Shea Butter'] }
];

const TEAM = [
  { id: 't1', name: 'Minh Huyen', role: 'Founder & Visionary', bio: 'Expert in botanical pharmacology with a passion for sustainable luxury.', img: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80&w=400' },
  { id: 't2', name: 'Marcus Thorne', role: 'Head of Research', bio: 'Leading the development of bio-active extraction methods.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  { id: 't3', name: 'Sophia Chen', role: 'Sustainability Lead', bio: 'Ensuring our zero-waste philosophy is upheld in every ritual.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' }
];


// --- APP STATE ---
let state: any = {
  currentPage: 'home',
  cart: [],
  user: null,
  quizLoading: false,
  selectedCategory: 'All',
  // Load products from localStorage or use INITIAL_PRODUCTS
  products: JSON.parse(localStorage.getItem('handora_products') || JSON.stringify(INITIAL_PRODUCTS)),
  editingId: null, // Tracks if we are editing an existing product
  tempImg: '' // Stores base64 of uploaded image
};

// --- RENDER ENGINE ---
window.navigate = (page: string) => {
  state.currentPage = page;
  updateNavState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateNavState = () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === state.currentPage);
  });
};

const renderApp = () => {
  const root = document.getElementById('app-root');
  if (!root) return;

  switch (state.currentPage) {
    case 'home': root.innerHTML = renderHome(); break;
    case 'shop': root.innerHTML = renderShop(); break;
    case 'about': root.innerHTML = renderAbout(); break;
    case 'quiz': root.innerHTML = renderQuiz(); break;
    case 'cart': root.innerHTML = renderCart(); break;
    case 'admin': 
      if (state.user?.isAdmin) {
        root.innerHTML = renderAdmin();
      } else {
        window.navigate('home');
      }
      break;
    default: root.innerHTML = renderHome();
  }
  
  initializeAnimations();
};

const initializeAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};

// --- VIEWS ---
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
        <button onclick="navigate('quiz')" class="glass px-14 py-5 rounded-full text-slate-800 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl">AI Skin Consult</button>
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
      ${state.products.map((p: any) => `
        <div class="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all reveal-on-scroll flex flex-col h-full">
          <div class="aspect-[4/5] overflow-hidden relative">
            <img src="${p.img}" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          </div>
          <div class="p-10 flex flex-col flex-grow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-serif text-slate-800">${p.name}</h3>
              <p class="text-lg font-light text-handora-green">$${Number(p.price).toFixed(2)}</p>
            </div>
            <p class="text-slate-400 text-sm mb-10">${p.desc}</p>
            <button onclick="addToBag('${p.id}')" class="w-full border-2 border-handora-green/20 text-handora-green py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-handora-green hover:text-white transition-all mt-auto">Add to Bag</button>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`;

const renderAbout = () => `
  <div class="overflow-x-hidden">
    <section class="pt-60 pb-32 container mx-auto px-8 text-center reveal-on-scroll">
      <span class="text-[10px] font-black uppercase tracking-[1em] text-handora-green mb-10 block">Discover Handora</span>
      <h1 class="text-8xl md:text-[10rem] font-serif leading-none text-handora-dark mb-12">
        About <span class="italic font-light text-handora-green">Us</span>
      </h1>
      <p class="text-2xl md:text-4xl font-serif italic text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Blending ancient plant intelligence with modern ethical standards.
      </p>
    </section>

    <section class="relative min-h-[120vh] flex items-center mb-40 overflow-hidden">
      <div class="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=2000" 
              class="w-full h-full object-cover parallax-scroll scale-125" 
              alt="Botanical Laboratory" />
         <div class="absolute inset-0 bg-handora-dark/70 backdrop-blur-[2px]"></div>
      </div>
      
      <div class="container mx-auto px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="glass-refined p-12 md:p-24 rounded-[80px] shadow-[0_50px_120px_rgba(0,0,0,0.5)] reveal-on-scroll">
            <span class="text-[11px] font-black uppercase tracking-[0.8em] text-handora-accent mb-10 block">The Handora Narrative</span>
            <h2 class="text-7xl md:text-8xl font-serif text-white mb-14 leading-none italic">Our <span class="font-light not-italic">Story</span></h2>
            <div class="space-y-10 text-white/90 text-2xl leading-[1.7] font-light">
              <p class="reveal-mask">Handora was born in a hidden seaside sanctuary where the whispering leaves of pomelo trees inspired our founder to capture nature's silent intelligence.</p>
              <p class="reveal-mask delay-300">Through three years of meditative laboratory research, we perfected a cold-extraction ritual that honors the soul of the botanical world while delivering high-performance care for the modern individual.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-40 bg-white">
      <div class="container mx-auto px-8 text-center mb-32 reveal-on-scroll">
        <h2 class="text-8xl font-serif text-handora-dark">Core <span class="italic text-handora-green">Values</span></h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        ${['Bio-Integrity', 'Radical Honesty', 'Circular Design', 'Mindful Luxury'].map((v, i) => `
          <div class="p-12 bg-handora-light/30 rounded-[60px] reveal-on-scroll">
            <div class="text-4xl mb-8">${['🍃', '💎', '♾️', '✨'][i]}</div>
            <h4 class="text-2xl font-bold uppercase tracking-widest text-slate-800 mb-8">${v}</h4>
            <p class="text-slate-400 text-lg leading-relaxed">Elevating every batch with radical commitment to purity.</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Part 4: The Collective -->
    <section class="py-60 container mx-auto px-8">
      <div class="text-center mb-40 reveal-on-scroll">
        <span class="text-[10px] font-black uppercase tracking-[1.5em] text-handora-green mb-10 block">Management</span>
        <h2 class="text-8xl md:text-9xl font-serif text-handora-dark leading-none">The <span class="italic text-handora-green">Collective</span></h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-32 max-w-7xl mx-auto">
        ${TEAM.map((m, i) => `
          <div class="group text-center reveal-on-scroll" style="transition-delay: ${i * 200}ms">
            <div class="relative w-80 h-80 mx-auto mb-20">
               <div class="absolute inset-0 rounded-[40%] border border-handora-green/20 rotate-45 scale-100 group-hover:scale-125 group-hover:rotate-90 transition-all duration-[1.5s] ease-out"></div>
               <div class="absolute inset-0 rounded-[45%] border border-handora-accent/30 -rotate-12 scale-105 group-hover:scale-115 group-hover:rotate-45 transition-all duration-[1.2s] ease-out delay-75"></div>
               <div class="w-full h-full rounded-full overflow-hidden shadow-[0_40px_80px_rgba(74,124,89,0.3)] relative z-10 portrait-clear transition-all duration-700">
                 <img src="${m.img}" class="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000" alt="${m.name}" />
               </div>
            </div>
            <h4 class="text-5xl font-serif text-handora-dark mb-4 group-hover:text-handora-green transition-colors duration-500">${m.name}</h4>
            <p class="text-[12px] font-black uppercase tracking-[0.6em] text-handora-green mb-10 opacity-70">${m.role}</p>
            <div class="h-0.5 w-16 bg-handora-green/20 mx-auto mb-10 transition-all duration-700 group-hover:w-32 group-hover:bg-handora-green"></div>
            <p class="text-slate-500 text-xl italic px-8 leading-relaxed font-light text-balance">${m.bio}</p>
          </div>
        `).join('')}
      </div>
    </section>
  </div>
`;

const renderQuiz = () => `
  <section class="pt-48 pb-40 container mx-auto px-8 text-center max-w-4xl">
    <h1 class="text-6xl font-serif mb-16 text-handora-dark">AI Botanical Consultation</h1>
    <div id="quiz-container" class="bg-white p-20 rounded-[70px] shadow-2xl border border-handora-light">
      <p class="text-2xl font-serif mb-12 italic">How does your skin feel today?</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${['Dry', 'Sensitive', 'Normal', 'Rough'].map(t => `
          <button onclick="runAI('${t}')" class="p-10 border-2 border-slate-50 rounded-3xl hover:border-handora-green hover:bg-handora-light transition-all font-bold text-slate-600">${t}</button>
        `).join('')}
      </div>
    </div>
  </section>
`;

const renderCart = () => `
  <section class="pt-48 pb-40 container mx-auto px-8 max-w-4xl">
    <h1 class="text-6xl font-serif mb-16">Your Ritual Items</h1>
    ${state.cart.length === 0 ? '<p class="text-slate-400 italic text-center text-xl">The ritual bag is currently empty.</p>' : `
      <div class="space-y-6">
        ${state.cart.map((item: any, i: number) => `
          <div class="flex justify-between items-center bg-white p-8 rounded-[40px] shadow-sm">
             <div class="flex items-center gap-6">
                <img src="${item.img}" class="w-20 h-20 rounded-2xl object-cover" />
                <p class="text-xl font-serif">${item.name}</p>
             </div>
             <button onclick="removeFromBag(${i})" class="text-red-300 font-black uppercase text-[9px] tracking-widest">Remove</button>
          </div>
        `).join('')}
        <div class="pt-12 text-right">
           <p class="text-4xl font-serif mb-8 text-handora-dark">Total: $${state.cart.reduce((s: number, i: any) => s + i.price, 0).toFixed(2)}</p>
           <button onclick="handleCheckout()" class="btn-shimmer text-white px-14 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Complete Ritual</button>
        </div>
      </div>
    `}
  </section>
`;

const renderAdmin = () => {
  const editingProduct = state.editingId ? state.products.find((p:any) => p.id === state.editingId) : null;
  return `
  <section class="pt-48 pb-40 container mx-auto px-8">
    <div class="bg-white rounded-[60px] shadow-2xl p-16 border border-slate-100 animate-reveal">
      <div class="flex justify-between items-center mb-16">
        <h1 class="text-5xl font-serif">Admin Dashboard</h1>
        <div class="bg-handora-green/10 text-handora-green px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Control Panel</div>
      </div>
      
      <!-- Product Management Form -->
      <div class="mb-20 bg-slate-50 p-10 rounded-[40px] border border-slate-200">
        <h2 class="text-2xl font-serif mb-8">${state.editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onsubmit="saveProduct(event)" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <input id="p-name" type="text" placeholder="Product Name" required value="${editingProduct?.name || ''}" class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
                <input id="p-price" type="number" step="0.01" placeholder="Price ($)" required value="${editingProduct?.price || ''}" class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
                <select id="p-category" class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none">
                    <option value="Hand Rituals" ${editingProduct?.category === 'Hand Rituals' ? 'selected' : ''}>Hand Rituals</option>
                    <option value="Skin Therapy" ${editingProduct?.category === 'Skin Therapy' ? 'selected' : ''}>Skin Therapy</option>
                </select>
            </div>
            <div class="space-y-4">
                <textarea id="p-desc" placeholder="Brief Description" required class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none h-32 focus:ring-2 ring-handora-green/20">${editingProduct?.desc || ''}</textarea>
                <div class="flex items-center gap-4">
                    <label class="flex-grow bg-white border-2 border-dashed border-slate-200 rounded-2xl px-6 py-4 text-center cursor-pointer hover:bg-slate-100 transition-all">
                        <span class="text-[10px] font-black uppercase text-slate-400">Upload Product Image</span>
                        <input type="file" onchange="handleImageUpload(event)" accept="image/*" class="hidden">
                    </label>
                    ${state.tempImg || editingProduct?.img ? `<img src="${state.tempImg || editingProduct?.img}" class="w-16 h-16 rounded-xl object-cover shadow-md" />` : ''}
                </div>
            </div>
            <div class="md:col-span-2 flex gap-4">
                <button type="submit" class="flex-grow btn-shimmer text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                    ${state.editingId ? 'Update Ritual Item' : 'Create New Ritual Item'}
                </button>
                ${state.editingId ? `<button type="button" onclick="editProduct(null)" class="px-8 bg-slate-200 rounded-2xl text-[10px] font-bold uppercase">Cancel</button>` : ''}
            </div>
        </form>
      </div>

      <h2 class="text-3xl font-serif mb-8">Manage Products</h2>
      <div class="space-y-4">
        ${state.products.map((p: any) => `
          <div class="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-handora-green/20 transition-all">
            <div class="flex items-center gap-6">
              <img src="${p.img}" class="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <p class="font-bold text-slate-800">${p.name}</p>
                <p class="text-[10px] uppercase text-slate-400 tracking-widest">${p.category} | $${Number(p.price).toFixed(2)}</p>
              </div>
            </div>
            <div class="flex gap-4">
              <button onclick="editProduct('${p.id}')" class="text-[10px] font-black uppercase text-handora-green tracking-widest hover:underline">Edit</button>
              <button onclick="deleteProduct('${p.id}')" class="text-[10px] font-black uppercase text-red-300 tracking-widest hover:underline">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;};

// --- ADMIN ACTIONS ---
window.handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            state.tempImg = reader.result;
            renderApp();
        };
        reader.readAsDataURL(file);
    }
};

window.saveProduct = (e: Event) => {
    e.preventDefault();
    const name = (document.getElementById('p-name') as HTMLInputElement).value;
    const price = (document.getElementById('p-price') as HTMLInputElement).value;
    const category = (document.getElementById('p-category') as HTMLSelectElement).value;
    const desc = (document.getElementById('p-desc') as HTMLTextAreaElement).value;
    const img = state.tempImg || (state.editingId ? state.products.find((p:any)=>p.id === state.editingId).img : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800');

    if (state.editingId) {
        // Update
        state.products = state.products.map((p: any) => 
            p.id === state.editingId ? { ...p, name, price: parseFloat(price), category, desc, img } : p
        );
    } else {
        // Create
        const newProduct = {
            id: Date.now().toString(),
            name,
            price: parseFloat(price),
            category,
            desc,
            img,
            ingredients: ['Natural Extracts']
        };
        state.products.unshift(newProduct);
    }

    // Save to localStorage
    localStorage.setItem('handora_products', JSON.stringify(state.products));
    
    // Reset form state
    state.editingId = null;
    state.tempImg = '';
    renderApp();
};

window.editProduct = (id: any) => {
    state.editingId = id;
    state.tempImg = '';
    renderApp();
};

window.deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this ritual item from the collection?')) {
        state.products = state.products.filter((p: any) => p.id !== id);
        localStorage.setItem('handora_products', JSON.stringify(state.products));
        renderApp();
    }
};

// --- GLOBAL ACTIONS ---
window.addToBag = (id: string) => {
  const p = state.products.find((x:any) => x.id === id);
  if (p) {
    state.cart.push(p);
    updateCartUI();
    alert(`${p.name} added to ritual.`);
  }
};

window.removeFromBag = (index: number) => {
  state.cart.splice(index, 1);
  updateCartUI();
  renderApp();
};

const updateCartUI = () => {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.innerText = state.cart.length.toString();
    countEl.classList.toggle('hidden', state.cart.length === 0);
  }
};

window.handleCheckout = () => {
    alert("Order processed. Nature is on the way.");
    state.cart = [];
    updateCartUI();
    window.navigate('home');
};

window.openAuth = () => document.getElementById('auth-modal')?.classList.remove('hidden');
window.closeAuth = () => document.getElementById('auth-modal')?.classList.add('hidden');

window.handleAuth = (e: Event) => {
  e.preventDefault();
  const emailInput = document.getElementById('auth-email') as HTMLInputElement;
  const email = emailInput?.value || '';
  state.user = { 
    name: email.split('@')[0], 
    isAdmin: email.toLowerCase().includes('admin'),
    email: email
  };
  
  // Update Navbar for logged in user
  const authArea = document.getElementById('auth-area');
  if (authArea) {
    authArea.innerHTML = `
      <div class="flex items-center gap-4 bg-handora-light pl-4 pr-1 py-1 rounded-full border border-handora-green/20">
        <span class="text-[9px] font-black uppercase text-handora-green tracking-widest">${state.user.name}</span>
        <div onclick="sessionStorage.clear(); location.reload();" class="w-9 h-9 bg-handora-green text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg cursor-pointer hover:bg-red-400 transition-colors">${state.user.name[0].toUpperCase()}</div>
      </div>
    `;
  }

  // Inject Admin Tab if user is admin
  if (state.user.isAdmin) {
    const navLinks = document.getElementById('nav-links');
    if (navLinks && !document.querySelector('[data-page="admin"]')) {
      const adminBtn = document.createElement('button');
      adminBtn.onclick = () => window.navigate('admin');
      adminBtn.className = 'nav-link';
      adminBtn.setAttribute('data-page', 'admin');
      adminBtn.innerText = 'Admin';
      navLinks.appendChild(adminBtn);
    }
  }
  
  window.closeAuth();
  updateNavState();
  
  // Optional: Automatically navigate to admin if admin logged in
  if (state.user.isAdmin) window.navigate('admin');
};

window.runAI = async (skinType: string) => {
  state.quizLoading = true;
  renderApp();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Suggest a botanical skincare ritual for ${skinType} skin. Use: ${state.products.map((p:any) => p.name).join(', ')}. Return {advice: string, suggest: string} as JSON.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            suggest: { type: Type.STRING }
          }
        }
      }
    });
    const result = JSON.parse(response.text || '{}');
    const container = document.getElementById('quiz-container');
    if (container) {
      container.innerHTML = `
        <div class="text-center reveal-active">
          <p class="text-2xl text-slate-500 mb-10 italic">"${result.advice}"</p>
          <div class="bg-handora-light p-10 rounded-[50px] mb-12">
             <p class="text-4xl font-serif text-handora-dark">${result.suggest}</p>
          </div>
          <button onclick="navigate('shop')" class="btn-shimmer text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest">Shop Recommendations</button>
        </div>
      `;
    }
  } catch (e) {
    alert("AI service unavailable.");
    state.quizLoading = false;
    renderApp();
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  
  // Parallax Logic
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxes = document.querySelectorAll('.parallax-scroll');
    parallaxes.forEach((el: any) => {
      const rate = scrolled * 0.15;
      el.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });

    const nav = document.getElementById('navbar');
    if (scrolled > 50) {
      nav?.classList.add('py-3');
      nav?.firstElementChild?.classList.add('shadow-2xl');
    } else {
      nav?.classList.remove('py-3');
      nav?.firstElementChild?.classList.remove('shadow-2xl');
    }
  });
});

