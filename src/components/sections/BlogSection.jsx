import React, { useState } from 'react';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { blogPostsData, blogCategories } from '../../data/pricingData';
import { soundEffects } from '../../utils/soundFx';
import ArticleModal from './ArticleModal';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredPosts = activeCategory === 'all'
    ? blogPostsData
    : blogPostsData.filter((post) => post.category === activeCategory);

  const handleOpenArticle = (post) => {
    soundEffects.playClick();
    setSelectedArticle(post);
  };

  const handleCloseArticle = () => {
    soundEffects.playClick();
    setSelectedArticle(null);
  };

  return (
    <section id="resources" className="relative py-24 bg-[#F8FAFC] text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Purple Tablet & Hologram from Design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
              — RESOURCES & INSIGHTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
              Latest Insights & Articles
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Actionable tutorials, architecture breakdowns, and industry updates from our core engineering team.
            </p>
          </div>

          {/* 3D Holographic Isometric Tablet & Polyhedron from Design */}
          <div className="hidden lg:flex items-center justify-center pr-8 pointer-events-none">
            <div className="relative w-36 h-36 flex items-center justify-center drop-shadow-2xl">
              <img 
                src="/aether_blog_crystal.jpg" 
                alt="3D Holographic Resources Tablet" 
                className="w-full h-full object-cover rounded-3xl animate-float-slow shadow-[0_0_35px_rgba(168,85,247,0.35)] border border-white/40" 
              />
            </div>
          </div>
        </div>

        {/* 5 Filter Pills matching Design */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {blogCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Dedicated Article Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => handleOpenArticle(post)}
              onMouseEnter={() => soundEffects.playHover()}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Dedicated Unique Article Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300 text-[10px] font-mono uppercase font-bold">
                      {post.categoryLabel || post.category}
                    </span>
                  </div>
                </div>

                {/* Article Meta & Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {post.snippet}
                  </p>
                </div>
              </div>

              {/* Read Article Action Trigger */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors pt-3 border-t border-slate-100">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Interactive Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={handleCloseArticle}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

    </section>
  );
}
