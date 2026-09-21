import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  Sparkles, 
  BookOpen, 
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { blogPostsData } from '../../data/pricingData';
import { soundEffects } from '../../utils/soundFx';

export default function ArticleModal({ article, isOpen, onClose, onSelectArticle, onOpenIntake }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLiked(false);
      setLikesCount(Math.floor(Math.random() * 30) + 35);
      setBookmarked(false);
      setReadingProgress(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, article]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
      setReadingProgress(progress);
    }
  };

  const handleLike = () => {
    soundEffects.playSuccess();
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleBookmark = () => {
    soundEffects.playClick();
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    soundEffects.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = (codeText, idx) => {
    soundEffects.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    }
  };

  if (!isOpen || !article) return null;

  const relatedArticles = blogPostsData
    .filter((p) => p.id !== article.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      
      {/* Dark Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0D14] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        
        {/* Real-time Reading Progress Bar */}
        <div className="h-1 w-full bg-white/10 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#07090F]/90 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Insights</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reading Progress Indicator */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>{Math.round(readingProgress)}% read</span>
            </div>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                liked 
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title="Like this article"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 stroke-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-xl border text-xs transition-all ${
                bookmarked 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={bookmarked ? "Bookmarked" : "Bookmark article"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400 stroke-amber-400' : ''}`} />
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Scrollable Article Body */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-8 custom-scrollbar text-left"
        >
          {/* Article Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase">
                {article.categoryLabel || article.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishDate || article.date}</span>
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {article.subtitle}
              </p>
            )}

            {/* Author Profile Bar */}
            {article.author && (
              <div className="flex items-center gap-3.5 py-4 border-y border-white/10 my-4">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-md" 
                />
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {article.author.role} • {article.author.bio}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Hero Article Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Structured Article Sections */}
          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            {article.content ? (
              article.content.map((block, idx) => {
                if (block.type === 'lead') {
                  return (
                    <p key={idx} className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={idx} className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight pt-4">
                      {block.title}
                    </h2>
                  );
                }
                if (block.type === 'paragraph') {
                  return (
                    <p key={idx} className="text-slate-300 leading-relaxed">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'code') {
                  return (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-white/15 bg-[#05070B] shadow-lg my-4">
                      <div className="px-4 py-2 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>{block.language || 'code'}</span>
                        <button
                          onClick={() => handleCopyCode(block.code, idx)}
                          className="flex items-center gap-1.5 hover:text-white transition-colors"
                        >
                          {copiedCodeIdx === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  );
                }
                if (block.type === 'callout') {
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 my-4 flex items-start gap-3.5">
                      <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-1">
                          {block.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {block.text}
                        </p>
                      </div>
                    </div>
                  );
                }
                if (block.type === 'bullets') {
                  return (
                    <ul key={idx} className="space-y-2.5 my-4 pl-2">
                      {block.items.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-slate-300">{article.snippet}</p>
            )}
          </div>

          {/* Key Takeaways Box */}
          {article.takeaways && article.takeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Executive Summary & Takeaways</span>
              </div>
              <ul className="space-y-2">
                {article.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Tags */}
          {article.tags && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs font-mono text-slate-500">TAGS:</span>
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Project Commission Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-black border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 my-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Ready for Implementation?</span>
              </span>
              <h4 className="text-base font-display font-bold text-white">
                Turn This Architecture into Your Production Reality
              </h4>
              <p className="text-xs text-slate-400">
                Our core engineers build and deploy production-grade software in 48 hours to 2 weeks.
              </p>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
                if (onOpenIntake) onOpenIntake({ description: `Commission inspired by article: ${article.title}` });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-display font-bold text-xs flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-95"
            >
              <span>Commission This Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Related Articles Section */}
          <div className="pt-10 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-white">
                Related Articles & Insights
              </h3>
              <span className="text-xs font-mono text-slate-400">Continue Reading</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectArticle(rel);
                  }}
                  className="group p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black">
                      <img 
                        src={rel.image} 
                        alt={rel.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block mb-1">
                      {rel.categoryLabel || rel.category}
                    </span>
                    <h4 className="text-xs font-display font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                    <span>{rel.readTime}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
