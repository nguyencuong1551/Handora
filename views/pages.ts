import banner from "/Images/banner.png";
import banner1 from "/Images/banner1.png";

const formatVND = (n: any) =>
  Number(n || 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  });


export const renderHome = (state: any) => `
  <div class="overflow-x-hidden">
    <!-- HERO -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0 scale-110">
        <img src="${banner}"
             class="w-full h-full object-cover opacity-85 parallax-scroll" />
        <div class="absolute inset-0 bg-gradient-to-b from-handora-dark/35 via-transparent to-handora-light"></div>

        <!-- floating glow orbs -->
        <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-handora-green/15 blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        <div class="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-white/18 blur-3xl animate-[float_13s_ease-in-out_infinite]"></div>
      </div>

      <div class="container mx-auto px-8 relative z-10 text-center reveal-on-scroll">
        <span class="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-handora-green/20 text-[10px] font-black uppercase tracking-[0.6em] text-handora-green mb-8 bg-white/40 backdrop-blur-md">
          <span class="w-1.5 h-1.5 rounded-full bg-handora-green"></span>
          Botanical Engineering
        </span>

        <h1 class="text-7xl md:text-8xl font-serif text-slate-900 leading-tight mb-10">
          Gentle <span class="italic font-light text-handora-green">Vegan</span>,<br/>
          Care for Everyday Hands.
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed mb-12">
          Skin safe, plant-based hand wash designed for frequent daily use
          free from harsh chemicals and suitable for all skin types.
        </p>

        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <button onclick="navigate('shop')" class="btn-shimmer px-14 py-5 rounded-full text-white font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl">
            Shop Now
          </button>
          <button onclick="navigate('quiz')" class="glass px-14 py-5 rounded-full text-slate-800 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl">
            Skin & Washing Habit Quiz
          </button>
        </div>

        <!-- micro stats -->
        <div class="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          ${[
            ["100% Vegan", "Cruelty-free formulas"],
            ["Skin-Safe", "Gentle daily use"],
            ["Refill-First", "Less plastic waste"]
          ].map(([a,b], i) => `
            <div class="reveal-on-scroll bg-white/55 backdrop-blur border border-slate-200 rounded-3xl px-6 py-5 shadow-sm"
                 style="transition-delay:${i * 90}ms">
              <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">${a}</div>
              <div class="mt-2 text-slate-700 font-semibold">${b}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- scroll hint -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-8 h-14 rounded-full border border-slate-200 bg-white/50 backdrop-blur flex justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-handora-green mt-3 animate-[scrollDot_1.4s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>

    <!-- RITUAL STRIP -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5 reveal-on-scroll">
            <span class="text-[10px] font-black uppercase tracking-[0.8em] text-handora-green mb-6 block">
              Daily Vegan Hand Care
            </span>

            <h2 class="text-4xl font-serif text-handora-dark leading-none">
              Cleanse. Calm.
              <span class="italic text-handora-green">
                Gentle Care For<br>
                Frequent<br>
                Handwashing
              </span>
            </h2>

            <p class="mt-8 text-slate-500 text-lg leading-relaxed">
              A gentle, vegan hand wash system designed for frequent daily use formulated
              to cleanse effectively without disrupting the skin’s natural balance.
            </p>

            <div class="mt-10 flex gap-3">
              <button onclick="navigate('shop')"
                class="px-10 py-4 rounded-full bg-handora-green text-white text-[10px] font-black uppercase tracking-[0.35em] shadow-lg hover:shadow-xl transition-all">
                Explore Products
              </button>
              <button onclick="navigate('about')"
                class="px-10 py-4 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              ${[
                ["🌿", "Vegan & Ethical", "100% vegan and cruelty-free, responsibly formulated for everyday hygiene."],
                ["🤍", "Skin-Friendly", "Designed for multiple washes per day without causing dryness or irritation."],
                ["♻️", "Sustainable", "Refill-oriented packaging to reduce plastic."]
              ].map((x, i) => `
                <div class="reveal-on-scroll p-8 rounded-[36px] bg-handora-light/35 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                     style="transition-delay:${i * 120}ms">
                  <div class="text-4xl mb-6">${x[0]}</div>
                  <div class="text-xl font-bold text-slate-800 mb-3">${x[1]}</div>
                  <div class="text-slate-500 leading-relaxed">${x[2]}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="py-16 bg-handora-light/40">
      <div class="container mx-auto px-8">
        <div class="text-center mb-10 reveal-on-scroll">
          <span class="text-[10px] font-black uppercase tracking-[0.8em] text-handora-green mb-6 block">
            Featured
          </span>

          <h2 class="text-6xl md:text-7xl font-serif text-handora-dark">
            Best Selling <span class="italic text-handora-green">Daily Hand Care</span>
          </h2>

          <p class="mt-6 text-slate-500 text-lg max-w-2xl mx-auto">
            Our most popular vegan hand care products for everyday hygiene
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${(() => {
            const favs: string[] = Array.isArray(state.favorites) ? state.favorites.map(String) : [];
            const isFav = (p: any) => favs.includes(String(p.id));

            const homeProducts = [...(state.products || [])].sort((a: any, b: any) => {
              const af = isFav(a) ? 1 : 0;
              const bf = isFav(b) ? 1 : 0;
              if (af !== bf) return bf - af;
              return 0;
            });

            const getSelectedSize = (p: any) => {
              const pid = String(p?.id);
              const variants = Array.isArray(p?.variants) ? p.variants : [];
              const stored = state.selectedVariants?.[pid];
              return String(stored || variants[0]?.size || "");
            };

            const getPickedVariant = (p: any) => {
              const variants = Array.isArray(p?.variants) ? p.variants : [];
              const sel = getSelectedSize(p);
              return variants.find((v: any) => String(v.size) === sel) || variants[0] || null;
            };

            const getPrice = (p: any) => {
              const v = getPickedVariant(p);
              return v ? Number(v.price || 0) : Number(p?.price || 0);
            };

            const getDesc = (p: any) => String(p?.description || p?.desc || "");

            return homeProducts.slice(0, 4).map((p: any, i: number) => {
              const variants = Array.isArray(p?.variants) ? p.variants : [];
              const selSize = getSelectedSize(p);
              const price = getPrice(p);
              const desc = getDesc(p);

              return `
                <div
                  class="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all reveal-on-scroll flex flex-col h-full border border-slate-100"
                  style="transition-delay:${i * 120}ms"
                >
                  <!-- IMAGE -->
                  <div class="aspect-[4/5] overflow-hidden relative">
                    <img src="${p.img}" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />

                    <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <!-- FAVORITE (no layout shift) -->
                    <button
                      onclick="toggleFavorite('${p.id}')"
                      class="fav-btn absolute top-5 right-5 ${isFav(p) ? "is-on" : ""}"
                      title="Toggle favorite"
                    >
                      <svg class="fav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s-7.2-4.4-9.6-8.2C.7 9.9 2.3 6.6 5.6 5.7 7.5 5.2 9.4 5.9 10.6 7c.5.5.9 1 1.4 1.7.5-.7.9-1.2 1.4-1.7 1.2-1.1 3.1-1.8 5-1.3 3.3.9 4.9 4.2 3.2 7.1C19.2 16.6 12 21 12 21z" stroke-width="1.8" />
                      </svg>
                    </button>

                  <!-- CATEGORY BADGE (no wrap + ellipsis) -->
<div class="absolute left-5 bottom-5 px-4 py-2 rounded-2xl bg-white/75 backdrop-blur
            border border-white/60 text-[9px] font-black uppercase tracking-[0.25em]
            text-slate-700 max-w-[calc(100%-2.5rem)] leading-tight
            opacity-0 translate-y-2
            group-hover:opacity-100 group-hover:translate-y-0 transition-all">
  ${p.category || "Ritual"}
</div>


                  </div>

                  <!-- CONTENT -->
                <div class="p-8 flex flex-col flex-grow min-h-0">
  <div class="flex items-start justify-between gap-4">
    <h3 class="text-2xl font-serif text-slate-800 leading-snug min-h-[3.25rem]">
      ${p.name}
    </h3>
    <div class="text-right">
      <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Price</div>
      <div class="mt-1 text-lg font-extrabold text-handora-green whitespace-nowrap">
        ${formatVND(price)}
      </div>
    </div>
  </div>

<div class="mt-3 text-slate-500 text-sm desc-scroll scroll-smooth">
  ${desc}
</div>



                    <!-- SIZE SLOT (reserve height to align) -->
                    <!-- ✅ BOTTOM ZONE: SIZE + BUTTON cùng neo xuống đáy -->
<div class="mt-auto pt-5">
  <div class="card-variant-slot">
    ${
      variants.length
        ? `
      <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 mb-2">
        Size
      </div>

      <select
        onchange="setVariant('${p.id}', this.value)"
        class="select-pill"
      >
        ${variants.map((v: any) => `
          <option value="${String(v.size)}" ${String(v.size) === String(selSize) ? "selected" : ""}>
            ${String(v.size)} • ${formatVND(v.price)}
          </option>
        `).join("")}
      </select>
      `
        : `
      <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 mb-2 opacity-0">Size</div>
      <div class="select-pill opacity-0 pointer-events-none">—</div>
      `
    }
  </div>

  <button
    onclick="addToBag('${p.id}')"
    class="mt-6 w-full border-2 border-handora-green/20 text-handora-green py-4 rounded-2xl
           font-black text-[10px] uppercase tracking-[0.3em]
           hover:bg-handora-green hover:text-white transition-all"
  >
    Add to Bag
  </button>
</div>

                  </div>
                </div>
              `;
            }).join("");
          })()}
        </div>

        <div class="text-center mt-14">
          <button onclick="navigate('shop')"
            class="px-12 py-5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-slate-50 transition-all shadow-sm">
            View Full Collection
          </button>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-8">
        <div class="text-center mb-16 reveal-on-scroll">
          <span class="text-[10px] font-black uppercase tracking-[0.8em] text-handora-green mb-6 block">How it Works</span>
          <h2 class="text-6xl md:text-7xl font-serif text-handora-dark">
            A Simple <span class="italic text-handora-green">System</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          ${[
            ["01", "Choose your hand wash", "Select a gentle vegan hand wash that fits your daily hygiene routine."],
            ["02", "Use daily with confidence", "Formulated for frequent daily use while maintaining the skin’s natural barrier."],
            ["03", "Refill and reduce waste", "Refill-first packaging designed to support sustainable daily consumption."]
          ].map((s, i) => `
            <div class="reveal-on-scroll rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm hover:shadow-md transition-all"
                 style="transition-delay:${i * 110}ms">
              <div class="flex items-center justify-between">
                <div class="text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">Step</div>
                <div class="text-3xl font-serif text-handora-green">${s[0]}</div>
              </div>
              <h3 class="mt-6 text-3xl font-serif text-slate-800">${s[1]}</h3>
              <p class="mt-4 text-slate-500 leading-relaxed">${s[2]}</p>
              <div class="mt-8 h-[2px] w-12 bg-handora-green/30"></div>
            </div>
          `).join("")}
        </div>

        <div class="text-center mt-16 reveal-on-scroll">
          <button onclick="navigate('quiz')" class="btn-shimmer px-14 py-5 rounded-full text-white font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl">
            Try AI Skin Consult
          </button>
        </div>
      </div>
    </section>

    <!-- BLOG TEASER -->
    <section class="py-16 bg-handora-dark text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-handora-green/40 blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
        <div class="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-white/20 blur-3xl animate-[float_15s_ease-in-out_infinite]"></div>
      </div>

      <div class="container mx-auto px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-6 reveal-on-scroll">
            <span class="text-[10px] font-black uppercase tracking-[0.8em] text-white/70 mb-6 block">Blog</span>
            <h2 class="text-6xl md:text-7xl font-serif leading-none">
              Hand Care <span class="italic text-handora-green">Journal</span>
            </h2>
            <p class="mt-8 text-white/70 text-lg leading-relaxed max-w-xl">
              Short articles about vegan ingredients, gentle hand care routines.
            </p>
            <div class="mt-10">
              <button onclick="navigate('blogs')" class="px-12 py-5 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white/15 transition-all">
                Read Articles
              </button>
            </div>
          </div>

          <div class="lg:col-span-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              ${(state.blogs || []).slice(0, 2).map((b: any, i: number) => `
                <div class="reveal-on-scroll rounded-[34px] bg-white/5 border border-white/10 p-7 hover:bg-white/10 transition-all cursor-pointer"
                     onclick="openBlog('${b.id}')"
                     style="transition-delay:${i * 110}ms">
                  <div class="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">Featured</div>
                  <div class="mt-4 text-2xl font-serif">${b.title}</div>
                  <div class="mt-3 text-white/70">${b.excerpt}</div>
                  <div class="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-handora-green">
                    Read <span class="opacity-70">→</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-8">
        <div class="rounded-[60px] bg-handora-light/40 border border-slate-200 p-12 md:p-16 text-center reveal-on-scroll">
          <p class="text-[11px] font-black uppercase tracking-[0.45em] text-handora-green mb-6">
            Ready for a gentler daily hand care routine
          </p>

          <h2 class="text-5xl md:text-6xl font-serif text-handora-dark">
            Ready for a <span class="italic text-handora-green">cleaner</span> ritual?
          </h2>

          <p class="mt-6 text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our vegan hand wash collection or take a short quiz to find the most suitable option
            for your daily usage and skin needs.
          </p>

          <div class="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onclick="navigate('shop')"
              class="btn-shimmer px-14 py-5 rounded-full text-white font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl">
              Shop Now
            </button>

            <button
              onclick="navigate('quiz')"
              class="px-14 py-5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all shadow-sm">
              Skin & Washing Habit Quiz
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- local-only keyframes + fixes -->
    <style>
.scroll-smooth::-webkit-scrollbar { width: 6px; }
.scroll-smooth::-webkit-scrollbar-thumb { background: rgba(148,163,184,.45); border-radius: 999px; }
.scroll-smooth { scrollbar-width: thin; }


      @keyframes float {
        0%, 100% { transform: translate3d(0,0,0); }
        50% { transform: translate3d(0,-14px,0); }
      }
      @keyframes scrollDot {
        0% { transform: translateY(0); opacity: .4; }
        50% { transform: translateY(18px); opacity: 1; }
        100% { transform: translateY(0); opacity: .4; }
      }

      /* scroll description inside flex column */
.desc-scroll{
  flex: 1 1 auto;
  min-height: 0;
  max-height: 92px;          /* chỉnh số này để cao hơn/thấp hơn */
  overflow-y: auto;
  padding-right: 6px;        /* chừa chỗ scrollbar */
  line-height: 1.55;
}

/* optional: smoother on iOS */
.desc-scroll{
  -webkit-overflow-scrolling: touch;
}

      
      /* desc clamp + fixed height */
      .card-desc{
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
        min-height:4.5rem;
      }

      /* reserve slot size so cards align */
     .card-variant-slot{
  min-height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}


      /* select pill */
      .select-pill{
        width:100%;
        border:1px solid rgba(148, 163, 184, 0.55);
        background:rgba(255,255,255,0.75);
        border-radius:18px;
        padding:12px 14px;
        font-size:14px;
        outline:none;
        transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
      }
      .select-pill:focus{
        border-color: rgba(74,124,89,0.65);
        box-shadow:0 0 0 4px rgba(74,124,89,0.12);
      }

      /* favorite no-shift */
      .fav-btn{
        width:44px;height:44px;
        border-radius:999px;
        background: rgba(255,255,255,0.82);
        border:1px solid rgba(255,255,255,0.65);
        backdrop-filter: blur(10px);
        display:flex;align-items:center;justify-content:center;
        transition: transform .2s ease;
      }
      .fav-btn:hover{ transform: scale(1.08); }

      .fav-icon{ width:18px;height:18px; display:block; }
      .fav-icon path{
        transition: fill .18s ease, stroke .18s ease;
        stroke: rgba(148,163,184,0.9);
        fill: transparent;
      }
      .fav-btn.is-on .fav-icon path{
        stroke: rgba(239,68,68,1);
        fill: rgba(239,68,68,1);
      }
    </style>
  </div>
`;



export const renderShop = (state: any) => {
  const q = String(state.shopSearch || "").trim().toLowerCase();
  const category = state.shopCategory || "All";

  const favs: string[] = Array.isArray(state.favorites)
    ? state.favorites.map(String)
    : [];
  const isFav = (p: any) => favs.includes(String(p.id));

  // ✅ helpers (giống Home)
  const getSelectedSize = (p: any) => {
    const pid = String(p?.id);
    const variants = Array.isArray(p?.variants) ? p.variants : [];
    const stored = state.selectedVariants?.[pid];
    return String(stored || variants[0]?.size || "");
  };

  const getPickedVariant = (p: any) => {
    const variants = Array.isArray(p?.variants) ? p.variants : [];
    const sel = getSelectedSize(p);
    return variants.find((v: any) => String(v.size) === sel) || variants[0] || null;
  };

  const getPrice = (p: any) => {
    const v = getPickedVariant(p);
    return v ? Number(v.price || 0) : Number(p?.price || 0);
  };

  const getDesc = (p: any) => String(p?.description || p?.desc || "");

  // 1️⃣ FILTER (update desc)
  let filtered = [...(state.products || [])].filter((p: any) => {
    const name = String(p.name || "").toLowerCase();
    const desc = getDesc(p).toLowerCase();
    const cat = String(p.category || "");

    const matchQuery =
      !q || name.includes(q) || desc.includes(q) || cat.toLowerCase().includes(q);
    const matchCat = category === "All" || cat === category;

    return matchQuery && matchCat;
  });

  // 2️⃣ SORT (❤️ favorite trước, rồi sort theo option)
  filtered.sort((a: any, b: any) => {
    const af = isFav(a) ? 1 : 0;
    const bf = isFav(b) ? 1 : 0;
    if (af !== bf) return bf - af;

    const sa = String(a.name || "").toLowerCase();
    const sb = String(b.name || "").toLowerCase();

    // ✅ price theo variant đang chọn
    const pa = getPrice(a);
    const pb = getPrice(b);

    switch (state.shopSort) {
      case "price_asc":
        return pa - pb;
      case "price_desc":
        return pb - pa;
      case "name_asc":
        return sa.localeCompare(sb);
      case "name_desc":
        return sb.localeCompare(sa);
      case "default":
      default:
        return 0;
    }
  });

  const hasFilters =
    Boolean(state.shopSearch) ||
    state.shopCategory !== "All" ||
    state.shopSort !== "default";

  return `
  <section class="pt-44 pb-40 container mx-auto px-8">

    <!-- HEADER -->
    <div class="text-center mb-14 reveal-on-scroll">
      <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-slate-200 text-[10px] font-black uppercase tracking-[0.55em] text-handora-green shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-handora-green"></span>
        Shop
      </span>
      <h1 class="text-6xl md:text-7xl font-serif mt-8 text-handora-dark">
        The Ritual Collection
      </h1>
      <p class="max-w-2xl mx-auto mt-5 text-slate-400">
        Curated botanicals for daily hand rituals — cleanse, calm, and restore.
      </p>
    </div>

    <!-- SEARCH + FILTERS -->
    <div class="max-w-5xl mx-auto mb-12 reveal-on-scroll">
      <div class="rounded-[28px] bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-4 md:p-5">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">

          <!-- SEARCH -->
          <div class="md:col-span-6">
            <div class="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4">
              <input
                id="shop-search"
                type="text"
                placeholder="Search products..."
                value="${state.shopSearch || ""}"
                oninput="setShopSearch(this.value)"
                class="w-full bg-transparent outline-none text-slate-700"
              />
              ${
                state.shopSearch
                  ? `<button onclick="setShopSearch('')"
                      class="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase">
                      Clear
                    </button>`
                  : ``
              }
            </div>
          </div>

          <!-- CATEGORY -->
          <div class="md:col-span-3">
           <select
  onchange="setShopCategory(this.value)"
  class="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4"
>
  <option value="All" ${state.shopCategory === "All" ? "selected" : ""}>
    All Categories
  </option>

  <option
    value="Core Line – Daily Vegan Hand Wash"
    ${state.shopCategory === "Core Line – Daily Vegan Hand Wash" ? "selected" : ""}
  >
    Core Line
  </option>

  <option
    value="Sensitive Line – Gentle Hand Wash"
    ${state.shopCategory === "Sensitive Line – Gentle Hand Wash" ? "selected" : ""}
  >
    Sensitive Line
  </option>

  <option
    value="Eco Line – Refill Packs"
    ${state.shopCategory === "Eco Line – Refill Packs" ? "selected" : ""}
  >
    Eco Line
  </option>

  <option
    value="Lifestyle Line"
    ${state.shopCategory === "Lifestyle Line" ? "selected" : ""}
  >
    Lifestyle Line
  </option>
</select>

          </div>

          <!-- SORT -->
          <div class="md:col-span-3">
            <select
              onchange="setShopSort(this.value)"
              class="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4"
            >
              <option value="default" ${state.shopSort === "default" ? "selected" : ""}>Sort: Default</option>
              <option value="price_asc" ${state.shopSort === "price_asc" ? "selected" : ""}>Price ↑</option>
              <option value="price_desc" ${state.shopSort === "price_desc" ? "selected" : ""}>Price ↓</option>
              <option value="name_asc" ${state.shopSort === "name_asc" ? "selected" : ""}>Name A → Z</option>
              <option value="name_desc" ${state.shopSort === "name_desc" ? "selected" : ""}>Name Z → A</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between mt-4 text-sm text-slate-400">
          <span>${filtered.length} items</span>
          ${
            hasFilters
              ? `<button onclick="setShopSearch(''); setShopCategory('All'); setShopSort('default');"
                  class="text-[10px] font-black uppercase">
                  Reset Filters
                </button>`
              : ``
          }
        </div>
      </div>
    </div>

    ${
      filtered.length === 0
        ? `<p class="text-center text-slate-400">No products found.</p>`
        : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${filtered.map((p: any) => {
            const variants = Array.isArray(p?.variants) ? p.variants : [];
            const selSize = getSelectedSize(p);
            const price = getPrice(p);
            const desc = getDesc(p);

            return `
            <div class="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col border border-slate-100">
              <div class="aspect-[4/5] relative overflow-hidden">
                <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />

                <!-- FAVORITE (no shift like Home) -->
                <button
                  onclick="toggleFavorite('${p.id}')"
                  class="fav-btn absolute top-5 right-5 ${isFav(p) ? "is-on" : ""}"
                  title="Toggle favorite"
                >
                  <svg class="fav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s-7.2-4.4-9.6-8.2C.7 9.9 2.3 6.6 5.6 5.7 7.5 5.2 9.4 5.9 10.6 7c.5.5.9 1 1.4 1.7.5-.7.9-1.2 1.4-1.7 1.2-1.1 3.1-1.8 5-1.3 3.3.9 4.9 4.2 3.2 7.1C19.2 16.6 12 21 12 21z" stroke-width="1.8" />
                  </svg>
                </button>
              </div>

              <div class="p-8 flex flex-col flex-grow min-h-0">
                <div class="flex justify-between gap-3">
                  <h3 class="text-2xl font-serif text-slate-800 leading-snug">${p.name}</h3>
                  <div class="text-handora-green font-extrabold whitespace-nowrap">
                    ${formatVND(price)}
                  </div>
                </div>

    <div class="mt-3 text-slate-500 text-sm desc-scroll scroll-smooth">
  ${desc}
</div>



                <!-- ✅ BOTTOM ZONE: size + button neo xuống đáy -->
                <div class="mt-auto pt-5">
                  <div class="card-variant-slot">
                    ${
                      variants.length
                        ? `
                      <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 mb-2">
                        Size
                      </div>
                      <select
                        onchange="setVariant('${p.id}', this.value)"
                        class="select-pill"
                      >
                        ${variants.map((v: any) => `
                          <option value="${String(v.size)}" ${String(v.size) === String(selSize) ? "selected" : ""}>
                            ${String(v.size)} • ${formatVND(v.price)}
                          </option>
                        `).join("")}
                      </select>
                      `
                        : `
                      <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 mb-2 opacity-0">Size</div>
                      <div class="select-pill opacity-0 pointer-events-none">—</div>
                      `
                    }
                  </div>

                  <button
                    onclick="addToBag('${p.id}')"
                    class="mt-6 w-full border-2 border-handora-green/20 text-handora-green py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-handora-green hover:text-white transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
            `;
          }).join("")}
        </div>
        `
    }

    <!-- styles reused from Home -->
    <style>
.scroll-smooth::-webkit-scrollbar { width: 6px; }
.scroll-smooth::-webkit-scrollbar-thumb { background: rgba(148,163,184,.45); border-radius: 999px; }
.scroll-smooth { scrollbar-width: thin; }

.desc-scroll{
  flex: 1 1 auto;
  min-height: 0;
  max-height: 92px;      /* chỉnh cao/thấp theo ý */
  overflow-y: auto;
  padding-right: 6px;    /* chừa chỗ scrollbar */
  line-height: 1.55;
  -webkit-overflow-scrolling: touch;
}


      .card-desc{
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
        height:4.5rem; /* ✅ cố định để size thẳng hàng */
      }
      .card-variant-slot{ min-height:92px; }

      .select-pill{
        width:100%;
        border:1px solid rgba(148, 163, 184, 0.55);
        background:rgba(255,255,255,0.75);
        border-radius:18px;
        padding:12px 14px;
        font-size:14px;
        outline:none;
        transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
      }
      .select-pill:focus{
        border-color: rgba(74,124,89,0.65);
        box-shadow:0 0 0 4px rgba(74,124,89,0.12);
      }

      .fav-btn{
        width:44px;height:44px;
        border-radius:999px;
        background: rgba(255,255,255,0.82);
        border:1px solid rgba(255,255,255,0.65);
        backdrop-filter: blur(10px);
        display:flex;align-items:center;justify-content:center;
        transition: transform .2s ease;
      }
      .fav-btn:hover{ transform: scale(1.08); }

      .fav-icon{ width:18px;height:18px; display:block; }
      .fav-icon path{
        transition: fill .18s ease, stroke .18s ease;
        stroke: rgba(148,163,184,0.9);
        fill: transparent;
      }
      .fav-btn.is-on .fav-icon path{
        stroke: rgba(239,68,68,1);
        fill: rgba(239,68,68,1);
      }
    </style>
  </section>
  `;
};



export const renderAbout = (state: any) => `
  <div class="overflow-x-hidden">
    <!-- HERO -->
    <section class="pt-48 pb-24 container mx-auto px-8 text-center reveal-on-scroll">
      <span class="text-[10px] font-black uppercase tracking-[1em] text-handora-green mb-10 block">Discover Handora</span>
      <h1 class="text-8xl md:text-[10rem] font-serif leading-none text-handora-dark mb-12">
        About <span class="italic font-light text-handora-green">Us</span>
      </h1>
      <p class="text-2xl md:text-4xl font-serif italic text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Blending ancient plant intelligence with modern ethical standards.
      </p>
    </section>

    <!-- STORY -->
    <section class="relative min-h-[95vh] flex items-center mb-28 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="${banner1}"
          class="w-full h-full object-cover parallax-scroll scale-125"
          alt="Botanical Laboratory"
        />
        <div class="absolute inset-0 bg-handora-dark/70 backdrop-blur-[2px]"></div>
      </div>

      <div class="container mx-auto px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="glass-refined p-12 md:p-24 rounded-[72px] shadow-[0_50px_120px_rgba(0,0,0,0.5)] reveal-on-scroll">
            <span class="text-[11px] font-black uppercase tracking-[0.8em] text-handora-accent mb-7 block">The Handora Narrative</span>
            <h2 class="text-7xl md:text-8xl font-serif text-white mb-10 leading-none italic">
              Our <span class="font-light not-italic">Story</span>
            </h2>
            <div class="space-y-7 text-white/90 text-2xl leading-[1.7] font-light">
              <p class="reveal-mask">
                Handora was born in a hidden seaside sanctuary where the whispering leaves of pomelo trees inspired our founder to
                capture nature's silent intelligence.
              </p>
              <p class="reveal-mask delay-300">
                Through three years of meditative laboratory research, we perfected a cold-extraction ritual that honors the soul of
                the botanical world while delivering high-performance care for the modern individual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISSION + VISION -->
    <section class="py-32 bg-white">
      <div class="container mx-auto px-8">
        <div class="text-center mb-14 reveal-on-scroll">
          <span class="text-[10px] font-black uppercase tracking-[1em] text-handora-green mb-8 block">Purpose</span>
          <h2 class="text-7xl md:text-8xl font-serif text-handora-dark">
            Mission & <span class="italic text-handora-green">Vision</span>
          </h2>
          <p class="mt-8 text-slate-400 text-lg md:text-xl font-serif italic max-w-3xl mx-auto leading-relaxed">
            Everyday hygiene should never compromise skin health or ethical values.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <!-- Mission Card -->
          <div class="reveal-on-scroll">
            <div class="rounded-[44px] border border-slate-200 bg-white shadow-sm p-8 md:p-10 relative overflow-hidden">
              <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-handora-light/60 blur-2xl"></div>
              <div class="absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-handora-green/10 blur-2xl"></div>

              <div class="relative">
                <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                  <span class="text-base">🌿</span> Our Mission
                </div>

                <h3 class="mt-8 text-4xl md:text-5xl font-serif text-handora-dark leading-tight">
                  Gentle vegan care, made for every day.
                </h3>

                <p class="mt-7 text-slate-500 text-lg leading-relaxed">
                  HANDORA’s mission is to create vegan hand care products that are gentle on the skin and respectful to the environment,
                  designed for safe and comfortable daily use.
                </p>
                <p class="mt-5 text-slate-500 text-lg leading-relaxed">
                  We believe that everyday hygiene should never compromise skin health or ethical values.
                </p>

                <div class="mt-10 flex flex-wrap gap-2">
                  ${["100% Vegan", "Cruelty-Free", "Skin-Safe", "Everyday Comfort"]
                    .map(
                      (t) => `
                    <span class="px-4 py-2 rounded-full bg-handora-light/40 text-slate-700 text-[11px] font-black uppercase tracking-[0.25em] border border-slate-200">
                      ${t}
                    </span>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>

          <!-- Vision Card -->
          <div class="reveal-on-scroll">
            <div class="rounded-[44px] border border-slate-200 bg-handora-dark shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-8 md:p-10 relative overflow-hidden">
              <div class="absolute -top-28 -left-28 w-80 h-80 rounded-full bg-handora-green/20 blur-2xl"></div>
              <div class="absolute -bottom-32 -right-28 w-96 h-96 rounded-full bg-white/10 blur-2xl"></div>

              <div class="relative">
                <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-[0.5em] text-white/80">
                  <span class="text-base">🌱</span> Our Vision
                </div>

                <h3 class="mt-6 text-4xl md:text-5xl font-serif text-white leading-tight">
                  Vietnam’s leading vegan hand wash brand — and beyond.
                </h3>

                <p class="mt-5 text-white/80 text-lg leading-relaxed">
                  HANDORA aims to become a leading vegan hand wash brand in Vietnam, recognised for skin-safe formulations,
                  ethical production, and a strong commitment to sustainability.
                </p>
                <p class="mt-5 text-white/80 text-lg leading-relaxed">
                  In the long term, we seek to expand our personal care portfolio and build meaningful connections with consumers
                  through digital-first and data-driven experiences.
                </p>

                <div class="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${[
                    ["Ethical Production", "Responsible by design"],
                    ["Sustainability", "Refill-first mindset"],
                    ["Digital-First", "Modern retail experience"],
                    ["Data-Driven", "Personalized rituals"],
                  ]
                    .map(
                      ([a, b]) => `
                    <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div class="text-white font-extrabold">${a}</div>
                      <div class="text-white/70 text-sm mt-1">${b}</div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE VALUES (FIX SPACING HERE) -->
    <!-- was: py-28 -->
    <section class="pt-24 pb-14 bg-white">
      <!-- was: mb-16 -->
      <div class="container mx-auto px-8 text-center mb-12 reveal-on-scroll">
        <span class="text-[10px] font-black uppercase tracking-[1em] text-handora-green mb-8 block">What we stand for</span>
        <h2 class="text-7xl md:text-8xl font-serif text-handora-dark">
          Our Core <span class="italic text-handora-green">Values</span>
        </h2>
        <p class="mt-8 text-slate-400 text-lg md:text-xl font-serif italic max-w-3xl mx-auto leading-relaxed">
          A clear commitment to vegan ethics, skin safety, and sustainable design.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-[1600px] mx-auto">
        ${[
          {
            emoji: "🌿",
            title: "Vegan & Ethical",
            desc: "100% vegan and cruelty-free formulations, made with ethical responsibility and respect for life.",
          },
          {
            emoji: "🤍",
            title: "Skin-Friendly",
            desc: "Gentle formulas designed for frequent daily use, helping maintain the skin’s natural balance.",
          },
          {
            emoji: "♻️",
            title: "Sustainable",
            desc: "Refill-oriented packaging and reduced plastic usage to support responsible consumption.",
          },
          {
            emoji: "✨",
            title: "User-Centric",
            desc: "Thoughtfully designed products and digital experiences that put users first.",
          },
        ]
          .map(
            (v, i) => `
          <div class="p-9 bg-handora-light/30 rounded-[44px] border border-slate-200/60 reveal-on-scroll" style="transition-delay:${i * 110}ms">
            <div class="text-4xl mb-6">${v.emoji}</div>
            <h4 class="text-2xl font-bold uppercase tracking-widest text-slate-800 mb-4">${v.title}</h4>
            <p class="text-slate-500 text-lg leading-relaxed">${v.desc}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </section>

    <!-- COLLECTIVE (FIX SPACING HERE) -->
    <!-- was: py-32 -->
    <section class="pt-16 pb-24 container mx-auto px-8">
      <!-- was: mb-16 -->
      <div class="text-center mb-12 reveal-on-scroll">
        <span class="text-[10px] font-black uppercase tracking-[1.4em] text-handora-green mb-8 block">
          Management
        </span>
        <h2 class="text-7xl md:text-8xl font-serif text-handora-dark leading-none">
          The <span class="italic text-handora-green">Collective</span>
        </h2>
        <p class="mt-8 text-slate-400 text-lg md:text-xl font-serif italic max-w-3xl mx-auto leading-relaxed">
          A small group of specialists shaping every ritual — from extraction science to circular design.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 xl:gap-8 max-w-[1480px] mx-auto">
        ${state.TEAM
          ? state.TEAM
              .map(
                (m: any, i: number) => `
            <div class="group text-center reveal-on-scroll" style="transition-delay: ${i * 120}ms">
              <div class="relative w-44 h-44 md:w-48 md:h-48 mx-auto mb-8">
                <div class="absolute inset-0 rounded-[40%] border border-handora-green/20 rotate-45
                            group-hover:scale-115 group-hover:rotate-90 transition-all duration-[1.2s] ease-out"></div>

                <div class="absolute inset-0 rounded-[45%] border border-handora-accent/30 -rotate-12 scale-105
                            group-hover:scale-110 group-hover:rotate-45 transition-all duration-[1.1s] ease-out delay-75"></div>

                <div class="w-full h-full rounded-full overflow-hidden shadow-[0_20px_45px_rgba(74,124,89,0.25)]
                            relative z-10 portrait-clear transition-all duration-700">
                  <img
                    src="${m.img}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    alt="${m.name}"
                  />
                </div>
              </div>

              <h4 class="text-2xl md:text-3xl font-serif text-handora-dark mb-2
                         group-hover:text-handora-green transition-colors duration-400">
                ${m.name}
              </h4>

              <p class="text-[10px] font-black uppercase tracking-[0.45em] text-handora-green mb-6 opacity-70">
                ${m.role}
              </p>
            </div>
          `
              )
              .join("")
          : ""}
      </div>
    </section>
  </div>
`;


export const renderQuiz = (state: any) => {
  const escapeHtml = (s: string) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const step = Number(state.quizStep || 0); // 0..5
  const a = state.quizAnswers || {};
  const res = state.quizResult;

  const progressText = (n: number) => `${n}/4`;
  const progressBar = (n: number) => `
    <div class="mt-8">
      <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">
        <span>Progress</span><span>${progressText(n)}</span>
      </div>
      <div class="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div class="h-full bg-handora-green" style="width:${Math.round((n/4)*100)}%"></div>
      </div>
    </div>
  `;

  const radioBtn = (key: string, value: string) => {
    const active = String(a[key] || "") === value;
    return `
      <button
        onclick="pickQuizOption('${key}','${escapeHtml(value)}')"
        class="
          p-6 md:p-8 rounded-3xl border-2 text-left transition-all
          ${active ? "border-handora-green bg-handora-light" : "border-slate-100 bg-white hover:border-handora-green/40 hover:bg-slate-50"}
        "
      >
        <div class="flex items-center justify-between gap-4">
          <div class="font-extrabold text-handora-dark">${escapeHtml(value)}</div>
          <div class="w-6 h-6 rounded-full border-2 ${active ? "border-handora-green bg-handora-green" : "border-slate-200"}"></div>
        </div>
      </button>
    `;
  };

  const checkBtn = (value: string) => {
    const cur: string[] = Array.isArray(a.priorities) ? a.priorities : [];
    const active = cur.includes(value);
    return `
      <button
        onclick="toggleQuizPriority('${escapeHtml(value)}')"
        class="
          p-6 md:p-8 rounded-3xl border-2 text-left transition-all
          ${active ? "border-handora-green bg-handora-light" : "border-slate-100 bg-white hover:border-handora-green/40 hover:bg-slate-50"}
        "
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="font-extrabold text-handora-dark">${escapeHtml(value)}</div>
            <div class="text-xs text-slate-500 mt-1">${active ? "Selected" : "Tap to select"}</div>
          </div>
          <div class="w-6 h-6 rounded-xl border-2 flex items-center justify-center font-black ${active ? "border-handora-green bg-handora-green text-white" : "border-slate-200 text-transparent"}">✓</div>
        </div>
      </button>
    `;
  };

  const navBtns = (n: number, showNext: boolean = true) => `
    <div class="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
      <button onclick="prevQuiz()" class="px-10 py-4 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:bg-slate-50 transition-all">
        Back
      </button>
      ${showNext ? `
        <button onclick="nextQuiz()" class="btn-shimmer text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
          ${n === 4 ? "See Result" : "Next"}
        </button>
      ` : ""}
    </div>
  `;

  // RESULT rendering helpers
  const renderResult = () => {
    if (!res?.main) return `<p class="text-slate-500">No result.</p>`;

    const main = res.main;
    const mainVariants = Array.isArray(main.variants) ? main.variants : [];
    const selectedSize = String(state.quizSelectedSize || res.mainPicked?.size || "");
    const selectedVariant = mainVariants.find((v:any) => String(v.size) === selectedSize) || res.mainPicked;

    const line =
      String(main.category || "").includes("Sensitive") ? "Sensitive Line" :
      String(main.category || "").includes("Eco") ? "Eco Line" :
      String(main.category || "").includes("Lifestyle") ? "Lifestyle Line" :
      "Core Line";

    const sizeToggles = mainVariants.map((v:any) => {
      const active = String(v.size) === selectedSize;
      return `
        <button onclick="setResultVariant('${escapeHtml(String(v.size))}')"
          class="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.35em] transition-all
            ${active ? "bg-handora-green text-white shadow-lg shadow-handora-green/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}
          ">
          ${escapeHtml(String(v.size))}
        </button>
      `;
    }).join("");

    const addon = res.addon;
    const addonPicked = res.addonPicked;
    const addonLine =
      addon
        ? (String(addon.category || "").includes("Eco") ? "Eco Line" :
           String(addon.category || "").includes("Lifestyle") ? "Lifestyle Line" :
           "Add-on")
        : "";

    return `
      <div class="text-left">
        <div class="text-center">
          <p class="text-[10px] font-black uppercase tracking-[0.6em] text-handora-green">Your Recommended Match</p>
          <h2 class="mt-4 text-3xl md:text-5xl font-serif text-handora-dark">${escapeHtml(main.name)}</h2>
          <p class="mt-3 text-slate-500">${escapeHtml(line)} • ${escapeHtml(main.keyIngredient)} • ${escapeHtml(main.scent)}</p>
        </div>

        <div class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- MAIN CARD -->
          <div class="lg:col-span-7 rounded-[44px] bg-white border border-slate-100 shadow-xl p-8">
            <div class="flex items-start gap-6">
              <img src="${main.img}" class="w-24 h-24 rounded-[28px] object-cover border border-slate-100 shadow-sm" />
              <div class="min-w-0">
                <div class="text-xs text-slate-400 font-black uppercase tracking-[0.35em]">${escapeHtml(main.category)}</div>
                <div class="mt-2 text-sm text-slate-600 leading-relaxed">${escapeHtml(main.description || "")}</div>
              </div>
            </div>

            <div class="mt-7">
              <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Choose size</div>
              <div class="mt-3 flex flex-wrap gap-2">${sizeToggles}</div>
            </div>

            <div class="mt-7 flex items-end justify-between gap-6">
              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Price</div>
                <div class="mt-2 text-3xl font-extrabold text-handora-green">
                  ${formatVND(Number(selectedVariant?.price || 0))}
                </div>
              </div>

              <div class="flex gap-3">
                <button onclick="viewResultProduct()"
                  class="px-8 py-4 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:bg-slate-50 transition-all">
                  View Product
                </button>
                <button onclick="addResultToCart()"
                  class="btn-shimmer text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                  Add to Cart
                </button>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-100">
              <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Why this fits you</div>
              <ul class="mt-4 space-y-2 text-sm text-slate-600">
                ${(res.bullets || []).slice(0,3).map((t:string)=>`
                  <li class="flex gap-3">
                    <span class="w-2 h-2 rounded-full bg-handora-green mt-2"></span>
                    <span>${escapeHtml(t)}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>

          <!-- ADDON CARD -->
          ${
            addon
              ? `
            <div class="lg:col-span-5 rounded-[44px] bg-slate-50 border border-slate-200 p-8">
              <div class="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Add-on (optional)</div>
              <h3 class="mt-3 text-2xl font-serif text-handora-dark">${escapeHtml(addon.name)}</h3>
              <p class="mt-2 text-slate-500 text-sm">${escapeHtml(addonLine)} • ${escapeHtml(addon.keyIngredient || "")}</p>

              <div class="mt-5 flex items-center gap-4">
                <img src="${addon.img}" class="w-20 h-20 rounded-[24px] object-cover border border-slate-200" />
                <div class="min-w-0">
                  <div class="text-sm text-slate-600">${escapeHtml(addon.description || "")}</div>
                  ${
                    addonPicked
                      ? `<div class="mt-3 text-2xl font-extrabold ${res.addonType === "refill" ? "text-handora-green" : "text-slate-700"}">
                          ${formatVND(Number(addonPicked.price || 0))}
                        </div>
                        <div class="text-xs text-slate-400 font-black uppercase tracking-[0.35em]">${escapeHtml(addonPicked.size || "")}</div>`
                      : ""
                  }
                </div>
              </div>

              <button onclick="addAddonBundle()"
                class="mt-8 w-full btn-shimmer text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                Add Bundle
              </button>
            </div>
          `
              : ""
          }
        </div>

        <div class="mt-10 text-center">
          <button onclick="startQuiz()"
            class="px-10 py-4 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:bg-slate-50 transition-all">
            Retake Quiz
          </button>
        </div>
      </div>
    `;
  };

  // ----- screens -----
  const screenIntro = `
    <div class="text-center">
      <p class="text-[10px] font-black uppercase tracking-[0.6em] text-handora-green">Skin & Washing Habit Quiz</p>
      <h1 class="mt-5 text-4xl md:text-6xl font-serif text-handora-dark">
        Find Your Best <span class="italic font-light text-handora-green">Vegan Hand Wash</span> Match
      </h1>
      <p class="mt-6 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Answer a few quick questions to get a recommendation based on your daily washing habit and skin needs.
      </p>
      ${progressBar(0)}
      <div class="mt-10">
        <button onclick="startQuiz()" class="btn-shimmer text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
          Start Quiz
        </button>
      </div>
    </div>
  `;

  const screenQ1 = `
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-serif text-handora-dark">How often do you wash your hands each day?</h2>
      <p class="mt-3 text-slate-500">Choose one option.</p>
      ${progressBar(1)}
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        ${radioBtn("wash_frequency", "Less than 5 times")}
        ${radioBtn("wash_frequency", "5–10 times")}
        ${radioBtn("wash_frequency", "More than 10 times")}
      </div>
      ${navBtns(1)}
    </div>
  `;

  const screenQ2 = `
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-serif text-handora-dark">How does your skin feel after frequent handwashing?</h2>
      <p class="mt-3 text-slate-500">Choose one option.</p>
      ${progressBar(2)}
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        ${radioBtn("skin_condition", "Normal and comfortable")}
        ${radioBtn("skin_condition", "Slightly dry")}
        ${radioBtn("skin_condition", "Very dry or tight")}
        ${radioBtn("skin_condition", "Easily irritated or sensitive")}
      </div>
      ${navBtns(2)}
    </div>
  `;

  const screenQ3 = `
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-serif text-handora-dark">Which scent do you prefer?</h2>
      <p class="mt-3 text-slate-500">Choose one option.</p>
      ${progressBar(3)}
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        ${radioBtn("scent_preference", "Fresh citrus")}
        ${radioBtn("scent_preference", "Mild herbal")}
        ${radioBtn("scent_preference", "Light green tea")}
        ${radioBtn("scent_preference", "No fragrance")}
      </div>
      ${navBtns(3)}
    </div>
  `;

  const screenQ4 = `
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-serif text-handora-dark">What matters most to you when choosing a hand wash?</h2>
      <p class="mt-3 text-slate-500">Select up to 2 priorities.</p>
      ${progressBar(4)}
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        ${checkBtn("Gentle for frequent daily use")}
        ${checkBtn("Moisturizing and comfortable skin feel")}
        ${checkBtn("Fragrance-free option")}
        ${checkBtn("Plant-based vegan ingredients")}
        ${checkBtn("Refill-first sustainable packaging")}
      </div>
      ${navBtns(4)}
    </div>
  `;

  const content =
    step === 0 ? screenIntro :
    step === 1 ? screenQ1 :
    step === 2 ? screenQ2 :
    step === 3 ? screenQ3 :
    step === 4 ? screenQ4 :
    renderResult();

  return `
    <section class="pt-48 pb-40">
      <div class="container mx-auto px-8 max-w-5xl">
        <div id="quiz-container" class="bg-white p-10 md:p-16 rounded-[70px] shadow-2xl border border-handora-light">
          ${content}
        </div>
      </div>
    </section>
  `;
};


export const renderCart = (state: any) => {
  const cart = Array.isArray(state.cart) ? state.cart : [];

  const getItemSize = (item: any) =>
    String(item?.size || item?.variant?.size || item?.selectedSize || "");

  const getUnitPrice = (item: any) => {
    // ưu tiên price theo variant nếu có
    const vPrice = item?.variant?.price;
    if (vPrice != null && !Number.isNaN(Number(vPrice))) return Number(vPrice);

    const p = item?.price;
    return !Number.isNaN(Number(p)) ? Number(p) : 0;
  };

  const getLineTotal = (item: any) => {
    const qty = Number(item?.qty || 1);
    return getUnitPrice(item) * (Number.isFinite(qty) ? qty : 1);
  };

  const total = cart.reduce((s: number, it: any) => s + getLineTotal(it), 0);

  return `
  <section class="pt-48 pb-40 container mx-auto px-8 max-w-5xl">
    <!-- header -->
    <div class="mb-14 text-center reveal-on-scroll">
      <span class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 border border-slate-200 text-[10px] font-black uppercase tracking-[0.55em] text-handora-green shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-handora-green"></span>
        Cart
      </span>
      <h1 class="text-6xl md:text-7xl font-serif mt-8 text-handora-dark">Your Ritual Items</h1>
      <p class="mt-4 text-slate-400">
        Review your selection, confirm size, and complete the ritual.
      </p>
    </div>

    ${
      cart.length === 0
        ? `
        <div class="rounded-[44px] border border-slate-200 bg-white/70 backdrop-blur p-14 text-center shadow-sm">
          <p class="text-slate-400 italic text-xl">The ritual bag is currently empty.</p>
          <button onclick="navigate('shop')" class="mt-10 px-12 py-5 rounded-full bg-handora-green text-white text-[10px] font-black uppercase tracking-[0.35em] shadow-lg hover:shadow-xl transition-all">
            Explore Products
          </button>
        </div>
        `
        : `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- items -->
          <div class="lg:col-span-8 space-y-5">
            ${cart
              .map((item: any, i: number) => {
                const size = getItemSize(item);
                const unit = getUnitPrice(item);
                const qty = Number(item?.qty || 1);
                const line = getLineTotal(item);

                return `
                <div class="cart-row reveal-on-scroll rounded-[44px] bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-6 md:p-8">
                  <div class="flex gap-6 items-center">
                    <img src="${item.img}" class="w-20 h-20 md:w-24 md:h-24 rounded-3xl object-cover border border-slate-100" />

                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-4">
                        <div class="min-w-0">
                          <p class="text-xl md:text-2xl font-serif text-handora-dark truncate">${item.name}</p>

                          <div class="mt-2 flex flex-wrap items-center gap-2">
                            ${
                              size
                                ? `<span class="size-pill">Size: <b>${size}</b></span>`
                                : `<span class="size-pill opacity-60">Standard</span>`
                            }
                            <span class="meta-pill">Unit: <b>${formatVND(unit)}</b></span>
                          </div>
                        </div>

                        <div class="text-right">
                          <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Line</div>
                          <div class="mt-1 text-lg font-extrabold text-handora-green whitespace-nowrap">
                            ${formatVND(line)}
                          </div>
                        </div>
                      </div>

                      <!-- controls -->
                      <div class="mt-5 flex items-center justify-between gap-4">
                      

                        <div class="qty-wrap" aria-label="Quantity">
                          <button onclick="removeFromBag(${i})" class="qty-btn" title="Decrease">−</button>
                          <div class="qty-value">${Number.isFinite(qty) ? qty : 1}</div>
                          <button onclick="addToBag('${item.id}')" class="qty-btn is-plus" title="Increase">+</button>
                        </div>

                       <button onclick="removeLineByKey('${item.key}')" class="trash-btn">Remove</button>

                      </div>
                    </div>
                  </div>
                </div>
                `;
              })
              .join("")}
          </div>

          <!-- summary -->
          <aside class="lg:col-span-4">
            <div class="reveal-on-scroll rounded-[44px] bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-8 sticky top-32">
              <div class="text-[10px] font-black uppercase tracking-[0.55em] text-slate-400">Summary</div>
              <div class="mt-6 space-y-3 text-slate-600">
                <div class="flex justify-between">
                  <span>Items</span>
                  <b class="text-handora-dark">${cart.reduce((s: number, it: any) => s + Number(it?.qty || 1), 0)}</b>
                </div>
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <b class="text-handora-dark">${formatVND(total)}</b>
                </div>              
              </div>

              <div class="mt-6 h-px bg-slate-200"></div>

              <div class="mt-6 flex items-end justify-between">
                <div>
                  <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Total</div>
                  <div class="mt-1 text-3xl font-serif text-handora-dark">${formatVND(total)}</div>
                </div>
              </div>

              <button
                onclick="handleCheckout()"
                class="mt-8 w-full btn-shimmer text-white py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.35em] shadow-xl"
              >
                Complete Ritual
              </button>

              <button
                onclick="navigate('shop')"
                class="mt-3 w-full py-5 rounded-3xl bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-slate-50 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </aside>
        </div>

        <style>
          /* pills */
          .size-pill, .meta-pill{
            display:inline-flex;
            align-items:center;
            gap:6px;
            padding:8px 12px;
            border-radius:999px;
            border:1px solid rgba(226,232,240,1);
            background:rgba(248,250,252,0.85);
            font-size:12px;
            color:rgba(71,85,105,1);
          }
          .size-pill b, .meta-pill b{ color: rgba(15,23,42,1); }

          /* qty control */
          .qty-wrap{
            display:flex;
            align-items:center;
            border:1px solid rgba(226,232,240,1);
            background:rgba(248,250,252,0.9);
            border-radius:999px;
            padding:6px;
            gap:6px;
            min-width: 168px;
            justify-content:space-between;
          }
          .qty-btn{
            width:40px;height:40px;
            border-radius:999px;
            border:1px solid rgba(226,232,240,1);
            background:white;
            display:flex;align-items:center;justify-content:center;
            font-weight:900;
            color:rgba(71,85,105,1);
            transition: transform .15s ease, box-shadow .15s ease;
          }
          .qty-btn:hover{ transform: scale(1.04); box-shadow:0 10px 25px rgba(15,23,42,.08); }
          .qty-btn.is-plus{
            background: rgba(74,124,89,1);
            border-color: rgba(74,124,89,1);
            color:white;
          }
          .qty-value{
            width:44px;
            text-align:center;
            font-weight:900;
            color:rgba(15,23,42,1);
          }

          /* remove buttons */
          .remove-btn{
            width:44px;height:44px;
            border-radius:999px;
            border:1px solid rgba(226,232,240,1);
            background:rgba(248,250,252,0.9);
            color: rgba(239,68,68,1);
            font-weight:900;
            display:flex;align-items:center;justify-content:center;
            transition: transform .15s ease;
          }
          .remove-btn:hover{ transform: scale(1.04); }

          .trash-btn{
            padding:12px 14px;
            border-radius:999px;
            border:1px solid rgba(226,232,240,1);
            background:white;
            font-size:12px;
            font-weight:900;
            text-transform:uppercase;
            letter-spacing:.18em;
            color: rgba(100,116,139,1);
            transition: background .15s ease, transform .15s ease;
            white-space:nowrap;
          }
          .trash-btn:hover{ background: rgba(248,250,252,1); transform: translateY(-1px); }
        </style>
        `
    }
  </section>
  `;
};


// views/blogs.ts

const esc = (s: any) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const withFallbackImg = (img?: string) =>
  img ||
  "https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=1600";

const card = (b: any, i: number) => `
  <article
    class="group bg-white rounded-[34px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all reveal-on-scroll"
    style="transition-delay:${(i % 9) * 70}ms"
  >
    <div class="relative overflow-hidden">
      <img
        src="${withFallbackImg(b.img)}"
        class="w-full h-52 object-cover transition-transform duration-[1800ms] group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80"></div>

      <div class="absolute left-5 top-5 flex items-center gap-2">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-[9px] font-black uppercase tracking-[0.45em] text-handora-dark">
          <span class="w-2 h-2 rounded-full bg-handora-green"></span>
          ${esc(b.tag || "ritual")}
        </span>
      </div>

      <div class="absolute right-5 bottom-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <button
          onclick="openBlog('${esc(b.id)}')"
          class="px-6 py-3 rounded-2xl bg-white/75 backdrop-blur-md border border-white/40 text-[10px] font-black uppercase tracking-[0.35em] text-handora-dark hover:bg-white transition-all"
        >
          Read
        </button>
      </div>
    </div>

    <div class="p-7">
      <h3 class="text-xl font-serif text-handora-dark leading-snug mb-2.5 group-hover:text-handora-green transition-colors duration-500">
        ${esc(b.title)}
      </h3>

      <p class="text-slate-500 text-sm leading-relaxed">
        ${esc(b.excerpt || "")}
      </p>

      <div class="mt-6 flex items-center justify-between">
        <button
          onclick="openBlog('${esc(b.id)}')"
          class="text-[10px] font-black uppercase tracking-[0.45em] text-handora-green hover:underline"
        >
          Read Article
        </button>
        <div class="w-10 h-10 rounded-full bg-handora-green/10 flex items-center justify-center text-handora-green font-black group-hover:scale-110 transition-transform">
          →
        </div>
      </div>
    </div>
  </article>
`;

export const renderBlogs = (state: any) => {
  // newest first
  const blogs = (state.blogs || []).slice().reverse();
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return `
  <section class="pt-32 pb-28 container mx-auto px-8">

    <!-- PAGE INTRO / TITLE -->
    <div class="mb-10 reveal-on-scroll">
      <div class="relative overflow-hidden rounded-[52px] bg-white border border-slate-100 shadow-2xl">
        <!-- soft blobs -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-handora-green/10 blur-[80px]"></div>
          <div class="absolute -bottom-28 -left-28 w-[620px] h-[620px] rounded-full bg-handora-accent/10 blur-[90px]"></div>
        </div>

        <div class="relative p-10 md:p-12">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div class="max-w-3xl">
              <span class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-handora-green/10 text-handora-green text-[10px] font-black uppercase tracking-[0.6em]">
                <span class="w-2 h-2 rounded-full bg-handora-green"></span>
                Handora Journal
              </span>

              <h1 class="text-5xl md:text-6xl font-serif text-handora-dark leading-tight mt-6">
                Botanical <span class="italic font-light text-handora-green">Stories</span>,<br/>
                Slow <span class="italic font-light text-handora-green">Rituals</span>.
              </h1>

              <p class="text-slate-500 text-base md:text-lg mt-5 leading-relaxed max-w-2xl">
                Nơi tụi mình ghi lại công thức, thói quen, ingredient notes — để bạn chăm tay theo cách “high-end” nhưng nhẹ nhàng.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onclick="document.getElementById('featured')?.scrollIntoView({behavior:'smooth'})"
                  class="btn-shimmer px-9 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
                >
                  Explore Featured
                </button>

                <button
                  onclick="navigate('shop')"
                  class="px-9 py-4 rounded-2xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all"
                >
                  Shop Rituals
                </button>
              </div>

              <div class="mt-6 flex items-center gap-5 text-slate-400 text-sm">
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-handora-green"></span> Science</div>
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-handora-accent"></span> Ritual</div>
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-300"></span> Sustainability</div>
              </div>
            </div>

            <!-- LATEST MINI CARD -->
            <div class="w-full lg:w-[420px]">
              <div class="group relative rounded-[42px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.16)] border border-white/10 reveal-on-scroll">
                <div class="relative h-[380px]">
                  <img
                    src="${withFallbackImg(featured?.img)}"
                    class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[2200ms] group-hover:scale-110"
                    alt="Latest"
                  />

                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5"></div>
                  <div class="absolute inset-0 bg-gradient-to-tr from-handora-dark/40 via-transparent to-handora-green/20 opacity-80"></div>

                  <div class="absolute left-6 top-6">
                    <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.55em] text-white">
                      <span class="w-2 h-2 rounded-full bg-handora-accent"></span>
                      Latest
                    </span>
                  </div>

                  <div class="absolute inset-x-0 bottom-0 p-7">
                    <h3 class="text-[24px] md:text-[30px] leading-[1.18] font-semibold tracking-[-0.01em] text-white/90 max-w-[26ch]">
                      ${blogs.length ? esc(featured?.title || "") : "No articles yet."}
                    </h3>

                    <div class="mt-7 flex items-center gap-4">
                      ${
                        blogs.length
                          ? `
                        <button
                          onclick="openBlog('${esc(featured?.id)}')"
                          class="btn-shimmer px-9 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
                        >
                          Read Now
                        </button>
                        `
                          : `
                        <button
                          onclick="navigate('admin')"
                          class="px-9 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/15 transition-all"
                        >
                          Go Admin
                        </button>
                        `
                      }
                    </div>

                    <div class="mt-8 flex items-center justify-between text-white/60 text-xs uppercase tracking-widest">
                      <span>${esc(featured?.tag || "ritual")}</span>
                      <span class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-handora-green"></span>
                        Handora Journal
                      </span>
                    </div>
                  </div>

                  <div class="pointer-events-none absolute -inset-y-10 -left-40 w-40 bg-white/20 rotate-12 blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[900px] transition-all duration-[1400ms]"></div>
                </div>
              </div>
            </div>
            <!-- /Latest -->
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURED -->
    <div id="featured" class="mb-10 reveal-on-scroll">
      <div class="flex items-end justify-between mb-6">
        <div>
          <span class="block text-[10px] font-black uppercase tracking-[0.6em] text-handora-green mb-2">
            Curated
          </span>
          <h2 class="text-4xl md:text-5xl font-serif text-handora-dark">
            Featured <span class="italic text-handora-green">Stories</span>
          </h2>
        </div>
        <p class="text-slate-400 text-sm">${blogs.length} total</p>
      </div>

${
  featured
    ? `
<div class="group relative overflow-hidden rounded-[38px] bg-white border border-slate-100 shadow-lg h-[500px] lg:h-[500px]">
  <div class="grid grid-cols-1 lg:grid-cols-2 h-full">

    <!-- IMAGE -->
    <div class="relative overflow-hidden h-[500px] lg:h-full">
      <img
        src="${withFallbackImg(featured.img)}"
        class="w-full h-full object-cover transition-transform duration-[1800ms] group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/0 to-black/10"></div>

      <div class="absolute left-5 bottom-5">
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-white/40 text-[9px] font-black uppercase tracking-[0.42em] text-handora-dark">
          <span class="w-2 h-2 rounded-full bg-handora-green"></span>
          Featured
        </span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-6 flex flex-col h-full">
      <h3 class="text-xl md:text-2xl font-serif text-handora-dark leading-snug line-clamp-2">
        ${esc(featured.title)}
      </h3>

      <p class="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">
        ${esc(featured.excerpt || "")}
      </p>

      <div class="mt-4">
        <button
          onclick="openBlog('${esc(featured.id)}')"
          class="btn-shimmer px-7 py-3 rounded-xl text-white text-[9px] font-black uppercase tracking-[0.33em] shadow-md"
        >
          Read Article
        </button>
      </div>

      <div class="mt-auto pt-3 flex items-center justify-between text-slate-400 text-[10px]">
        <div class="flex items-center gap-2">
          <span class="inline-block w-7 h-7 rounded-full bg-handora-green/10 flex items-center justify-center text-handora-green font-black">
            H
          </span>
          <div>
            <div class="text-slate-600 font-bold">Handora</div>
            <div class="text-slate-400">Editorial</div>
          </div>
        </div>

        <div class="uppercase tracking-widest">
          ${esc(featured.tag || "ritual")}
        </div>
      </div>
    </div>

  </div>
</div>
`
    : `
<div class="p-7 rounded-[30px] bg-slate-50 border border-slate-200 text-slate-500">
  No featured article yet.
</div>
`
}



    </div>

    <!-- GRID -->
    <div id="blogs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      ${rest.map((b: any, i: number) => card(b, i)).join("")}
      ${blogs.length === 0 ? `<p class="text-slate-500">No articles yet.</p>` : ""}
    </div>

  </section>
`;
};

export const renderBlog = (state: any) => {
  const id = state.currentBlogId || state.currentBlog || null;
  const b = (state.blogs || []).find((x: any) => x.id === id) || null;

  if (!b) return `
    <section class="pt-32 pb-28 container mx-auto px-8">
      <div class="max-w-3xl mx-auto bg-white rounded-[36px] border border-slate-100 shadow-xl p-9 reveal-on-scroll">
        <p class="text-slate-500">Article not found.</p>
        <div class="mt-7">
          <button onclick="navigate('blogs')" class="btn-shimmer px-8 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
            Back to Articles
          </button>
        </div>
      </div>
    </section>
  `;

  const readTime = b.content
    ? Math.max(1, Math.ceil(String(b.content).split(/\s+/).length / 200))
    : 1;

  const dateText = b.date ? esc(b.date) : "";
  const tagText = esc(b.tag || "journal");

  return `
  <section class="pt-28 pb-24">
    <div class="container mx-auto px-8 max-w-4xl">

      <!-- HERO IMAGE -->
      <div class="relative overflow-hidden rounded-[44px] border border-slate-100 bg-white shadow-2xl reveal-on-scroll">
        <div class="relative h-[300px] md:h-[420px] overflow-hidden">
          <img
            src="${withFallbackImg(b.img)}"
            alt="${esc(b.title)}"
            class="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

          <!-- TOP BAR -->
          <div class="absolute left-6 right-6 top-6 flex items-center justify-between gap-3">
            <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.55em] text-white">
              <span class="w-2 h-2 rounded-full bg-handora-accent"></span>
              ${tagText}
            </span>

            <button
              onclick="navigate('blogs')"
              class="px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.45em] text-white hover:bg-white/20 transition-all"
            >
              Back
            </button>
          </div>

          <!-- TITLE -->
          <div class="absolute inset-x-0 bottom-0 p-7 md:p-9">
            <div class="text-white/70 text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3">
              <span>${readTime} min read</span>
              ${dateText ? `<span class="opacity-60">•</span><span>${dateText}</span>` : ``}
            </div>

            <h1 class="mt-4 text-[28px] md:text-[42px] leading-[1.08] font-semibold tracking-[-0.01em] text-white/90 max-w-[26ch]">
              ${esc(b.title)}
            </h1>

            ${
              b.excerpt
                ? `
              <p class="mt-3 text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                ${esc(b.excerpt)}
              </p>
              `
                : ``
            }
          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="mt-8 bg-white rounded-[36px] border border-slate-100 shadow-sm p-7 md:p-10 reveal-on-scroll">
        <div class="
          prose prose-lg max-w-none
          prose-headings:font-serif
          prose-headings:text-handora-dark
          prose-p:text-slate-600
          prose-strong:text-slate-800
          prose-a:text-handora-green
          prose-a:font-bold
          prose-blockquote:border-handora-green
          prose-blockquote:text-slate-600
        ">
          ${b.content || ""}
        </div>

        <div class="mt-10 pt-7 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            onclick="navigate('blogs')"
            class="px-8 py-4 rounded-2xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all"
          >
            Back to Articles
          </button>

          <button
            onclick="navigate('shop')"
            class="btn-shimmer px-8 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
          >
            Shop Rituals
          </button>
        </div>
      </div>

    </div>
  </section>
  `;
};





export const renderAdmin = (state: any) => {

const escapeHtml = (s: string) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const uniq = (arr: any[]) =>
  Array.from(new Set(arr.map(x => String(x || "").trim()).filter(Boolean)));

const productPool = Array.isArray(state.products) ? state.products : [];
const categoryOptions = uniq(productPool.map((p: any) => p.category));
const keyIngredientOptions = uniq(productPool.map((p: any) => p.keyIngredient));
const scentOptions = uniq(productPool.map((p: any) => p.scent));
const targetOptions = uniq(productPool.map((p: any) => p.target));

const opt = (list: string[], selected?: string) =>
  list
    .map(
      v =>
        `<option value="${escapeHtml(v)}" ${
          v === selected ? "selected" : ""
        }>${escapeHtml(v)}</option>`
    )
    .join("");

  const tab = state.adminTab || "dashboard";
  const editingProduct = state.editingId
    ? state.products.find((p: any) => p.id === state.editingId)
    : null;
  const editingBlog = state.editingBlogId
    ? (state.blogs || []).find((b: any) => b.id === state.editingBlogId)
    : null;

  const productsCount = state.products?.length || 0;
  const blogsCount = (state.blogs || []).length;
  const ordersCount = (state.orders || []).length;

  const tabBtn = (key: string, label: string) => `
    <button
      onclick="state.adminTab='${key}'; renderApp();"
      class="
        px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.35em]
        transition-all
        ${tab === key
          ? "bg-handora-green text-white shadow-lg shadow-handora-green/20"
          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}
      "
    >
      ${label}
    </button>
  `;

  return `
  <section class="pt-44 pb-40">
    <div class="container mx-auto px-8 max-w-6xl">

      <!-- HEADER -->
      <div class="relative overflow-hidden rounded-[56px] bg-white border border-slate-100 shadow-2xl mb-10 reveal-on-scroll">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full bg-handora-green/10 blur-[90px]"></div>
          <div class="absolute -bottom-32 -left-32 w-[620px] h-[620px] rounded-full bg-handora-accent/10 blur-[100px]"></div>
        </div>

        <div class="relative p-10 md:p-12">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div class="max-w-3xl">
              <span class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-handora-green/10 text-handora-green text-[10px] font-black uppercase tracking-[0.6em]">
                <span class="w-2 h-2 rounded-full bg-handora-green"></span>
                Control Panel
              </span>

              <h1 class="mt-7 text-4xl md:text-6xl font-serif text-handora-dark leading-[1.05]">
                Admin <span class="italic font-light text-handora-green">Dashboard</span>
              </h1>

              <p class="mt-4 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
                Quản lý sản phẩm, bài viết và đơn hàng — giao diện “high-end”, thao tác nhanh.
              </p>
            </div>            
          </div>

          <!-- TABS -->
          <div class="mt-10 flex flex-wrap gap-3">
            ${tabBtn("dashboard", "Dashboard")}
            ${tabBtn("products", "Products")}
            ${tabBtn("blogs", "Blogs")}
          </div>
        </div>

        <div class="pointer-events-none absolute -inset-y-10 -left-40 w-40 bg-white/25 rotate-12 blur-xl opacity-0 hover:opacity-100 hover:translate-x-[1200px] transition-all duration-[1400ms]"></div>
      </div>

      <!-- BODY CARD -->
      <div class="bg-white rounded-[56px] border border-slate-100 shadow-2xl p-8 md:p-10 animate-reveal">

        <!-- DASHBOARD -->
        ${
          tab === "dashboard"
            ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-7">
              <div class="rounded-[36px] bg-slate-50 border border-slate-200 p-8">
                <h2 class="text-2xl md:text-3xl font-serif text-handora-dark">Recent Orders</h2>
                <p class="mt-2 text-slate-500 text-sm">Theo dõi nhanh 5 đơn gần nhất.</p>

                <div class="mt-6 space-y-3">
                  ${
  (state.orders || []).map((o: any) => {
    const email = o.customer?.email || "—";
    const phone = o.customer?.phone || "—";
    const address = o.customer?.address || o.address || "—";
    const total = Number(o.total || 0);
    const isFake = !!o.isFake;

    return `
      <div class="group p-6 bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-start justify-between gap-6">
          <div class="min-w-0">
            <div class="text-sm font-extrabold text-handora-dark">
              Order <span class="text-slate-500 font-semibold">${o.id || "—"}</span>
            </div>

            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Email</div>
                <div class="mt-1 font-semibold text-slate-700 break-all">${email}</div>
              </div>

              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Phone</div>
                <div class="mt-1 font-semibold text-slate-700">${phone}</div>
              </div>

              <div class="md:col-span-2">
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Address</div>
                <div class="mt-1 font-semibold text-slate-700">${address}</div>
              </div>

              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Status</div>
                <div class="mt-1">
                  <span class="
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.35em]
                    ${isFake ? "bg-red-50 text-red-600" : "bg-handora-green/10 text-handora-green"}
                  ">
                    <span class="w-1.5 h-1.5 rounded-full ${isFake ? "bg-red-500" : "bg-handora-green"}"></span>
                    ${isFake ? "Fake" : (o.status || "pending")}
                  </span>
                </div>
              </div>

              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Total</div>
                <div class="mt-1 text-lg font-extrabold ${isFake ? "text-red-500" : "text-handora-green"}">
                  ${formatVND(total)}
                </div>
              </div>
            </div>
          </div>

          <!-- tick fake -->
          <button
            onclick="toggleOrderFake('${o.id}')"
            class="
              shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center font-black text-lg transition-all
              ${isFake
                ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                : "bg-white border-slate-200 text-handora-green hover:bg-slate-50"}
            "
            title="Toggle Fake Order"
          >
            ${isFake ? "✓" : "○"}
          </button>
        </div>

        <!-- items summary -->
        <div class="mt-5 pt-5 border-t border-slate-100 text-xs">
          <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Items</div>
          <div class="mt-2 space-y-2">
            ${(o.items || []).slice(0, 3).map((it: any) => `
              <div class="flex items-center justify-between gap-4">
                <div class="truncate font-semibold text-slate-700">${it.name || "Item"}</div>
                <div class="text-slate-500 font-bold">x${it.qty || 1}</div>
              </div>
            `).join("")}

            ${(o.items || []).length === 0 ? `
              <div class="text-slate-500">No items.</div>
            ` : ""}

            ${(o.items || []).length > 3 ? `
              <div class="text-[11px] text-slate-400 italic">+ ${(o.items || []).length - 3} more items…</div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("")
}

                  ${(state.orders || []).length === 0
                    ? `<p class="text-sm text-slate-500 mt-2">No orders yet.</p>`
                    : ``}
                </div>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div class="rounded-[36px] overflow-hidden border border-slate-100 shadow-sm bg-white">
                <div class="p-8 border-b border-slate-100">
                  <p class="text-[10px] font-black uppercase tracking-[0.6em] text-handora-green">Quick Actions</p>
                  <h3 class="mt-3 text-2xl font-serif text-handora-dark">Manage faster</h3>
                  <p class="mt-2 text-slate-500 text-sm">Nhảy nhanh sang tab để thao tác.</p>
                </div>
                <div class="p-8 grid grid-cols-1 gap-3 bg-handora-light/40">
                  <button onclick="state.adminTab='products'; renderApp();"
                    class="px-7 py-4 rounded-[22px] bg-white border border-slate-100 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:shadow-md transition-all">
                    Go Products
                  </button>
                  <button onclick="state.adminTab='blogs'; renderApp();"
                    class="px-7 py-4 rounded-[22px] bg-white border border-slate-100 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:shadow-md transition-all">
                    Go Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
            : ""
        }

        <!-- PRODUCTS -->
${
  tab === "products"
    ? `
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    <!-- FORM -->
    <div class="lg:col-span-5">
      <div class="rounded-[40px] bg-slate-50 border border-slate-200 p-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl font-serif text-handora-dark">
            ${state.editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <span class="px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.45em] text-slate-500">
            Products
          </span>
        </div>

        ${
          // init adminVariants for "new product" scenario
          (!Array.isArray(state.adminVariants) || state.adminVariants.length === 0)
            ? (() => {
                state.adminVariants = [{ size: "250ml", price: 69000 }];
                return "";
              })()
            : ""
        }

        <form onsubmit="saveProduct(event)" class="mt-7 grid grid-cols-1 gap-5">
          <input id="p-name" type="text" placeholder="Name" required
            value="${escapeHtml(editingProduct?.name || "")}"
            class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20" />

          <!-- SELECTS from INITIAL_PRODUCTS / state.products -->
          <select id="p-category" required
            class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
            <option value="">Select category…</option>
            ${opt(categoryOptions, editingProduct?.category)}
          </select>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select id="p-keyIngredient" required
              class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
              <option value="">Key ingredient…</option>
              ${opt(keyIngredientOptions, editingProduct?.keyIngredient)}
            </select>

            <select id="p-scent"
              class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
              <option value="">Scent…</option>
              ${opt(scentOptions, editingProduct?.scent)}
            </select>
          </div>

          <select id="p-target"
            class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
            <option value="">Target…</option>
            ${opt(targetOptions, editingProduct?.target)}
          </select>

          <textarea id="p-description" placeholder="Description" required
            class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none h-32 focus:ring-2 ring-handora-green/20"
          >${escapeHtml(editingProduct?.description || "")}</textarea>

          <input id="p-tags" type="text" placeholder="Tags (comma separated) e.g. Vegan, Daily Use"
            value="${escapeHtml(Array.isArray(editingProduct?.tags) ? editingProduct.tags.join(", ") : "")}"
            class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20" />

          <!-- VARIANTS EDITOR (modern) -->
          <div class="rounded-[28px] bg-slate-50 border border-slate-200 p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">Variants</div>
                <div class="mt-1 text-sm font-extrabold text-handora-dark">Sizes & prices</div>
              </div>

              <button type="button"
                onclick="syncVariantsFromDOM(); addVariantRow();"
                class="px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.35em] text-slate-700 hover:bg-slate-50 transition-all">
                + Add
              </button>
            </div>

            <div class="mt-4 space-y-3">
              ${(state.adminVariants || []).map((v: any, idx: number) => `
                <div data-variant-row="1" class="flex items-center gap-3">
                  <input data-variant-size="1" type="text" placeholder="Size (e.g. 250ml / 500ml / 1L / Set)"
                    value="${escapeHtml(v.size || "")}"
                    class="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-handora-green/20" />

                  <input data-variant-price="1" type="number" step="1" placeholder="Price"
                    value="${Number(v.price || 0)}"
                    class="w-44 bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-handora-green/20" />

                  <button type="button"
                    onclick="syncVariantsFromDOM(); removeVariantRow(${idx});"
                    class="w-12 h-12 rounded-2xl bg-red-50 text-red-500 border border-red-100 font-black hover:bg-red-100 transition-all"
                    title="Remove">
                    ×
                  </button>
                </div>
              `).join("")}
            </div>

            <p class="mt-3 text-xs text-slate-400">
              Add multiple sizes & pricing. At least 1 variant is required.
            </p>
          </div>

          <!-- IMAGE -->
          <div class="flex items-center gap-4">
            <label class="flex-grow bg-white border-2 border-dashed border-slate-200 rounded-2xl px-6 py-4 text-center cursor-pointer hover:bg-slate-50 transition-all">
              <span class="text-[10px] font-black uppercase text-slate-400 tracking-[0.35em]">Upload Product Image</span>
              <input type="file" onchange="handleImageUpload(event)" accept="image/*" class="hidden">
            </label>
            ${state.tempImg || editingProduct?.img ? `<img src="${state.tempImg || editingProduct?.img}" class="w-16 h-16 rounded-2xl object-cover shadow-md border border-white" />` : ""}
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit"
              class="flex-grow btn-shimmer text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
              ${state.editingId ? "Update" : "Create"}
            </button>

            ${
              state.editingId
                ? `<button type="button" onclick="editProduct(null); renderApp();"
                     class="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.35em] text-slate-600 hover:bg-slate-50 transition-all">
                     Cancel
                   </button>`
                : ""
            }
          </div>
        </form>
      </div>
    </div>

    <!-- LIST -->
    <div class="lg:col-span-7">
      <div class="flex items-end justify-between mb-5">
        <h3 class="text-2xl md:text-3xl font-serif text-handora-dark">Manage Products</h3>
        <p class="text-slate-400 text-sm">${productsCount} items</p>
      </div>

      <div class="space-y-3">
        ${state.products.map((p: any) => {
          const variants = Array.isArray(p.variants) ? p.variants : [];
          const prices = variants.map((v: any) => Number(v.price || 0)).filter((n: any) => !Number.isNaN(n));
          const min = prices.length ? Math.min(...prices) : 0;
          const max = prices.length ? Math.max(...prices) : 0;

          const priceLabel =
            variants.length === 0
              ? "No variants"
              : (min === max ? formatVND(min) : `${formatVND(min)} – ${formatVND(max)}`);

          const tags = Array.isArray(p.tags) ? p.tags : [];

          return `
            <div class="group p-5 bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-4 min-w-0">
                  <img src="${p.img}" class="w-14 h-14 object-cover rounded-2xl border border-slate-100 shrink-0" />
                  <div class="min-w-0">
                    <div class="font-extrabold text-handora-dark truncate">${escapeHtml(p.name || "—")}</div>
                    <div class="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mt-1">
                      ${escapeHtml(p.category || "—")} • ${priceLabel}
                    </div>
                    <div class="mt-2 text-xs text-slate-500 line-clamp-2">
                      ${escapeHtml((p.description || "").toString())}
                    </div>
                  </div>
                </div>

                <div class="flex gap-2 shrink-0 whitespace-nowrap">
                  <button onclick="editProduct('${p.id}'); renderApp();"
                    class="px-4 py-2 rounded-full bg-slate-100 text-handora-green text-[10px] font-black uppercase tracking-[0.35em] hover:bg-slate-200 transition-all">
                    Edit
                  </button>
                  <button onclick="deleteProduct('${p.id}');"
                    class="px-4 py-2 rounded-full bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-red-100 transition-all">
                    Delete
                  </button>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                ${p.keyIngredient ? `<span class="px-3 py-1 rounded-full bg-handora-light text-handora-green text-[10px] font-black uppercase tracking-[0.2em]">Key: ${escapeHtml(p.keyIngredient)}</span>` : ""}
                ${p.scent ? `<span class="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Scent: ${escapeHtml(p.scent)}</span>` : ""}
                ${p.target ? `<span class="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Target: ${escapeHtml(p.target)}</span>` : ""}
                ${tags.slice(0, 6).map((t: string) => `
                  <span class="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    ${escapeHtml(t)}
                  </span>
                `).join("")}
                ${tags.length > 6 ? `<span class="text-xs text-slate-400 italic">+${tags.length - 6} more</span>` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  </div>
`
    : ""
}



        <!-- BLOGS -->
        ${
          tab === "blogs"
            ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- FORM -->
            <div class="lg:col-span-5">
              <div class="rounded-[40px] bg-slate-50 border border-slate-200 p-8">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl md:text-3xl font-serif text-handora-dark">
                    ${state.editingBlogId ? "Edit Article" : "Create Article"}
                  </h2>
                  <span class="px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.45em] text-slate-500">
                    Blogs
                  </span>
                </div>

                <form onsubmit="saveBlog(event)" class="mt-7 grid grid-cols-1 gap-5">
                  <input id="b-title" type="text" placeholder="Title" required
                    value="${editingBlog?.title || ""}"
                    class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">

                  <input id="b-excerpt" type="text" placeholder="Excerpt"
                    value="${editingBlog?.excerpt || ""}"
                    class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">

                  <textarea id="b-content" placeholder="Content" required
                    class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none h-44 focus:ring-2 ring-handora-green/20"
                  >${editingBlog?.content || ""}</textarea>

                  <div class="flex items-center gap-4">
                    <label class="flex-grow bg-white border-2 border-dashed border-slate-200 rounded-2xl px-6 py-4 text-center cursor-pointer hover:bg-slate-50 transition-all">
                      <span class="text-[10px] font-black uppercase text-slate-400 tracking-[0.35em]">Upload Image</span>
                      <input type="file" onchange="handleBlogImageUpload(event)" accept="image/*" class="hidden">
                    </label>
                    ${state.tempBlogImg || editingBlog?.img ? `<img src="${state.tempBlogImg || editingBlog?.img}" class="w-16 h-16 rounded-2xl object-cover shadow-md border border-white" />` : ""}
                  </div>

                  <div class="flex gap-3 pt-2">
                    <button type="submit"
                      class="btn-shimmer text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl flex-1">
                      ${state.editingBlogId ? "Update" : "Publish"}
                    </button>
                    ${
                      state.editingBlogId
                        ? `<button type="button" onclick="editBlog(null); renderApp();"
                             class="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.35em] text-slate-600 hover:bg-slate-50 transition-all">
                             Cancel
                           </button>`
                        : ""
                    }
                  </div>
                  <div class="mt-4 text-right">
                    <button type="button" onclick="seedInitialBlogs()" class="text-xs px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50">Seed sample posts</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- LIST -->
            <div class="lg:col-span-7">
              <div class="flex items-end justify-between mb-5">
                <h3 class="text-2xl md:text-3xl font-serif text-handora-dark">Manage Articles</h3>
                <p class="text-slate-400 text-sm">${blogsCount} posts</p>
              </div>

              <div class="space-y-3">
                ${(state.blogs || []).map((b: any) => `
                  <div class="group flex items-center gap-4 p-5 bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
  <!-- LEFT: image + text -->
  <div class="flex items-center gap-4 min-w-0 flex-1">
    ${b.img
      ? `<img src="${b.img}" class="w-14 h-14 object-cover rounded-2xl border border-slate-100 shrink-0" />`
      : `<div class="w-14 h-14 rounded-2xl bg-handora-light flex items-center justify-center text-handora-green font-black border border-slate-100 shrink-0">H</div>`
    }

    <div class="min-w-0">
      <div class="font-extrabold text-handora-dark truncate">
        ${b.title}
      </div>
      <div class="text-slate-500 text-sm truncate">
        ${b.excerpt || ""}
      </div>
    </div>
  </div>

  <!-- RIGHT: actions -->
  <div class="flex gap-2 shrink-0 whitespace-nowrap">
    <button onclick="editBlog('${b.id}'); renderApp();"
      class="px-4 py-2 rounded-full bg-slate-100 text-handora-green text-[10px] font-black uppercase tracking-[0.35em] hover:bg-slate-200 transition-all">
      Edit
    </button>
    <button onclick="deleteBlog('${b.id}');"
      class="px-4 py-2 rounded-full bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-red-100 transition-all">
      Delete
    </button>
  </div>
</div>

                `).join("")}

                ${(state.blogs || []).length === 0
                  ? `<p class="text-sm text-slate-500 mt-3">No articles yet.</p>`
                  : ``}
              </div>
            </div>
          </div>
        `
            : ""
        }

      </div>
    </div>
  </section>
  `;
};
