export const renderHome = (state: any) => `
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

export const renderShop = (state: any) => `
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

export const renderAbout = (state: any) => `
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
  <div class="text-center mb-28 reveal-on-scroll">
    <span class="text-[10px] font-black uppercase tracking-[1.5em] text-handora-green mb-10 block">
      Management
    </span>
    <h2 class="text-8xl md:text-9xl font-serif text-handora-dark leading-none">
      The <span class="italic text-handora-green">Collective</span>
    </h2>
    <p class="mt-10 text-slate-400 text-xl md:text-2xl font-serif italic max-w-3xl mx-auto leading-relaxed">
      A small group of specialists shaping every ritual — from extraction science to circular design.
    </p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16 xl:gap-14 max-w-[1680px] mx-auto">
    ${state.TEAM
      ? state.TEAM.map((m: any, i: number) => `
        <div class="group text-center reveal-on-scroll" style="transition-delay: ${i * 140}ms">
          <!-- portrait -->
          <div class="relative w-56 h-56 md:w-60 md:h-60 mx-auto mb-12">
            <div class="absolute inset-0 rounded-[40%] border border-handora-green/20 rotate-45
                        group-hover:scale-125 group-hover:rotate-90 transition-all duration-[1.4s] ease-out"></div>

            <div class="absolute inset-0 rounded-[45%] border border-handora-accent/30 -rotate-12 scale-105
                        group-hover:scale-115 group-hover:rotate-45 transition-all duration-[1.15s] ease-out delay-75"></div>

            <div class="w-full h-full rounded-full overflow-hidden shadow-[0_30px_60px_rgba(74,124,89,0.28)]
                        relative z-10 portrait-clear transition-all duration-700">
              <img
                src="${m.img}"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="${m.name}"
              />
            </div>
          </div>

          <!-- name -->
          <h4 class="text-3xl md:text-4xl font-serif text-handora-dark mb-3
                     group-hover:text-handora-green transition-colors duration-500">
            ${m.name}
          </h4>

          <!-- role -->
          <p class="text-[11px] font-black uppercase tracking-[0.5em] text-handora-green mb-8 opacity-70">
            ${m.role}
          </p>

          <!-- divider -->
          <div class="h-0.5 w-12 bg-handora-green/20 mx-auto mb-8
                      transition-all duration-700 group-hover:w-24 group-hover:bg-handora-green"></div>

          <!-- bio -->
          <p class="text-slate-500 text-lg italic px-6 leading-relaxed font-light">
            ${m.bio}
          </p>
        </div>
      `).join('')
      : ''
    }
  </div>
</section>

  </div>
`;

export const renderQuiz = (state: any) => `
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

export const renderCart = (state: any) => `
  <section class="pt-48 pb-40 container mx-auto px-8 max-w-4xl">
    <h1 class="text-6xl font-serif mb-16">Your Ritual Items</h1>
    ${state.cart.length === 0 ? '<p class="text-slate-400 italic text-center text-xl">The ritual bag is currently empty.</p>' : `
      <div class="space-y-6">
        ${state.cart.map((item: any, i: number) => `
          <div class="flex justify-between items-center bg-white p-8 rounded-[40px] shadow-sm">
            <div class="flex items-center gap-6">
                  <img src="${item.img}" class="w-20 h-20 rounded-2xl object-cover" />
                  <div>
                    <p class="text-xl font-serif">${item.name}</p>
                    <p class="text-sm text-slate-500">Unit: $${Number(item.price).toFixed(2)}</p>
                  </div>
               </div>
               <div class="flex items-center gap-3">
                 <button onclick="removeFromBag(${i})" class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-red-400 font-bold">−</button>
                 <div class="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold">${item.qty || 1}</div>
                 <button onclick="addToBag('${item.id}')" class="w-9 h-9 flex items-center justify-center rounded-full bg-handora-green text-white font-bold">+</button>
               </div>
          </div>
        `).join('')}
        <div class="pt-12 text-right">
           <p class="text-4xl font-serif mb-8 text-handora-dark">Total: $${state.cart.reduce((s: number, i: any) => s + (i.price * (i.qty || 1)), 0).toFixed(2)}</p>
           <button onclick="handleCheckout()" class="btn-shimmer text-white px-14 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Complete Ritual</button>
        </div>
      </div>
    `}
  </section>
