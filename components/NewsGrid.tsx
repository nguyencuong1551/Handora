
import React from 'react';
import { BlogPost } from '../types';

interface NewsGridProps {
  blogs: BlogPost[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ blogs }) => {
  return (
    <section className="pt-48 pb-40 container mx-auto px-6">
      <div className="text-center mb-24 animate-reveal">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-hannora-green mb-6 block">Editorial</span>
        <h1 className="text-8xl font-serif text-slate-900 mb-8">Botanical <span className="italic font-light text-hannora-green">Journal</span></h1>
        <p className="text-xl text-slate-400 italic max-w-2xl mx-auto">Deep dives into botanical science, sustainability rituals, and minimalist living.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, i) => (
          <article key={blog.id} className="group cursor-pointer animate-reveal" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="aspect-[16/10] overflow-hidden rounded-[40px] mb-8 relative">
              <img 
                src={blog.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                alt={blog.title} 
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                  {blog.date}
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-serif text-slate-800 mb-4 group-hover:text-hannora-green transition-colors leading-snug">
              {blog.title}
            </h2>
            <p className="text-slate-500 line-clamp-3 leading-relaxed mb-6 font-medium">
              {blog.excerpt}
            </p>
            <button className="text-[10px] font-black uppercase tracking-[0.4em] text-hannora-green border-b border-hannora-green/20 pb-1 hover:border-hannora-green transition-all">
              Read Entire Piece
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
