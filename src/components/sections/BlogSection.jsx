import React from 'react';
import { ArrowRight } from 'lucide-react';
import { blogPostsData } from '../../data/pricingData';
import { soundEffects } from '../../utils/soundFx';

export default function BlogSection() {
  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-12 text-left">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-1">
              — BLOG / RESOURCES
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-950">
              Insights & Resources
            </h3>
          </div>
          
          <button 
            onClick={() => soundEffects.playClick()}
            className="hidden sm:flex items-center gap-1.5 text-xs font-display font-bold text-blue-600 hover:text-blue-700"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              onClick={() => soundEffects.playClick()}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden bg-slate-900">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span className="text-blue-600 font-bold uppercase">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-base font-display font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-3">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
