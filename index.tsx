
import { GoogleGenAI, Type } from "@google/genai";

import sp1 from "/Images/sp1.png";
import sp2 from "/Images/sp2.png";
import sp3 from "/Images/sp3.png";
import sp4 from "/Images/sp4.png";

import avt1 from "/Images/avt_1.jpg";
import avt2 from "/Images/avt_2.jpg";
import avt3 from "/Images/avt_3.jpg";
import avt4 from "/Images/avt_4.jpg";
import avt5 from "/Images/avt_5.jpg";


import blog4 from "/Images/sp4.png";
import blog5 from "/Images/sp5.png";
import blog6 from "/Images/sp6.png";


// --- TYPES & GLOBALS ---
declare global {
  interface Window {
toggleFavorite: (id: string) => void;
setVariant: (productId: string, size: string) => void;

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
addVariantRow: () => void;
removeVariantRow: (idx: number) => void;
syncVariantsFromDOM: () => void;
startQuiz: () => void;
pickQuizOption: (key: string, value: string) => void;
toggleQuizPriority: (value: string) => void;
nextQuiz: () => void;
prevQuiz: () => void;

setResultVariant: (size: string) => void;
viewResultProduct: () => void;
addResultToCart: () => void;
addAddonBundle: () => void;
removeLine: (index: number) => void;
removeLineByKey: (key: string) => void;
  }
}

// --- DATA ---
const INITIAL_PRODUCTS = [
  // ================= CORE LINE =================
  {
    id: "core_pomelo",
    name: "Pomelo Peel Vegan Hand Wash",
    category: "Core Line – Daily Vegan Hand Wash",
    keyIngredient: "Pomelo peel extract",
    scent: "Fresh citrus",
    target: "Daily hand hygiene, normal skin",
    description:
      "A gentle vegan hand wash formulated with pomelo peel extract to cleanse hands effectively while maintaining natural moisture for everyday use.",
    img: sp1,
    variants: [
      { size: "250ml", price: 69000 },
      { size: "500ml", price: 119000 }
    ],
    tags: ["Vegan", "Daily Use", "Refreshing"]
  },

  {
    id: "core_aloe",
    name: "Aloe Vera Vegan Hand Wash",
    category: "Core Line – Daily Vegan Hand Wash",
    keyIngredient: "Aloe vera extract",
    scent: "Mild herbal",
    target: "Moisturizing, frequent hand washing",
    description:
      "A moisturizing vegan hand wash enriched with aloe vera, suitable for frequent daily handwashing without causing dryness.",
    img: sp3,
    variants: [
      { size: "250ml", price: 69000 },
      { size: "500ml", price: 119000 }
    ],
    tags: ["Vegan", "Moisturizing"]
  },

  {
    id: "core_green_tea",
    name: "Green Tea Vegan Hand Wash",
    category: "Core Line – Daily Vegan Hand Wash",
    keyIngredient: "Green tea extract",
    scent: "Light green tea",
    target: "Antioxidant care, daily use",
    description:
      "A plant-based hand wash infused with green tea extract to support antioxidant care and gentle daily hand hygiene.",
    img: sp2,
    variants: [
      { size: "250ml", price: 69000 },
      { size: "500ml", price: 119000 }
    ],
    tags: ["Vegan", "Antioxidant"]
  },

  // ================= SENSITIVE LINE =================
  {
    id: "sensitive_unscented",
    name: "Unscented Vegan Hand Wash",
    category: "Sensitive Line – Gentle Hand Wash",
    keyIngredient: "Plant-based cleanser",
    scent: "No fragrance",
    target: "Sensitive skin, fragrance-free users",
    description:
      "A fragrance-free vegan hand wash designed for sensitive or easily irritated skin, suitable for multiple uses per day.",
    img: sp4,
    variants: [
      { size: "250ml", price: 79000 },
      { size: "500ml", price: 129000 }
    ],
    tags: ["Sensitive", "Fragrance-Free"]
  },

  {
    id: "sensitive_oat",
    name: "Oat Extract Hand Wash",
    category: "Sensitive Line – Gentle Hand Wash",
    keyIngredient: "Oat extract",
    scent: "Very light",
    target: "Dry or irritated skin",
    description:
      "A gentle hand wash formulated with oat extract to help soothe dry or irritated skin during frequent handwashing.",
    img: sp4,
    variants: [
      { size: "250ml", price: 79000 },
      { size: "500ml", price: 129000 }
    ],
    tags: ["Sensitive", "Soothing"]
  },

  // ================= ECO LINE – REFILL =================
  {
    id: "eco_pomelo_refill",
    name: "Pomelo Peel Refill Pack",
    category: "Eco Line – Refill Packs",
    keyIngredient: "Pomelo peel extract",
    scent: "Fresh citrus",
    target: "Refill daily-use bottles",
    description:
      "A refill pack designed to reduce plastic waste while maintaining the same gentle cleansing performance for daily use.",
    img: sp1,
    variants: [
      { size: "500ml", price: 89000 },
      { size: "1L", price: 149000 }
    ],
    tags: ["Refill", "Eco"]
  },

  {
    id: "eco_aloe_refill",
    name: "Aloe Vera Refill Pack",
    category: "Eco Line – Refill Packs",
    keyIngredient: "Aloe vera extract",
    scent: "Mild herbal",
    target: "Sustainable consumption",
    description:
      "A sustainable refill solution for aloe vera hand wash users, supporting long-term daily use and eco-conscious habits.",
    img: sp3,
    variants: [
      { size: "500ml", price: 89000 },
      { size: "1L", price: 149000 }
    ],
    tags: ["Refill", "Eco"]
  },

  {
    id: "eco_unscented_refill",
    name: "Unscented Refill Pack",
    category: "Eco Line – Refill Packs",
    keyIngredient: "Plant-based cleanser",
    scent: "No fragrance",
    target: "Eco-friendly refill for sensitive users",
    description:
      "A fragrance-free refill pack suitable for sensitive skin users seeking eco-friendly daily hand care solutions.",
    img: sp4,
    variants: [
      { size: "500ml", price: 89000 },
      { size: "1L", price: 149000 }
    ],
    tags: ["Refill", "Sensitive"]
  },

  // ================= LIFESTYLE LINE =================
  {
    id: "lifestyle_daily_set",
    name: "Daily Hand Care Set",
    category: "Lifestyle Line",
    keyIngredient: "Hand wash + vegan hand cream",
    scent: "Varies",
    target: "Daily hand care & upselling",
    description:
      "A simple daily hand care set combining hand wash and vegan hand cream for complete everyday hand hygiene and care.",
    img: sp1,
    variants: [{ size: "Set", price: 169000 }],
    tags: ["Set", "Gift"]
  },

  {
    id: "lifestyle_eco_set",
    name: "Eco Starter Kit",
    category: "Lifestyle Line",
    keyIngredient: "Hand wash + refill pack",
    scent: "Varies",
    target: "Sustainable lifestyle starters",
    description:
      "A starter kit designed for users beginning a sustainable hand care routine, combining daily hand wash with refill packaging.",
    img: sp1,
    variants: [{ size: "Set", price: 169000 }],
    tags: ["Set", "Eco"]
  }
];


