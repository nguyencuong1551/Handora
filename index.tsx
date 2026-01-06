
import { GoogleGenAI, Type } from "@google/genai";

import sp1 from "/Images/sp1.png";
import sp2 from "/Images/sp2.png";
import sp3 from "/Images/sp3.png";
import sp4 from "/Images/sp4.png";

import avt1 from "/Images/avt_1.jpg";

import blog4 from "/Images/sp4.png";
import blog5 from "/Images/sp5.png";
import blog6 from "/Images/sp6.png";


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
    // Blog admin actions
    saveBlog: (e: Event) => void;
    editBlog: (id: string) => void;
    deleteBlog: (id: string) => void;
    handleBlogImageUpload: (e: Event) => void;
    // navigation helper for blog cards
    openBlog: (id: string) => void;
    // Exposed for legacy string-rendered views
    state: any;
    renderApp: () => void;
    // Registration modal handlers
    openRegisterModal: () => void;
    closeRegisterModal: () => void;
    handleRegisterSubmit: (e: Event) => void;
    seedInitialBlogs: () => void;
    clearAllStorage: () => void;
    toggleOrderFake: (orderId: string) => void;

    setShopSearch: (v: string) => void;
setShopCategory: (v: string) => void;
setShopSort: (v: string) => void;


  }
}

// --- DATA ---
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Pomelo Peel Wash', category: 'Hand Rituals', price: 18.00, desc: 'Natural pomelo extracts gently cleanse while maintaining essential moisture.', img: sp1, tag: 'Refreshing', ingredients: ['Cold-pressed Pomelo', 'Vitamin E'] },
  { id: '2', name: 'Green Tea Revitalizer', category: 'Hand Rituals', price: 16.00, desc: 'Antioxidant-rich soap that protects sensitive skin with botanical barrier.', img: sp2, tag: 'Detoxifying', ingredients: ['Matcha Leaf', 'Glycerin'] },
  { id: '3', name: 'Aloe Vera Calm', category: 'Hand Rituals', price: 17.50, desc: 'Instant hydration boost with organic, succulent aloe vera juices.', img: sp3, tag: 'Soothing', ingredients: ['Inner Fillet Aloe', 'Cucumber'] },
  { id: '4', name: 'Lavender Hand Balm', category: 'Skin Therapy', price: 22.00, desc: 'Soothe your mind and nourish your hands with calming lavender essence.', img: sp4, tag: 'Nocturnal', ingredients: ['Organic Lavender', 'Shea Butter'] }
];


const TEAM = [
  { id: 't1', name: 'Minh Huyen', role: 'Founder & Visionary', bio: 'Expert in botanical pharmacology with a passion for sustainable luxury.', img: avt1 },
  { id: 't2', name: 'Minh Huyen', role: 'Head of Research', bio: 'Leading the development of bio-active extraction methods.', img: avt1 },
  { id: 't3', name: 'Minh Huyen', role: 'Sustainability Lead', bio: 'Ensuring our zero-waste philosophy is upheld in every ritual.', img: avt1 },
  { id: 't4', name: 'Minh Huyen', role: 'Head of Research', bio: 'Leading the development of bio-active extraction methods.', img: avt1 },
  { id: 't5', name: 'Minh Huyen', role: 'Sustainability Lead', bio: 'Ensuring our zero-waste philosophy is upheld in every ritual.', img: avt1 }
];



