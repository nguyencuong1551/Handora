
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, blogs, onUpdateProducts, onUpdateOrders, onUpdateBlogs }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'blogs'>('stats');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    { label: 'Total Revenue', value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`, icon: '💰' },
    { label: 'Total Orders', value: orders.length, icon: '📦' },
    { label: 'Total Products', value: products.length, icon: '🌿' },
    { label: 'Total Articles', value: blogs.length, icon: '📖' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'blog') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'product') {
          setEditingProduct(prev => ({ ...prev, imageUrl: base64 }));
        } else {
          setEditingBlog(prev => ({ ...prev, imageUrl: base64 }));
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
        ingredients: typeof editingProduct.ingredients === 'string' ? (editingProduct.ingredients as string).split(',').map(i => i.trim()) : (editingProduct.ingredients || [])
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

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* SIDEBAR */}
      <div className="w-full lg:w-72 space-y-3">
        <div className="p-8 mb-6">
           <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Management</h2>
           <p className="text-2xl font-serif">Dashboard</p>
        </div>
        {['stats', 'products', 'blogs', 'orders'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`w-full text-left px-8 py-5 rounded-[24px] text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'hover:bg-white text-slate-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-grow bg-white border border-slate-100 rounded-[48px] p-12 shadow-sm min-h-[600px]">
        {activeTab === 'stats' && (
          <div className="space-y-12 animate-reveal">
            <h2 className="text-4xl font-serif">System Overview</h2>
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
              <h2 className="text-4xl font-serif">Product Management</h2>
              <button 
                onClick={() => setEditingProduct({ name: '', price: 0, category: 'Hand Wash', description: '', ingredients: [], imageUrl: '' })}
                className="btn-shimmer text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest"
              >
                + Create Product
              </button>
            </div>

            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="group flex items-center justify-between p-6 bg-slate-50 rounded-[28px] hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={p.imageUrl} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div>
                      <p className="text-lg font-bold">{p.name}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="font-serif text-xl">${Number(p.price).toFixed(2)}</p>
                    <div className="flex gap-4">
                       <button onClick={() => setEditingProduct(p)} className="text-[10px] font-bold uppercase tracking-widest text-hannora-green">Edit</button>
                       <button onClick={() => onUpdateProducts(products.filter(item => item.id !== p.id))} className="text-[10px] font-bold uppercase tracking-widest text-red-300">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
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

            <div className="space-y-4">
              {blogs.map(b => (
                <div key={b.id} className="group flex items-center justify-between p-6 bg-slate-50 rounded-[28px] hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={b.imageUrl} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div>
                      <p className="text-lg font-bold">{b.title}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{b.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => setEditingBlog(b)} className="text-[10px] font-bold uppercase tracking-widest text-hannora-green">Edit</button>
                     <button onClick={() => onUpdateBlogs(blogs.filter(item => item.id !== b.id))} className="text-[10px] font-bold uppercase tracking-widest text-red-300">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-reveal">
            <h2 className="text-4xl font-serif mb-12">Order History</h2>
            <div className="grid gap-6">
              {orders.map(order => (
                <div key={order.id} className="p-10 border border-slate-100 rounded-[36px] bg-[#fdfdfd] hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-hannora-green/10 text-hannora-green text-[9px] font-bold uppercase tracking-[0.3em] rounded-full mb-4">#{order.id}</span>
                      <h4 className="text-2xl font-serif">{order.customer.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-serif mb-3">${Number(order.total).toFixed(2)}</p>
                      <select 
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 rounded-full px-4 py-2 outline-none"
                        defaultValue={order.status}
                        onChange={(e) => {
                          const updated = orders.map(o => o.id === order.id ? {...o, status: e.target.value as any} : o);
                          onUpdateOrders(updated);
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-center text-slate-400 italic">No orders recorded yet.</p>}
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl reveal">
          <form onSubmit={handleSaveProduct} className="bg-white w-full max-w-xl p-12 rounded-[50px] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-3xl font-serif mb-10">{editingProduct.id ? 'Refine Product' : 'New Creation'}</h3>
            <div className="grid gap-8">
              <input className="w-full border-b border-slate-200 py-4 text-xl font-serif focus:border-hannora-green outline-none" placeholder="Product Title" value={editingProduct.name} required onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-8">
                <input type="number" step="0.01" className="border-b border-slate-200 py-4 outline-none focus:border-hannora-green" placeholder="Price ($)" value={editingProduct.price} required onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                <select className="border-b border-slate-200 py-4 outline-none font-bold uppercase text-[10px] tracking-widest" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                  <option value="Hand Wash">Hand Wash</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Refill">Refill</option>
                  <option value="Body Care">Body Care</option>
                </select>
              </div>
              <div className="flex items-center gap-6">
                 <label className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-white transition-all">
                    <span className="text-[9px] font-black uppercase text-slate-400">Upload Base64 Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'product')} />
                 </label>
                 {editingProduct.imageUrl && <img src={editingProduct.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />}
              </div>
              <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-32 focus:ring-2 ring-hannora-light outline-none" placeholder="Description..." value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
            </div>
            <div className="flex gap-6 mt-12">
              <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Abort</button>
              <button className="flex-[2] btn-shimmer text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl">Commit Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl reveal">
          <form onSubmit={handleSaveBlog} className="bg-white w-full max-w-xl p-12 rounded-[50px] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-3xl font-serif mb-10">{editingBlog.id ? 'Refine Article' : 'New Article'}</h3>
            <div className="grid gap-8">
              <input className="w-full border-b border-slate-200 py-4 text-xl font-serif focus:border-hannora-green outline-none" placeholder="Article Title" value={editingBlog.title} required onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} />
              <div className="flex items-center gap-6">
                 <label className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-white transition-all">
                    <span className="text-[9px] font-black uppercase text-slate-400">Upload Header Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'blog')} />
                 </label>
                 {editingBlog.imageUrl && <img src={editingBlog.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />}
              </div>
              <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-24 focus:ring-2 ring-hannora-light outline-none" placeholder="Excerpt..." value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} />
              <textarea className="w-full border border-slate-100 rounded-2xl p-6 h-48 focus:ring-2 ring-hannora-light outline-none" placeholder="Full Content..." value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} />
            </div>
            <div className="flex gap-6 mt-12">
              <button type="button" onClick={() => setEditingBlog(null)} className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Abort</button>
              <button className="flex-[2] btn-shimmer text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl">Commit Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