const TEAM = [
  {
    id: 't1',
    name: 'Minh Huyen',
    role: 'Founder & Brand Director',
    img: avt1
  },
  {
    id: 't2',
    name: 'Manh Quan',
    role: 'Head of Research & Product Development',
    img: avt2
  },
  {
    id: 't3',
    name: 'Yen Nhi',
    role: 'Head of Brand & Visual Identity',
    img: avt3
  },
  {
    id: 't4',
    name: 'Tuan Kiet',
    role: 'Head of Marketing & Communication',
    img: avt4
  },
  {
    id: 't5',
    name: 'Quynh Chi',
    role: 'Head of Operations & Growth',
    img: avt5
  }
];






// --- APP STATE ---
const INITIAL_BLOGS = [
  {
    id: 'b1',
    title: 'The Role of Vegan Ingredients in Daily Hand Care',
    excerpt: 'An overview of plant-based ingredients commonly used in gentle hand wash and how they support everyday skin comfort.',
    content: `An overview of plant-based ingredients commonly used in gentle hand wash and how they support everyday skin comfort.`,
    img: blog6 
  },
  {
    id: 'b2',
    title: 'Why Gentle Hand Wash Matters for Frequent Daily Use',
    excerpt: 'Explore how mild formulations help protect hands during frequent washing throughout the day.',
    content: `Explore how mild formulations help protect hands during frequent washing throughout the day.`,
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

const favKeyFor = (email?: string) =>
  `handora_favorites_${String(email || "guest").toLowerCase()}`;

let state: any = {
  currentPage: 'home',
  cart: [],
  user: null,
  pendingCheckout: false,
  selectedVariants: JSON.parse(localStorage.getItem("handora_selectedVariants") || "{}"),

  // orders (load from localStorage)
  orders: JSON.parse(localStorage.getItem('handora_orders') || '[]'),

  quizLoading: false,
  selectedCategory: 'All',
  products: JSON.parse(localStorage.getItem('handora_products') || JSON.stringify(INITIAL_PRODUCTS)),
  editingId: null,
  tempImg: '',
favorites: [],


  // shop filters
shopSearch: '',
shopCategory: 'All',  // All | Hand Rituals | Skin Therapy
shopSort: 'default',  // default | price_asc | price_desc | name_asc | name_desc

quizStep: 0, // 0 intro, 1..4 questions, 5 result
quizAnswers: {
  wash_frequency: "",
  skin_condition: "",
  scent_preference: "",
  priorities: [] as string[]
},
quizResult: null,
quizSelectedSize: "",
quizAddonSelectedSize: "",

};


const findProductById = (id: string) =>
  (state.products || []).find((p: any) => String(p.id) === String(id)) || null;

const pickVariant = (product: any, preferredSize?: string) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  if (!variants.length) return { size: "", price: Number(product?.price || 0) || 0 };

  if (preferredSize) {
    const found = variants.find((v: any) => String(v.size) === String(preferredSize));
    if (found) return { size: String(found.size), price: Number(found.price || 0) };
  }
  // default first
  const v0 = variants[0];
  return { size: String(v0.size), price: Number(v0.price || 0) };
};

const computeQuizResult = () => {
  const a = state.quizAnswers || {};
  const wash = String(a.wash_frequency || "");
  const skin = String(a.skin_condition || "");
  const scent = String(a.scent_preference || "");
  const priorities: string[] = Array.isArray(a.priorities) ? a.priorities : [];

  const has = (x: string) => priorities.includes(x);

  // ----- 3.1 pick main product -----
  let mainId = "";

  if (skin === "Easily irritated or sensitive") {
    mainId = "sensitive_unscented";
  } else if (skin === "Very dry or tight") {
    mainId = "sensitive_oat";
  } else if (wash === "More than 10 times" || has("Moisturizing and comfortable skin feel")) {
    mainId = "core_aloe";
  } else {
    // Default by scent
    if (scent === "Fresh citrus") mainId = "core_pomelo";
    else if (scent === "Light green tea") mainId = "core_green_tea";
    else if (scent === "Mild herbal") mainId = "core_aloe";
    else if (scent === "No fragrance") mainId = "sensitive_unscented"; // even if not sensitive
    else mainId = "core_pomelo";
  }

  const main = findProductById(mainId);
  if (!main) return null;

  // ----- 3.2 size suggestion -----
  let suggestedSize = "";
  if (wash === "More than 10 times") suggestedSize = "500ml";
  else if (wash === "Less than 5 times") suggestedSize = "250ml";
  else suggestedSize = "250ml";

  // if main doesn't have suggested size, fallback first variant
  const mainPicked = pickVariant(main, suggestedSize);
  suggestedSize = mainPicked.size;

  // ----- addon logic -----
  // refill mapping
  const refillMap: Record<string, string> = {
    core_pomelo: "eco_pomelo_refill",
    core_aloe: "eco_aloe_refill",
    core_green_tea: "eco_pomelo_refill", // nếu muốn đúng mùi green tea thì cần thêm refill green tea; hiện catalog không có
    sensitive_unscented: "eco_unscented_refill",
    sensitive_oat: "eco_unscented_refill"
  };

  let addon: any = null;
  let addonType: "refill" | "set" | "" = "";

  if (has("Refill-first sustainable packaging")) {
    // nếu user mới (wash < 10) -> Eco Starter Kit
    if (wash !== "More than 10 times") {
      addon = findProductById("lifestyle_eco_set");
      addonType = "set";
    } else {
      const refillId = refillMap[mainId] || "eco_unscented_refill";
      addon = findProductById(refillId);
      addonType = "refill";
    }
  } else {
    // daily care set
    addon = findProductById("lifestyle_daily_set");
    addonType = "set";
  }

  // ----- why bullets (pick 3) -----
  const bullets: string[] = [];
  const push = (t: string) => { if (!bullets.includes(t) && bullets.length < 3) bullets.push(t); };

  // map by answers/priorities
  if (wash === "More than 10 times") push("Designed for frequent daily handwashing without discomfort.");
  if (skin === "Slightly dry" || skin === "Very dry or tight" || has("Moisturizing and comfortable skin feel")) {
    push("Skin-friendly formulation to help maintain moisture and reduce dryness.");
  }
  if (skin === "Easily irritated or sensitive" || scent === "No fragrance" || has("Fragrance-free option")) {
    push("Fragrance-free option suitable for sensitive or easily irritated skin.");
  }
  if (has("Plant-based vegan ingredients")) {
    push("Plant-based vegan ingredients aligned with clean daily hygiene.");
  }
  if (has("Refill-first sustainable packaging")) {
    push("Refill-first packaging supports sustainable consumption and reduces plastic waste.");
  }
  // fill remaining
  push("Plant-based vegan ingredients aligned with clean daily hygiene.");
  push("Designed for frequent daily handwashing without discomfort.");

  // choose addon variant default
  let addonPicked = null;
  if (addon) {
    // refill: suggest 1L if wash >10 else 500ml, set has "Set"
    let addonSize = "";
    if (addonType === "refill") addonSize = wash === "More than 10 times" ? "1L" : "500ml";
    addonPicked = pickVariant(addon, addonSize);
  }

  return {
    answers: { wash, skin, scent, priorities },
    main,
    mainPicked,           // {size, price}
    addon,
    addonType,
    addonPicked,          // {size, price} or null
    bullets
  };
};


const saveSelectedVariants = () => {
  localStorage.setItem("handora_selectedVariants", JSON.stringify(state.selectedVariants || {}));
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


window.startQuiz = () => {
  state.quizStep = 1;
  state.quizAnswers = {
    wash_frequency: "",
    skin_condition: "",
    scent_preference: "",
    priorities: []
  };
  state.quizResult = null;
  state.quizSelectedSize = "";
  renderApp();
};

window.pickQuizOption = (key: string, value: string) => {
  state.quizAnswers = state.quizAnswers || {};
  state.quizAnswers[key] = value;
  renderApp();
};

window.toggleQuizPriority = (value: string) => {
  state.quizAnswers = state.quizAnswers || {};
  const cur: string[] = Array.isArray(state.quizAnswers.priorities) ? state.quizAnswers.priorities : [];
  const has = cur.includes(value);
  let next = has ? cur.filter(x => x !== value) : [value, ...cur];

  // max 2
  if (!has && next.length > 2) {
    showToast("You can select up to 2 priorities.", "error");
    next = next.slice(0, 2);
  }

  state.quizAnswers.priorities = next;
  renderApp();
};

window.nextQuiz = () => {
  const s = Number(state.quizStep || 0);

  // validate per step
  if (s === 1 && !state.quizAnswers?.wash_frequency) return showToast("Please select an option.", "error");
  if (s === 2 && !state.quizAnswers?.skin_condition) return showToast("Please select an option.", "error");
  if (s === 3 && !state.quizAnswers?.scent_preference) return showToast("Please select an option.", "error");
  if (s === 4) {
    const pr = state.quizAnswers?.priorities || [];
    if (!Array.isArray(pr) || pr.length === 0) return showToast("Select up to 2 priorities.", "error");

    // compute result
    const res = computeQuizResult();
    if (!res) return showToast("Cannot compute recommendation.", "error");

    state.quizResult = res;
    state.quizStep = 5;

    // set default selected size
    state.quizSelectedSize = res.mainPicked?.size || "";
    state.quizAddonSelectedSize = res.addonPicked?.size || "";

    renderApp();
    return;
  }

  state.quizStep = Math.min(s + 1, 4);
  renderApp();
};

window.prevQuiz = () => {
  const s = Number(state.quizStep || 0);
  if (s <= 1) {
    state.quizStep = 0;
  } else {
    state.quizStep = s - 1;
  }
  renderApp();
};

window.setResultVariant = (size: string) => {
  const res = state.quizResult;
  if (!res?.main) return;
  state.quizSelectedSize = String(size);

  // update picked price display implicitly in render
  renderApp();
};

window.viewResultProduct = () => {
  const res = state.quizResult;
  if (!res?.main?.id) return;
  state.currentProductId = res.main.id;
  window.navigate("shop");
};

window.addResultToCart = () => {
  const res = state.quizResult;
  if (!res?.main?.id) return;

  // set selected variant so addToBag uses it
  state.selectedVariants = state.selectedVariants || {};
  state.selectedVariants[String(res.main.id)] = String(state.quizSelectedSize || res.mainPicked?.size || "");
  saveSelectedVariants();

  window.addToBag(String(res.main.id));
};

window.addAddonBundle = () => {
  const res = state.quizResult;
  if (!res?.addon?.id) return;

  // set selected variant for addon
  state.selectedVariants = state.selectedVariants || {};
  const addonSize = res.addonPicked?.size || "";
  state.selectedVariants[String(res.addon.id)] = String(addonSize);
  saveSelectedVariants();

  window.addToBag(String(res.addon.id));
  showToast("Bundle added 🌿", "success");
};


const updateNavState = () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === state.currentPage);
  });
};