// --- APP STATE ---
const INITIAL_BLOGS = [
  {
    id: 'b1',
    title: 'The Gentle Art of Hand Rituals',
    excerpt: 'How a short, mindful hand-care ritual can reset your day and soothe the senses.',
    content: `In a world rushing forward, slow rituals anchor us. This piece explores a simple three-step hand ritual using citrus and botanical cleansers to refresh, followed by balm to seal in moisture. Learn how scent, texture, and rhythm combine to create a small daily ceremony that supports wellbeing.`,
    img: blog6 
  },
  {
    id: 'b2',
    title: 'Matcha & Calm: Using Antioxidants in Daily Care',
    excerpt: 'Matcha extracts and green formulations for tired hands — benefits and how to use them.',
    content: `Green tea derivatives bring antioxidant power to topical care. We discuss concentrations, pairing with humectants, and a simple evening balm ritual to fortify and soothe.`,
    img: blog5
  },
  {
    id: 'b3',
    title: 'Lavender Nights: Sleep-Friendly Skincare Tips',
    excerpt: 'The role of calming botanicals in an evening routine and which ingredients to favor.',
    content: `Lavender and other mild botanicals can help create a sensory cue for sleep. This article covers ingredient safety, formulation notes, and a bedtime hand balm recipe you can make at home.`,
    img: blog4
  },
  {
    id: 'b4',
    title: 'Lavender Nights: Sleep-Friendly Skincare Tips',
    excerpt: 'The role of calming botanicals in an evening routine and which ingredients to favor.',
    content: `Lavender and other mild botanicals can help create a sensory cue for sleep. This article covers ingredient safety, formulation notes, and a bedtime hand balm recipe you can make at home.`,
    img: sp3 
  }
];

let state: any = {
  currentPage: 'home',
  cart: [],
  user: null,
  pendingCheckout: false,

  // orders (load from localStorage)
  orders: JSON.parse(localStorage.getItem('handora_orders') || '[]'),

  quizLoading: false,
  selectedCategory: 'All',
  products: JSON.parse(localStorage.getItem('handora_products') || JSON.stringify(INITIAL_PRODUCTS)),
  editingId: null,
  tempImg: '',

  // shop filters
shopSearch: '',
shopCategory: 'All',  // All | Hand Rituals | Skin Therapy
shopSort: 'default',  // default | price_asc | price_desc | name_asc | name_desc
};


// Blogs stored in localStorage (admin-managed). Use initial posts when none exist or when stored list is empty.
(() => {
  const raw = localStorage.getItem('handora_blogs');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.blogs = parsed;
      } else {
        state.blogs = INITIAL_BLOGS;
        localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
      }
    } catch (err) {
      state.blogs = INITIAL_BLOGS;
      localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
    }
  } else {
    state.blogs = INITIAL_BLOGS;
    localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
  }
})();
state.editingBlogId = null;
state.tempBlogImg = '';

// expose TEAM to views module via state
state.TEAM = TEAM;
// --- RENDER ENGINE ---
window.navigate = (page: string) => {
  state.currentPage = page;
  updateNavState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// helper used by blog cards in templates
window.openBlog = (id: string) => {
  state.currentBlogId = id;
  window.navigate('blog');
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
    case 'home': root.innerHTML = renderHome(state); break;
    case 'shop': root.innerHTML = renderShop(state); break;
    case 'about': root.innerHTML = renderAbout(state); break;
    case 'quiz': root.innerHTML = renderQuiz(state); break;
    case 'cart': root.innerHTML = renderCart(state); break;
    case 'blogs': root.innerHTML = renderBlogs(state); break;
    case 'blog': root.innerHTML = renderBlog(state); break;
    
    case 'admin': 
      if (state.user?.isAdmin) {
        root.innerHTML = renderAdmin(state);
      } else {
        window.navigate('home');
      }
      break;
    default: root.innerHTML = renderHome(state);
  }
  
  initializeAnimations();
};


const renderAppPreserveInput = (focusId: string) => {
  const el = document.getElementById(focusId) as HTMLInputElement | null;
  const hasFocus = document.activeElement === el;
  const start = el?.selectionStart ?? null;
  const end = el?.selectionEnd ?? null;

  renderApp();

  if (hasFocus) {
    const next = document.getElementById(focusId) as HTMLInputElement | null;
    if (next) {
      next.focus({ preventScroll: true } as any);
      if (start !== null && end !== null) {
        try {
          next.setSelectionRange(start, end);
        } catch {}
      }
    }
  }
};

// expose renderApp and state to global window so inline onclick handlers can access them
window.renderApp = renderApp as any;
window.state = state as any;

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
import { renderHome, renderShop, renderAbout, renderQuiz, renderCart, renderAdmin, renderBlogs, renderBlog } from './views/pages';

