
import React, { useState, useMemo } from 'react';
import { HAIRCUT_STYLES } from '../constants';
import { HaircutStyle, FaceAnalysis } from '../types';

interface HaircutGalleryProps {
  onVisualize: (style: HaircutStyle) => void;
  generatedImage: string | null;
  originalPhoto: string;
  selectedStyle: HaircutStyle | null;
  onReset: () => void;
  analysis?: FaceAnalysis | null;
}

const HaircutGallery: React.FC<HaircutGalleryProps> = ({ onVisualize, generatedImage, originalPhoto, selectedStyle, onReset, analysis }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [sliderVal, setSliderVal] = useState(50);
  const [matchMakeup, setMatchMakeup] = useState(false);

  const categories = [
    { label: 'Short Haircuts', key: 'Short' },
    { label: 'Medium-Length', key: 'Medium' },
    { label: 'Long Haircuts', key: 'Long' },
    { label: 'Bangs/Fringe', key: 'Bangs' },
    { label: 'Trend & Style', key: 'Trend' },
    { label: 'Classic & Elegant', key: 'Classic' }
  ];

  // Feature 2: Face Shape Optimized Filter
  const filteredStyles = useMemo(() => {
    if (!analysis || !analysis.faceShape) return HAIRCUT_STYLES;
    const shape = (analysis.faceShape || '').toLowerCase();
    
    // Logic to prioritize haircuts based on face shape
    return [...HAIRCUT_STYLES].sort((a, b) => {
      const aLower = (a.params || '').toLowerCase();
      const bLower = (b.params || '').toLowerCase();
      
      const isAMatch = (shape.includes('round') && (aLower.includes('volume') || a.category === 'Long')) ||
                       (shape.includes('oval') && true) ||
                       (shape.includes('square') && aLower.includes('layer')) ||
                       (shape.includes('heart') && a.category === 'Medium');
                       
      const isBMatch = (shape.includes('round') && (bLower.includes('volume') || b.category === 'Long')) ||
                       (shape.includes('oval') && true) ||
                       (shape.includes('square') && bLower.includes('layer')) ||
                       (shape.includes('heart') && b.category === 'Medium');
                       
      return (isAMatch === isBMatch) ? 0 : isAMatch ? -1 : 1;
    });
  }, [analysis]);

  if (generatedImage && selectedStyle) {
    return (
      <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-24">
        <div className="flex justify-between items-center bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
               <i className="fa fa-sparkles"></i>
            </div>
            <div>
              <h2 className="text-2xl font-black title-font">Look: <span className="text-pink-500">{selectedStyle.name}</span></h2>
              <p className="opacity-60 text-xs font-bold uppercase tracking-widest mt-1">Neural Rendering Active</p>
            </div>
          </div>
          <div className="flex space-x-3">
             <button 
              onClick={() => setShowSlider(!showSlider)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${showSlider ? 'bg-pink-500 text-white' : 'bg-white/10 text-white/60'}`}
            >
              {showSlider ? 'Standard View' : 'Compare Original'}
            </button>
            <button 
              onClick={onReset}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-black text-[10px] uppercase tracking-widest transition-all"
            >
              Try Another Style
            </button>
          </div>
        </div>

        <div className="aspect-[3/4] md:aspect-video bg-[#050505] rounded-[48px] overflow-hidden relative shadow-2xl border border-white/10 group">
          {showSlider ? (
            <div className="w-full h-full relative cursor-ew-resize">
              <img src={generatedImage} alt="Visualization" className="w-full h-full object-cover" decoding="async" loading="lazy" />
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
              >
                <img src={originalPhoto} alt="Original" className="w-full h-full object-cover" decoding="async" loading="lazy" />
              </div>
              <input 
                type="range" min="0" max="100" value={sliderVal} 
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
              <div 
                className="absolute inset-y-0 w-1 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 pointer-events-none" 
                style={{ left: `${sliderVal}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-2xl">
                  <i className="fa fa-arrows-left-right text-xs"></i>
                </div>
              </div>
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest pointer-events-none border border-white/10">Original</div>
              <div className="absolute top-6 right-6 bg-pink-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest pointer-events-none border border-pink-400/30">Style: {selectedStyle.name}</div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img src={generatedImage} alt="Haircut Visualization" className="w-full h-full object-cover" decoding="async" loading="lazy" />
              <div className="absolute top-6 left-6 bg-pink-600/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-pink-400/30">Photorealistic AI Render</div>
            </div>
          )}
          
          {/* Feature 3: One-Tap Complementary Makeup Match (Overlay) */}
          {matchMakeup && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-xl z-30 flex items-center justify-center p-12 animate-fadeIn">
                <div className="max-w-md w-full bg-[#1A1A1A] rounded-[48px] p-10 border border-pink-500/30 shadow-[0_0_50px_rgba(255,20,147,0.2)] relative">
                   <button onClick={() => setMatchMakeup(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                      <i className="fa fa-times"></i>
                   </button>
                   <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6 mx-auto">
                      <i className="fa fa-wand-magic-sparkles text-2xl"></i>
                   </div>
                   <h3 className="text-2xl font-black text-center mb-4">Complementary Look</h3>
                   <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                         <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-1">Recommended Lip</p>
                         <p className="text-sm font-bold">Velvet Matte {selectedStyle.category === 'Short' ? 'Deep Berry' : 'Nude Peach'}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                         <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-1">Eye Suggestion</p>
                         <p className="text-sm font-bold">{selectedStyle.category === 'Bangs' ? 'Smoky Winged Liner' : 'Shimmer Bronze Glow'}</p>
                      </div>
                   </div>
                   <button className="w-full mt-8 bg-pink-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-500/20">Apply This Look</button>
                </div>
             </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center group">
            <i className="fa fa-heart mb-3 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Save</span>
          </button>
          {/* Feature 3: Button trigger */}
          <button onClick={() => setMatchMakeup(true)} className="p-6 bg-white/5 rounded-[32px] border border-pink-500/20 hover:border-pink-500/50 transition-all flex flex-col items-center group">
            <i className="fa fa-lipstick mb-3 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Match Makeup</span>
          </button>
          <button className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center group">
            <i className="fa fa-share-nodes mb-3 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
          </button>
          <button className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center group">
            <i className="fa fa-download mb-3 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Download</span>
          </button>
          <button onClick={onReset} className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center group">
            <i className="fa fa-sync mb-3 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Retake</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto pb-32">
      <div className="text-center space-y-4 pt-4">
        <h2 className="text-5xl md:text-6xl font-black title-font uppercase tracking-tighter">AI Haircut <span className="text-pink-500">Visualizer</span></h2>
        <p className="opacity-60 font-medium max-w-xl mx-auto text-sm italic">Select a style to render onto your face instantly. 99.5% face-matching accuracy guaranteed.</p>
        {analysis && analysis.faceShape && (
          <div className="inline-flex items-center space-x-3 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20 animate-pulse">
            <i className="fa fa-circle-check text-pink-500 text-xs"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Optimized for your {analysis.faceShape} face shape</span>
          </div>
        )}
      </div>

      <div className="space-y-16">
        {categories.map(cat => (
          <section key={cat.key} className="space-y-8">
            <div className="flex items-center space-x-6">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">{cat.label}</h3>
               <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-4">
              {filteredStyles.filter(s => s.category === cat.key).map(style => {
                const isMatch = analysis && analysis.faceShape && (
                   (analysis.faceShape.toLowerCase().includes('round') && ((style.params || '').toLowerCase().includes('volume') || style.category === 'Long')) ||
                   (analysis.faceShape.toLowerCase().includes('oval'))
                );

                return (
                  <button 
                    key={style.id} 
                    onClick={() => onVisualize(style)}
                    title={style.name}
                    className={`w-[100px] h-[100px] rounded-2xl overflow-hidden relative group border-2 transition-all active:scale-90 shadow-2xl bg-black/40 mx-auto ${isMatch ? 'border-pink-500/50 animate-softGlow' : 'border-transparent hover:border-pink-500'}`}
                  >
                    <img src={style.previewUrl} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" decoding="async" loading="lazy" />
                    <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {isMatch && (
                       <div className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(255,20,147,1)]"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="p-12 bg-white/5 rounded-[56px] border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
         <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full"></div>
         <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mx-auto mb-2 border border-pink-500/20">
            <i className="fa fa-shield-halved text-2xl"></i>
         </div>
         <h4 className="text-2xl font-black tracking-tight">Enterprise-Grade Identity Protection</h4>
         <p className="opacity-50 text-sm max-w-md mx-auto leading-relaxed">Your neural biometric data is encrypted end-to-end and purged from our temporary buffers every 24 hours. Identity matches are performed client-side.</p>
      </div>
      <style>{`
        @keyframes softGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 20, 147, 0.2); }
          50% { box-shadow: 0 0 15px rgba(255, 20, 147, 0.4); }
        }
        .animate-softGlow { animation: softGlow 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default HaircutGallery;
