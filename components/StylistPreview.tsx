
import React, { useState } from 'react';
import { StylistLook } from '../types';

interface StylistPreviewProps {
  looks: StylistLook[];
  onClose: () => void;
}

const StylistPreview: React.FC<StylistPreviewProps> = ({ looks, onClose }) => {
  const [activeLook, setActiveLook] = useState(0);

  const handleDownload = (look: StylistLook) => {
    if (!look?.imageUrl) return;
    const link = document.createElement('a');
    link.href = look.imageUrl;
    const safeTitle = (look.title || 'style').toLowerCase().replace(/\s+/g, '_');
    link.download = `glam_ai_stylist_${safeTitle}.png`;
    link.click();
  };

  const handleShare = async (look: StylistLook) => {
    if (!look) return;
    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title: `My GLAM AI ${look.title || 'Personal'} Look`,
          text: `Just got my ${look.title || 'custom'} styling from GLAM AI! #GLAMAI #AIStylist`,
        };

        const currentUrl = window.location.href;
        if (currentUrl.startsWith('http')) {
          shareData.url = currentUrl;
        }

        await navigator.share(shareData);
      }
    } catch (err) {
      // Ignore user cancellation errors
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Sharing failed:', err);
      }
    }
  };

  const look = looks[activeLook];

  return (
    <div className="space-y-8 animate-fadeIn py-6 max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[3px] text-pink-500">AI Stylist Engine Results</span>
          <h1 className="title-font text-4xl font-black text-white tracking-tight">Your Personalized <span className="text-pink-500">Style Profile</span></h1>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
          <i className="fa fa-times text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Look Navigation */}
        <div className="lg:col-span-3 space-y-4">
          {looks.map((l, i) => (
            <button
              key={i}
              onClick={() => setActiveLook(i)}
              className={`w-full text-left p-6 rounded-3xl border transition-all ${activeLook === i ? 'bg-pink-500 border-pink-400 shadow-xl shadow-pink-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${activeLook === i ? 'text-white/60' : 'text-pink-500'}`}>Look {i + 1}</span>
              <span className="block text-lg font-black">{l.title || 'Untitled Style'}</span>
            </button>
          ))}
          
          <div className="p-8 bg-[#FFD700]/5 rounded-[40px] border border-[#FFD700]/20 mt-10">
            <h4 className="text-[10px] font-black text-[#FFD700] uppercase tracking-[3px] mb-4">Stylist Insight</h4>
            <p className="text-xs font-medium opacity-70 leading-relaxed italic">"These looks were rendered based on your body type and skin tones."</p>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="lg:col-span-5">
          <div className="aspect-[9/16] bg-black rounded-[56px] overflow-hidden border border-white/10 shadow-2xl relative group">
            {look?.imageUrl ? (
              <img src={look.imageUrl} alt={look.title} className="w-full h-full object-cover animate-scaleUp" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                 <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-xs font-black uppercase opacity-40">Rendering Look...</span>
              </div>
            )}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">AI Rendered Preview</div>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-xl space-y-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">Outfit Selection</h4>
                <p className="text-sm font-bold text-white/90 leading-relaxed">{look?.outfit || 'Generating selection...'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">Makeup Palette</h4>
                <p className="text-sm font-bold text-white/90 leading-relaxed">{look?.makeup || 'Generating palette...'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">Hair Styling</h4>
                <p className="text-sm font-bold text-white/90 leading-relaxed">{look?.hair || 'Generating style...'}</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Style Notes</h4>
                <p className="text-xs font-medium text-white/60 leading-relaxed">{look?.notes || 'No notes available.'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-6">
              <button 
                onClick={() => handleDownload(look)}
                className="w-full bg-pink-500 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all"
              >
                <i className="fa fa-download mr-3"></i> Download Look
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/5 py-6 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                  <i className="fa fa-save mr-3"></i> Save
                </button>
                <button 
                  onClick={() => handleShare(look)}
                  className="bg-[#00FFFF] py-6 rounded-3xl font-black text-xs uppercase tracking-widest text-black hover:scale-[1.02] transition-all"
                >
                  <i className="fa fa-share-nodes mr-3"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistPreview;
