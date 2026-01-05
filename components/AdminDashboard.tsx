
import React, { useState, useRef } from 'react';
import { Product, Order, BlogPost } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  blogs: BlogPost[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateBlogs: (blogs: BlogPost[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  orders, 
  blogs = [], 
  onUpdateProducts, 
  onUpdateOrders,
  onUpdateBlogs
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'news'>('stats');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    { label: 'Revenue', value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`, icon: '💰' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: '📦' },
    { label: 'Inventory', value: products.length, icon: '🌿' },
    { label: 'Articles', value: blogs.length, icon: '📰' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'blog') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'product' && editingProduct) {
          setEditingProduct({ ...editingProduct, imageUrl: base64String });
        } else if (type === 'blog' && editingBlog) {
          setEditingBlog({ ...editingBlog, imageUrl: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    let updatedProducts;
    if (editingProduct.id) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p);
    } else {
      const newProduct = { 
        ...editingProduct, 
        id: Date.now().toString(), 
        stock: 50,
        ingredients: typeof editingProduct.ingredients === 'string' 
          ? (editingProduct.ingredients as string).split(',').map(i => i.trim()) 
          : (editingProduct.ingredients || [])
      } as Product;
      updatedProducts = [newProduct, ...products];
    }
    onUpdateProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    
    let updatedBlogs;
    if (editingBlog.id) {
      updatedBlogs = blogs.map(b => b.id === editingBlog.id ? (editingBlog as BlogPost) : b);
    } else {
      const newBlog = { 
        ...editingBlog, 
        id: Date.now().toString(), 
        date: new Date().toISOString().split('T')[0]
      } as BlogPost;
      updatedBlogs = [newBlog, ...blogs];
    }
    onUpdateBlogs(updatedBlogs);
    setEditingBlog(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this ritual item?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Delete this editorial piece?')) {
      onUpdateBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* SIDEBAR */}
      <div className="w-full lg:w-72 space-y-3">
        <div className="p-8 mb-6">
           <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Management</h2>
           <p className="text-2xl font-serif">System Controls</p>
        </div>
        {['stats', 'products', 'orders', 'news'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`w-full text-left px-8 py-5 rounded-[24px] text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'hover:bg-white text-slate-400'}`}
          >
            {tab === 'news' ? 'News & Media' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-grow bg-white border border-slate-100 rounded-[48px] p-8 md:p-12 shadow-sm min-h-[600px]">
        {activeTab === 'stats' && (
          <div className="space-y-12 animate-reveal">
            <h2 className="text-4xl font-serif">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(s => (
                <div key={s.label} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 hover:border-hannora-green/30 transition-colors">
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-serif text-slate-800">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-reveal">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-serif">Inventory</h2>
              <button 
                onClick={() => setEditingProduct({ name: '', price: 0, category: 'Hand Wash', description: '', ingredients: [], imageUrl: '' })}
                className="btn-shimmer text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest"
              >
                + Create Entry
              </button>
            </div>

            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="group flex items-center justify-between p-6 bg-slate-50 rounded-[28px] hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={p.imageUrl} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-sm" alt="" />
                    <div>
                      <p className="text-lg font-bold text-slate-800">{p.name}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="font-serif text-xl text-slate-600">${p.price.toFixed(2)}</p>
                    <div className="flex gap-4">
                       <button onClick={() => setEditingProduct(p)} className="text-[10px] font-bold uppercase tracking-widest text-hannora-green hover:underline">Edit</button>
                       <button onClick={() => handleDeleteProduct(p.id)} className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Fix: use className instead of class */}
              {products.length === 0 && <p className="text-center text-slate-400 py-10 italic">No products found in the ritual system.</p>}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="animate-reveal">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-serif">Editorial Content</h2>
              <button 
                onClick={() => setEditingBlog({ title: '', excerpt: '', content: '', imageUrl: '' })}
                className="btn-shimmer text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest"
              >
                + New Article
              </button>
            </div>

            <div className="grid gap-6">
              {blogs.map(blog => (
                <div key={blog.id} className="p-6 bg-slate-50 rounded-[28px] flex justify-between items-center group hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={blog.imageUrl} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-sm" alt="" />
                    <div>
                      <h4 className="font-serif text-lg text-slate-800">{blog.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">{blog.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setEditingBlog(blog)} className="text-[10px] font-bold uppercase tracking-widest text-hannora-green hover:underline">Edit</button>
                    <button onClick={() => handleDeleteBlog(blog.id)} className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
              {/* Fix: use className instead of class */}
              {blogs.length === 0 && <p className="text-center text-slate-400 py-10 italic">No editorial pieces found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-reveal">
            <h2 className="text-4xl font-serif mb-12">Recent Exchanges</h2>
            <div className="grid gap-6">
              {orders.map(order => (
                <div key={order.id} className="p-10 border border-slate-100 rounded-[36px] bg-[#fdfdfd] hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-hannora-green/10 text-hannora-green text-[9px] font-bold uppercase tracking-[0.3em] rounded-full mb-4">#{order.id}</span>
                      <h4 className="text-2xl font-serif text-slate-800">{order.customer.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-serif mb-3 text-slate-700">${order.total.toFixed(2)}</p>
                      <select 
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 rounded-full px-4 py-2 outline-none focus:ring-2 ring-hannora-green/20"
                        defaultValue={order.status}
                        onChange={(e) => {
                          const updated = orders.map(o => o.id === order.id ? {...o, status: e.target.value as any} : o);
                          onUpdateOrders(updated);
                        }}
                      >
                        <option value="pending">Awaiting Ritual</option>
                        <option value="completed">Immersion Complete</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {/* Fix: use className instead of class */}
              {orders.length === 0 && <p className="text-center text-slate-400 py-10 italic">No order history recorded yet.</p>}
            </div>
          </div>
        )}
      </div>

      {/* Editing Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl">
          <form onSubmit={handleSaveProduct} className="bg-white w-full max-w-xl p-10 md:p-12 rounded-[50px] shadow-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in">
            <button type="button" onClick={() => setEditingProduct(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h3 className="text-3xl font-serif mb-10 text-slate-800">{editingProduct.id ? 'Refine Product' : 'New Creation'}</h3>
            <div className="grid gap-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Display Name</label>
                <input className="w-full border-b border-slate-100 py-4 text-xl font-serif focus:border-hannora-green outline-none bg-slate-50/30 px-4 rounded-xl" placeholder="Product Title" value={editingProduct.name} required onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Price ($)</label>
                  <input type="number" step="0.01" className="w-full border-b border-slate-100 py-4 outline-none focus:border-hannora-green bg-slate-50/30 px-4 rounded-xl" placeholder="0.00" value={editingProduct.price} required onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
                  <select className="w-full border-b border-slate-100 py-4 outline-none font-bold uppercase text-[10px] tracking-widest bg-slate-50/30 px-4 rounded-xl" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                    <option>Hand Wash</option>
                    <option>Skincare</option>
                    <option>Refill</option>
                    <option>Body Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Visual Identity (Upload Image)</label>
                <div className="flex items-center gap-6 mt-2">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                    {editingProduct.imageUrl ? (
                      <img src={editingProduct.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={(e) => handleImageUpload(e, 'product')}
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-hannora-green transition-all"
                    >
                      Choose Visual File
                    </button>
                    <p className="text-[9px] text-slate-400 mt-2 italic">Stored locally as botanical data.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Product Narrative</label>
                <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-32 focus:ring-2 ring-hannora-light outline-none bg-slate-50/30" placeholder="Describe the botanical ritual..." value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-6 mt-12">
              <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Cancel</button>
              <button className="flex-[2] btn-shimmer text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl">Commit Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Editing Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl">
          <form onSubmit={handleSaveBlog} className="bg-white w-full max-w-xl p-10 md:p-12 rounded-[50px] shadow-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in">
            <button type="button" onClick={() => setEditingBlog(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h3 className="text-3xl font-serif mb-10 text-slate-800">{editingBlog.id ? 'Edit Article' : 'New Article'}</h3>
            <div className="grid gap-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Editorial Title</label>
                <input className="w-full border-b border-slate-100 py-4 text-xl font-serif focus:border-hannora-green outline-none bg-slate-50/30 px-4 rounded-xl" placeholder="Article Title" value={editingBlog.title} required onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Cover Visual</label>
                <div className="flex items-center gap-6 mt-2">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                    {editingBlog.imageUrl ? (
                      <img src={editingBlog.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={(e) => handleImageUpload(e, 'blog')}
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-hannora-green transition-all"
                    >
                      Select Media File
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Short Excerpt</label>
                <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-24 outline-none focus:ring-2 ring-hannora-light bg-slate-50/30" placeholder="Summarize for the journal..." value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Full Content</label>
                <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-48 outline-none focus:ring-2 ring-hannora-light bg-slate-50/30" placeholder="The complete editorial narrative..." value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-6 mt-12">
              <button type="button" onClick={() => setEditingBlog(null)} className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Abort</button>
              <button className="flex-[2] btn-shimmer text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl">Publish Article</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