window.setShopSearch = (v: string) => {
  if (state.shopSearch === v) return;
  state.shopSearch = v;
  renderAppPreserveInput("shop-search");
};



window.setShopCategory = (v: string) => {
  state.shopCategory = v;
  renderApp();
};

window.setShopSort = (v: string) => {
  state.shopSort = v;
  renderApp();
};


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


// --- ORDER ADMIN ACTIONS ---
window.toggleOrderFake = (orderId: string) => {
  state.orders = (state.orders || []).map((o: any) => {
    if (o.id !== orderId) return o;

    const nextFake = !o.isFake;
    return {
      ...o,
      isFake: nextFake,
      status: nextFake ? "fake" : (o.status || "pending")
    };
  });

  localStorage.setItem("handora_orders", JSON.stringify(state.orders));
  localStorage.setItem("orders", JSON.stringify(state.orders)); // mirror (optional)

  renderApp();
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

// --- BLOG ADMIN ACTIONS ---
window.handleBlogImageUpload = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      state.tempBlogImg = reader.result;
      renderApp();
    };
    reader.readAsDataURL(file);
  }
};

window.saveBlog = (e: Event) => {
  e.preventDefault();
  const title = (document.getElementById('b-title') as HTMLInputElement).value;
  const excerpt = (document.getElementById('b-excerpt') as HTMLInputElement).value;
  const content = (document.getElementById('b-content') as HTMLTextAreaElement).value;
  const img = state.tempBlogImg || (state.editingBlogId ? (state.blogs.find((b:any)=>b.id===state.editingBlogId)||{}).img : '');

  if (state.editingBlogId) {
    state.blogs = state.blogs.map((b:any) => b.id === state.editingBlogId ? { ...b, title, excerpt, content, img } : b);
  } else {
    const newBlog = { id: Date.now().toString(), title, excerpt, content, img };
    state.blogs.unshift(newBlog);
  }

  localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
  state.editingBlogId = null;
  state.tempBlogImg = '';
  renderApp();
};

window.editBlog = (id: any) => {
  state.editingBlogId = id;
  state.tempBlogImg = '';
  renderApp();
};

window.deleteBlog = (id: string) => {
  if (confirm('Remove this article?')) {
    state.blogs = state.blogs.filter((b: any) => b.id !== id);
    localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
    renderApp();
  }
};

// --- GLOBAL ACTIONS ---
window.addToBag = (id: string) => {
  const idStr = String(id);
  const p = state.products.find((x:any) => String(x.id) === idStr);
  if (p) {
    // If product already in cart, increment quantity, otherwise add with qty=1
    const existing = state.cart.find((c: any) => String(c.id) === idStr);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      state.cart.push({ id: idStr, name: p.name, price: p.price, img: p.img, qty: 1 });
    }
    updateCartUI();
    // brief toast instead of blocking alert
    const toastEl = document.getElementById('handora-toast');
    if (toastEl) toastEl.remove();
    const t = document.createElement('div');
    t.id = 'handora-toast';
    t.innerText = `${p.name} added to ritual.`;
    t.style.cssText = 'position:fixed;right:20px;bottom:20px;background:#1a2e21;color:white;padding:12px 16px;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:9999;font-weight:700;font-size:13px;';
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('handora-toast-hide'), 1400);
    setTimeout(() => t.remove(), 2000);

    // animate cart button briefly (one quick pulse)
    try {
      const cartBtn = document.getElementById('cart-button');
      const cartCount = document.getElementById('cart-count');
      if (cartBtn && cartBtn.animate) {
        cartBtn.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-6px) scale(1.04)' },
          { transform: 'translateY(0) scale(1)' }
        ], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
      if (cartCount && cartCount.animate) {
        cartCount.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.25)' },
          { transform: 'scale(1)' }
        ], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    } catch (e) {
      // ignore animation errors in older browsers
    }
  }
};