window.addVariantRow = () => {
  state.adminVariants = Array.isArray(state.adminVariants) ? state.adminVariants : [];
  state.adminVariants.push({ size: "", price: 0 });
  renderApp();
};

window.removeVariantRow = (idx: number) => {
  state.adminVariants = (state.adminVariants || []).filter((_: any, i: number) => i !== idx);
  if (!state.adminVariants.length) state.adminVariants = [{ size: "", price: 0 }];
  renderApp();
};

window.syncVariantsFromDOM = () => {
  const rows = Array.from(document.querySelectorAll('[data-variant-row="1"]'));
  const next = rows
    .map((row: any) => {
      const size = (row.querySelector('[data-variant-size="1"]') as HTMLInputElement)?.value?.trim() || "";
      const price = Number((row.querySelector('[data-variant-price="1"]') as HTMLInputElement)?.value || 0);
      return { size, price };
    })
    .filter(v => v.size && !Number.isNaN(v.price));

  state.adminVariants = next.length ? next : [{ size: "", price: 0 }];
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

window.toggleFavorite = (id: string) => {
  if (!state.user) {
    window.openAuth();
    return;
  }

  const idStr = String(id);
  const favs: string[] = Array.isArray(state.favorites) ? state.favorites : [];

  const exists = favs.includes(idStr);
  const next = exists ? favs.filter(x => x !== idStr) : [idStr, ...favs];

  state.favorites = next;
  localStorage.setItem(favKeyFor(state.user.email), JSON.stringify(next));

  renderApp();
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

window.removeLineByKey = (key: string) => {
  const k = String(key);
  state.cart = (state.cart || []).filter((it: any) => String(it.key) !== k);
  updateCartUI();
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

  // sync variants from DOM first
  window.syncVariantsFromDOM();

  const name = (document.getElementById("p-name") as HTMLInputElement).value.trim();
  const category = (document.getElementById("p-category") as HTMLSelectElement).value.trim();
  const keyIngredient = (document.getElementById("p-keyIngredient") as HTMLSelectElement).value.trim();
  const scent = (document.getElementById("p-scent") as HTMLSelectElement).value.trim();
  const target = (document.getElementById("p-target") as HTMLSelectElement).value.trim();
  const description = (document.getElementById("p-description") as HTMLTextAreaElement).value.trim();

  const tagsRaw = (document.getElementById("p-tags") as HTMLInputElement).value || "";
  const tags = tagsRaw.split(",").map(s => s.trim()).filter(Boolean);

  const variants = (state.adminVariants || [])
    .map((v:any) => ({ size: String(v.size || "").trim(), price: Number(v.price || 0) }))
    .filter((v:any) => v.size && !Number.isNaN(v.price) && v.price > 0);

  if (!name || !category || !keyIngredient || !description) {
    showToast("Please fill required fields.", "error");
    return;
  }
  if (!variants.length) {
    showToast("Please add at least 1 variant (size + price).", "error");
    return;
  }

  const img =
    state.tempImg ||
    (state.editingId ? state.products.find((p: any) => p.id === state.editingId)?.img : "") ||
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800";

  const nextProduct = {
    id: state.editingId ? state.editingId : Date.now().toString(),
    name,
    category,
    keyIngredient,
    scent,
    target,
    description,
    img,
    variants,
    tags
  };

  if (state.editingId) {
    state.products = state.products.map((p: any) => (p.id === state.editingId ? nextProduct : p));
  } else {
    state.products.unshift(nextProduct);
  }

  localStorage.setItem("handora_products", JSON.stringify(state.products));

  state.editingId = null;
  state.tempImg = "";
  state.adminVariants = [{ size: "250ml", price: 69000 }];
  renderApp();
};



window.editProduct = (id: any) => {
  state.editingId = id;
  state.tempImg = "";

  const p = id ? state.products.find((x: any) => String(x.id) === String(id)) : null;
  state.adminVariants =
    Array.isArray(p?.variants) && p.variants.length
      ? p.variants.map((v: any) => ({ size: String(v.size || ""), price: Number(v.price || 0) }))
      : [{ size: "250ml", price: 69000 }];

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

window.setVariant = (productId: string, size: string) => {
  state.selectedVariants = state.selectedVariants || {};
  state.selectedVariants[String(productId)] = String(size);
  saveSelectedVariants();
  renderApp();
};


window.showToast = (
  msg: string,
  type: "info" | "error" | "success" = "info"
) => {
  const old = document.getElementById("handora-toast");
  if (old) old.remove();

  const colors = {
    info: "bg-handora-dark",
    success: "bg-handora-green",
    error: "bg-red-500"
  };

  const t = document.createElement("div");
  t.id = "handora-toast";
  t.innerText = msg;
  t.className = `
    fixed right-6 top-6 z-[9999]
    ${colors[type]}
    text-white text-[13px] font-bold
    px-5 py-3 rounded-2xl shadow-2xl
    animate-[toastIn_.28s_cubic-bezier(.16,1,.3,1)]
  `;

  document.body.appendChild(t);

  setTimeout(() => {
    t.classList.add("animate-[toastOut_.2s_ease-in]");
    setTimeout(() => t.remove(), 180);
  }, 2000);
};



// --- GLOBAL ACTIONS ---
window.addToBag = (id: string) => {
  const idStr = String(id);
  const p = state.products.find((x: any) => String(x.id) === idStr);
  if (!p) return;

  const variants = Array.isArray(p.variants) ? p.variants : [];
  const selectedSize =
    (state.selectedVariants && state.selectedVariants[idStr]) ||
    (variants[0]?.size ? String(variants[0].size) : "");

  const picked =
    variants.find((v: any) => String(v.size) === String(selectedSize)) || variants[0] || null;

  const price = picked ? Number(picked.price || 0) : Number(p.price || 0);
  const size = picked ? String(picked.size || "") : "";

  // key theo product + size để cart không bị gộp sai
  const key = `${idStr}__${size || "default"}`;

  const existing = state.cart.find((c: any) => String(c.key) === key);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    state.cart.push({
      key,
      id: idStr,
      name: p.name,
      price,
      img: p.img,
      qty: 1,
      size
    });
  }

  updateCartUI();

  // toast giữ nguyên
  try {
    const toastEl = document.getElementById("handora-toast");
    if (toastEl) toastEl.remove();
    const t = document.createElement("div");
    t.id = "handora-toast";
    t.innerText = `${p.name}${size ? ` (${size})` : ""} added to ritual.`;
    t.style.cssText =
      "position:fixed;right:20px;bottom:20px;background:#1a2e21;color:white;padding:12px 16px;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:9999;font-weight:700;font-size:13px;";
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("handora-toast-hide"), 1400);
    setTimeout(() => t.remove(), 2000);
  } catch {}

  renderApp();
};


window.removeLine = (index: number) => {
  if (!Array.isArray(state.cart)) state.cart = [];
  if (index < 0 || index >= state.cart.length) return;

  state.cart.splice(index, 1);
  updateCartUI();
  renderApp();
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
  showToast("Your ritual bag is empty.", "error");
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

  showToast("Order placed successfully 🌿", "success");
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
showToast("Incorrect password.", "error");
      return;
    }
  } else {
    // allow "admin" test login as before (no password checking)
    // if not admin email, you can choose to block; for now keep simple demo:
    const isAdminTest = email.toLowerCase().includes('admin');
    if (!isAdminTest) {
showToast("Account not found. Please register first.", "error");
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
state.favorites = JSON.parse(
  localStorage.getItem(favKeyFor(state.user.email)) || "[]"
);


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
showToast("AI service is temporarily unavailable.", "error");
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