`;

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
    class="group bg-white rounded-[36px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all reveal-on-scroll"
    style="transition-delay:${(i % 9) * 80}ms"
  >
    <div class="relative overflow-hidden">
      <img src="${withFallbackImg(b.img)}"
           class="w-full h-56 object-cover transition-transform duration-[1800ms] group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80"></div>

      <div class="absolute left-6 top-6 flex items-center gap-2">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-[9px] font-black uppercase tracking-[0.45em] text-handora-dark">
          <span class="w-2 h-2 rounded-full bg-handora-green"></span>
          ${esc(b.tag || "ritual")}
        </span>
      </div>

      <div class="absolute right-6 bottom-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <button onclick="openBlog('${esc(b.id)}')"
          class="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 text-[10px] font-black uppercase tracking-[0.35em] text-handora-dark hover:bg-white transition-all">
          Read
        </button>
      </div>
    </div>

    <div class="p-8">
      <h3 class="text-2xl font-serif text-handora-dark leading-snug mb-3 group-hover:text-handora-green transition-colors duration-500">
        ${esc(b.title)}
      </h3>
      <p class="text-slate-500 text-sm leading-relaxed">
        ${esc(b.excerpt || "")}
      </p>

      <div class="mt-7 flex items-center justify-between">
        <button onclick="openBlog('${esc(b.id)}')"
          class="text-[10px] font-black uppercase tracking-[0.45em] text-handora-green hover:underline">
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
  const blogs = (state.blogs || []).slice().reverse(); // newest first
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return `
  <section class="pt-44 pb-40 container mx-auto px-8">

    <!-- PAGE INTRO / TITLE -->
    <div class="mb-16 reveal-on-scroll">
      <div class="relative overflow-hidden rounded-[60px] bg-white border border-slate-100 shadow-2xl">
        <!-- soft blobs -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full bg-handora-green/10 blur-[80px]"></div>
          <div class="absolute -bottom-32 -left-32 w-[620px] h-[620px] rounded-full bg-handora-accent/10 blur-[90px]"></div>
        </div>

        <div class="relative p-12 md:p-16">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div class="max-w-3xl">
              <span class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-handora-green/10 text-handora-green text-[10px] font-black uppercase tracking-[0.6em]">
                <span class="w-2 h-2 rounded-full bg-handora-green"></span>
                Handora Journal
              </span>

              <h1 class="text-6xl md:text-7xl font-serif text-handora-dark leading-tight mt-8">
                Botanical <span class="italic font-light text-handora-green">Stories</span>,<br/>
                Slow <span class="italic font-light text-handora-green">Rituals</span>.
              </h1>

              <p class="text-slate-500 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl">
                Nơi tụi mình ghi lại công thức, thói quen, ingredient notes — để bạn chăm tay theo cách “high-end” nhưng nhẹ nhàng.
              </p>

              <div class="mt-10 flex flex-col sm:flex-row gap-4">
                <button onclick="document.getElementById('featured')?.scrollIntoView({behavior:'smooth'})"
                  class="btn-shimmer px-10 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                  Explore Featured
                </button>

                <button onclick="navigate('shop')"
                  class="px-10 py-4 rounded-2xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all">
                  Shop Rituals
                </button>
              </div>

              <div class="mt-8 flex items-center gap-6 text-slate-400 text-sm">
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-handora-green"></span> Science</div>
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-handora-accent"></span> Ritual</div>
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-300"></span> Sustainability</div>
              </div>
            </div>

           <!-- LATEST MINI CARD (TITLE ON IMAGE ONLY) -->
<div class="w-full lg:w-[420px]">
  <div class="group relative rounded-[44px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-white/10 reveal-on-scroll">
    <div class="relative h-[420px]">
      <img
        src="${withFallbackImg(featured?.img)}"
        class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[2200ms] group-hover:scale-110"
        alt="Latest"
      />

      <!-- overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5"></div>
      <div class="absolute inset-0 bg-gradient-to-tr from-handora-dark/40 via-transparent to-handora-green/20 opacity-80"></div>

      <!-- top badge -->
      <div class="absolute left-7 top-7">
        <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.55em] text-white">
          <span class="w-2 h-2 rounded-full bg-handora-accent"></span>
          Latest
        </span>
      </div>

      <!-- TITLE ONLY -->
      <div class="absolute inset-x-0 bottom-0 p-8">
 <h3 class="
  text-[26px] md:text-[32px]
  leading-[1.2]
  font-semibold
  tracking-[-0.01em]
  text-white/90
  max-w-[24ch]
">
  ${blogs.length ? esc(featured?.title || "") : "No articles yet."}