window.removeFromBag = (index: number) => {
  const item = state.cart[index];
  if (!item) return;
  if (item.qty && item.qty > 1) {
    item.qty = item.qty - 1;
  } else {
    state.cart.splice(index, 1);
  }
  updateCartUI();
  renderApp();
};

const updateCartUI = () => {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    // Show number of distinct items in cart (not total quantity)
    const distinctCount = state.cart.length;
    countEl.innerText = distinctCount.toString();
    countEl.classList.toggle('hidden', distinctCount === 0);
  }
};
const getCartTotal = () =>
  Number(
    state.cart.reduce((s: number, i: any) => s + (Number(i.price) * (i.qty || 1)), 0).toFixed(2)
  );

const createOrderFromCart = () => {
  if (!state.user) return null;
  if (!state.cart || state.cart.length === 0) return null;

  const order = {
    id: 'o_' + Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'pending',
   customer: {
  email: state.user.email || '',
  name: state.user.name || '',
  phone: state.user.phone || '',
  address: state.user.address || ''  // thêm dòng này
},
    items: state.cart.map((i: any) => ({
      id: i.id,
      name: i.name,
      price: Number(i.price),
      qty: i.qty || 1,
      img: i.img
    })),
    total: getCartTotal()
  };

  // state + localStorage
  state.orders = [order, ...(state.orders || [])];
  localStorage.setItem('handora_orders', JSON.stringify(state.orders));

  // (optional) mirror key "orders" đúng như bạn nói
  localStorage.setItem('orders', JSON.stringify(state.orders));

  return order;
};


window.handleCheckout = () => {
  // If cart empty, don't proceed
  if (!state.cart || state.cart.length === 0) {
    alert("Your ritual bag is empty.");
    return;
  }

  // If not logged in, prompt login and mark pending checkout
  if (!state.user) {
    state.pendingCheckout = true;
    window.openAuth();
    return;
  }

  // Create order + clear cart
  const order = createOrderFromCart();
  if (!order) {
    alert("Unable to create order.");
    return;
  }

  alert("Order placed. Nature is on the way.");
  state.cart = [];
  updateCartUI();
  state.pendingCheckout = false;
  window.navigate('home');
};


window.openAuth = () => document.getElementById('auth-modal')?.classList.remove('hidden');
window.closeAuth = () => document.getElementById('auth-modal')?.classList.add('hidden');

window.handleAuth = (e: Event) => {
  e.preventDefault();

  const emailInput = document.getElementById('auth-email') as HTMLInputElement;
  const passInput = document.getElementById('auth-pass') as HTMLInputElement; // theo modal mới
  const email = (emailInput?.value || '').trim();
  const pass = (passInput?.value || '').trim();

  if (!email) return;

  // if user exists in localStorage, validate password (demo)
  const users = JSON.parse(localStorage.getItem('handora_users') || '[]');
  const found = users.find((u: any) => String(u.email).toLowerCase() === email.toLowerCase());

  // If user found -> check password (stored btoa)
  if (found) {
    const ok = found.password === btoa(pass);
    if (!ok) {
      alert('Wrong password.');
      return;
    }
  } else {
    // allow "admin" test login as before (no password checking)
    // if not admin email, you can choose to block; for now keep simple demo:
    const isAdminTest = email.toLowerCase().includes('admin');
    if (!isAdminTest) {
      alert("Account not found. Please register first.");
      return;
    }
  }

  const isAdmin = email.toLowerCase().includes('admin');

 state.user = {
  name: found?.name || email.split('@')[0],
  isAdmin,
  email,
  phone: found?.phone || '',
  address: found?.address || ''
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

  // If pending checkout -> place order now
  if (state.pendingCheckout) {
    state.pendingCheckout = false;
    window.handleCheckout();
    return;
  }

  // Optional: Automatically navigate to admin if admin logged in
  if (state.user.isAdmin) window.navigate('admin');
};


// --- REGISTRATION MODAL HANDLERS ---
window.openRegisterModal = () => document.getElementById('register-modal')?.classList.remove('hidden');
window.closeRegisterModal = () => document.getElementById('register-modal')?.classList.add('hidden');

window.handleRegisterSubmit = (e: Event) => {
  e.preventDefault();

  const email = (document.getElementById('reg-email') as HTMLInputElement)?.value.trim();
  const pass = (document.getElementById('reg-pass') as HTMLInputElement)?.value;
  const repass = (document.getElementById('reg-repass') as HTMLInputElement)?.value;
  const phone = (document.getElementById('reg-phone') as HTMLInputElement)?.value.trim();
  const address = (document.getElementById('reg-address') as HTMLTextAreaElement)?.value.trim();
  const errEl = document.getElementById('reg-error');

  // reset error
  if (errEl) {
    errEl.classList.add('hidden');
    errEl.textContent = '';
  }

  // === BẮT BUỘC ĐIỀN HẾT ===
  if (!email || !pass || !repass || !phone || !address) {
    if (errEl) {
      errEl.textContent = 'Please fill in all required fields.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (errEl) {
      errEl.textContent = 'Invalid email format.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // password length
  if (pass.length < 6) {
    if (errEl) {
      errEl.textContent = 'Password must be at least 6 characters.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // password match
  if (pass !== repass) {
    if (errEl) {
      errEl.textContent = 'Passwords do not match.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // phone basic validation
  if (phone.length < 7) {
    if (errEl) {
      errEl.textContent = 'Please enter a valid phone number.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // === CHECK TRÙNG EMAIL ===
  const users = JSON.parse(localStorage.getItem('handora_users') || '[]');
  const exists = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    if (errEl) {
      errEl.textContent = 'This email is already registered.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  // === SAVE USER ===
  const newUser = {
    id: Date.now().toString(),
    email,
    phone,
    address,
    password: btoa(pass) // demo only
  };

  users.push(newUser);
  localStorage.setItem('handora_users', JSON.stringify(users));

  // auto login
  state.user = {
    name: email.split('@')[0],
    email,
    phone,
    address,
    isAdmin: false
  };

  // update navbar
  const authArea = document.getElementById('auth-area');
  if (authArea) {
    authArea.innerHTML = `
      <div class="flex items-center gap-4 bg-handora-light pl-4 pr-1 py-1 rounded-full border border-handora-green/20">
        <span class="text-[9px] font-black uppercase text-handora-green tracking-widest">
          ${state.user.name}
        </span>
        <div onclick="location.reload()"
          class="w-9 h-9 bg-handora-green text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg cursor-pointer hover:bg-red-400 transition-colors">
          ${state.user.name[0].toUpperCase()}
        </div>
      </div>
    `;
  }

  window.closeRegisterModal();

  // nếu đang checkout dở
  if (state.pendingCheckout) {
    state.pendingCheckout = false;
    window.handleCheckout();
    return;
  }

  renderApp();
};

// Seed initial blogs (useful if localStorage was empty)
window.seedInitialBlogs = () => {
  try {
    state.blogs = INITIAL_BLOGS.slice();
    localStorage.setItem('handora_blogs', JSON.stringify(state.blogs));
    renderApp();
    const t = document.createElement('div');
    t.className = 'fixed right-6 bottom-6 bg-handora-green text-white px-4 py-2 rounded-lg shadow-lg';
    t.innerText = 'Sample articles seeded';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  } catch (e) {
    console.error('seedInitialBlogs error', e);
  }
};

// Clear all localStorage (triggered from footer Shipping button)
window.clearAllStorage = () => {
  try {
    const ok = confirm('Clear all localStorage? This will remove products, blogs, users and orders stored locally. Continue?');
    if (!ok) return;
    localStorage.clear();
    // small toast then reload
    const t = document.createElement('div');
    t.className = 'fixed right-6 bottom-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg';
    t.innerText = 'Local storage cleared';
    document.body.appendChild(t);
    setTimeout(() => {
      t.remove();
      location.reload();
    }, 1100);
  } catch (e) {
    console.error('clearAllStorage error', e);
  }
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