</h3>



        <div class="mt-8 flex items-center gap-4">
          ${
            blogs.length
              ? `
            <button
              onclick="openBlog('${esc(featured?.id)}')"
              class="btn-shimmer px-10 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
              Read Now
            </button>
            `
              : `
            <button
              onclick="navigate('admin')"
              class="px-10 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/15 transition-all">
              Go Admin
            </button>
            `
          }
        </div>

        <!-- meta row (optional, có thể xoá nếu muốn cực tối giản) -->
        <div class="mt-10 flex items-center justify-between text-white/60 text-xs uppercase tracking-widest">
          <span>${esc(featured?.tag || "ritual")}</span>
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-handora-green"></span>
            Handora Journal
          </span>
        </div>
      </div>

      <!-- moving sheen -->
      <div class="pointer-events-none absolute -inset-y-10 -left-40 w-40 bg-white/20 rotate-12 blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[900px] transition-all duration-[1400ms]"></div>
    </div>
  </div>
</div>


          </div>
        </div>

        <div class="pointer-events-none absolute -inset-y-10 -left-40 w-40 bg-white/25 rotate-12 blur-xl opacity-0 hover:opacity-100 hover:translate-x-[1200px] transition-all duration-[1400ms]"></div>
      </div>
    </div>

    <!-- FEATURED -->
    <div id="featured" class="mb-16 reveal-on-scroll">
      <div class="flex items-end justify-between mb-6">
        <h2 class="text-4xl md:text-5xl font-serif text-handora-dark">Featured</h2>
        <p class="text-slate-400 text-sm">${blogs.length} total</p>
      </div>

      ${
        featured
          ? `
      <div class="group relative overflow-hidden rounded-[50px] bg-white border border-slate-100 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative overflow-hidden">
            <img src="${withFallbackImg(featured.img)}"
                 class="w-full h-[360px] lg:h-full object-cover transition-transform duration-[2200ms] group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/10"></div>

            <div class="absolute left-8 bottom-8">
              <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-[10px] font-black uppercase tracking-[0.5em] text-handora-dark">
                <span class="w-2 h-2 rounded-full bg-handora-green"></span> Featured
              </span>
            </div>
          </div>

          <div class="p-10 md:p-14 flex flex-col">
            <h3 class="text-4xl md:text-5xl font-serif text-handora-dark leading-tight">
              ${esc(featured.title)}
            </h3>
            <p class="text-slate-500 text-lg mt-6 leading-relaxed">
              ${esc(featured.excerpt || "")}
            </p>

            <div class="mt-10 flex flex-col sm:flex-row gap-4">
              <button onclick="openBlog('${esc(featured.id)}')"
                class="btn-shimmer px-10 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                Read Article
              </button>
            </div>

            <div class="mt-auto pt-10 flex items-center justify-between text-slate-400 text-sm">
              <div class="flex items-center gap-3">
                <span class="inline-block w-10 h-10 rounded-full bg-handora-green/10 flex items-center justify-center text-handora-green font-black">
                  H
                </span>
                <div>
                  <div class="text-slate-600 font-bold">Handora Collective</div>
                  <div class="text-slate-400 text-xs">Botanical Editorial</div>
                </div>
              </div>
              <div class="text-xs uppercase tracking-widest">${esc(featured.tag || "ritual")}</div>
            </div>
          </div>
        </div>

        <div class="pointer-events-none absolute -inset-y-10 -left-40 w-40 bg-white/30 rotate-12 blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[1200px] transition-all duration-[1400ms]"></div>
      </div>
      `
          : `
      <div class="p-10 rounded-[40px] bg-slate-50 border border-slate-200 text-slate-500">
        No featured article yet.
      </div>
      `
      }
    </div>

    <!-- GRID -->
    <div id="blogs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section class="pt-48 pb-40 container mx-auto px-8">
      <div class="max-w-3xl mx-auto bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 reveal-on-scroll">
        <p class="text-slate-500">Article not found.</p>
        <div class="mt-8">
          <button onclick="navigate('blogs')" class="btn-shimmer px-8 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
            Back to Articles
          </button>
        </div>
      </div>
    </section>
  `;

  const readTime = b.content ? Math.max(1, Math.ceil(String(b.content).split(/\s+/).length / 200)) : 1;
  const dateText = b.date ? esc(b.date) : "";
  const tagText = esc(b.tag || "journal");

  return `
  <section class="pt-36 pb-32">
    <div class="container mx-auto px-8 max-w-4xl">

      <!-- HERO IMAGE -->
      <div class="relative overflow-hidden rounded-[48px] border border-slate-100 bg-white shadow-2xl reveal-on-scroll">
        <div class="relative h-[320px] md:h-[460px] overflow-hidden">
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

            <button onclick="navigate('blogs')"
              class="px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.45em] text-white hover:bg-white/20 transition-all">
              Back
            </button>
          </div>

          <!-- TITLE -->
          <div class="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <div class="text-white/70 text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3">
              <span>${readTime} min read</span>
              ${dateText ? `<span class="opacity-60">•</span><span>${dateText}</span>` : ``}
            </div>

            <h1 class="
              mt-4
              text-[30px] md:text-[46px]
              leading-[1.08]
              font-semibold tracking-[-0.01em]
              text-white/90
              max-w-[24ch]
            ">
              ${esc(b.title)}
            </h1>

            ${
              b.excerpt
                ? `
              <p class="mt-4 text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                ${esc(b.excerpt)}
              </p>
              `
                : ``
            }
          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="mt-10 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-12 reveal-on-scroll">
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

        <div class="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button onclick="navigate('blogs')"
            class="px-8 py-4 rounded-2xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all">
            Back to Articles
          </button>
          <button onclick="navigate('shop')"
            class="btn-shimmer px-8 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
            Shop Rituals
          </button>
        </div>
      </div>

    </div>
  </section>
  `;
};





export const renderAdmin = (state: any) => {
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
    const total = Number(o.total || 0).toFixed(2);
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
                  $${total}
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

                <form onsubmit="saveProduct(event)" class="mt-7 grid grid-cols-1 gap-5">
                  <input id="p-name" type="text" placeholder="Product Name" required
                    value="${editingProduct?.name || ""}"
                    class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input id="p-price" type="number" step="0.01" placeholder="Price ($)" required
                      value="${editingProduct?.price || ""}"
                      class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">

                    <select id="p-category"
                      class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-handora-green/20">
                      <option value="Hand Rituals" ${editingProduct?.category === "Hand Rituals" ? "selected" : ""}>Hand Rituals</option>
                      <option value="Skin Therapy" ${editingProduct?.category === "Skin Therapy" ? "selected" : ""}>Skin Therapy</option>
                    </select>
                  </div>

                  <textarea id="p-desc" placeholder="Brief Description" required
                    class="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none h-32 focus:ring-2 ring-handora-green/20"
                  >${editingProduct?.desc || ""}</textarea>

                  <div class="flex items-center gap-4">
                    <label class="flex-grow bg-white border-2 border-dashed border-slate-200 rounded-2xl px-6 py-4 text-center cursor-pointer hover:bg-slate-50 transition-all">
                      <span class="text-[10px] font-black uppercase text-slate-400 tracking-[0.35em]">Upload Product Image</span>
                      <input type="file" onchange="handleImageUpload(event)" accept="image/*" class="hidden">
                    </label>
                    ${state.tempImg || editingProduct?.img ? `<img src="${state.tempImg || editingProduct?.img}" class="w-16 h-16 rounded-2xl object-cover shadow-md border border-white" />` : ""}
                  </div>

                  <div class="flex gap-3 pt-2">
                    <button type="submit" class="flex-grow btn-shimmer text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
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
                ${state.products.map((p: any) => `
                  <div class="group flex justify-between items-center p-5 bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div class="flex items-center gap-4">
                      <img src="${p.img}" class="w-14 h-14 object-cover rounded-2xl border border-slate-100" />
                      <div>
                        <div class="font-extrabold text-handora-dark">${p.name}</div>
                        <div class="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400 mt-1">
                          ${p.category} • $${Number(p.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-2">
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
                `).join("")}
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
                  <div class="group flex justify-between items-center p-5 bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div class="flex items-center gap-4">
                      ${b.img ? `<img src="${b.img}" class="w-14 h-14 object-cover rounded-2xl border border-slate-100" />` : `
                        <div class="w-14 h-14 rounded-2xl bg-handora-light flex items-center justify-center text-handora-green font-black border border-slate-100">H</div>
                      `}
                      <div class="min-w-0">
                        <div class="font-extrabold text-handora-dark truncate max-w-[420px]">${b.title}</div>
                        <div class="text-slate-500 text-sm truncate max-w-[420px]">${b.excerpt || ""}</div>
                      </div>
                    </div>
                    <div class="flex gap-2">
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
