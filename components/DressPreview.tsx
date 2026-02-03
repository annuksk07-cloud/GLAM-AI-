
import React, { useState } from 'react';
import { WeddingDress } from '../types';

interface DressPreviewProps {
  image: string;
  dress: WeddingDress;
  onClose: () => void;
}

const DressPreview: React.FC<DressPreviewProps> = ({ image, dress, onClose }) => {
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    const safeName = (dress.name || 'look').toLowerCase().replace(/\s+/g, '_');
    link.download = `glam_ai_${safeName}.png`;
    link.click();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // In a real app, logic would send to backend/firebase here
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title: 'My GLAM AI Wedding Look',
          text: `Just tried on the ${dress.name || 'this look'} with GLAM AI! #GLAMAI #WeddingStyle`,
        };

        const currentUrl = window.location.href;
        if (currentUrl.startsWith('http')) {
          shareData.url = currentUrl;
        }

        await navigator.share(shareData);
      } else {
        console.warn('Web Share API not supported');
      }
    } catch (err) {
      // Ignore user cancellation errors
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Sharing failed:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 flex flex-col items-center justify-center p-6 backdrop-blur-3xl animate-fadeIn">
      <div className="w-full max-w-2xl bg-white/5 rounded-[56px] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-full md:h-auto">
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[4px] text-pink-500">Neural Try-On Result</span>
            <h2 className="title-font text-3xl font-black text-white tracking-tight">{dress.name || 'Custom Look'}</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
            <i className="fa fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center min-h-[400px]">
           <img src={image} alt="Try On Result" className="max-w-full max-h-full object-contain animate-scaleUp" />
           <div className="absolute inset-0 border-2 border-pink-500/20 pointer-events-none"></div>
        </div>

        <div className="p-8 bg-black/40 backdrop-blur-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleDownload}
              className="flex items-center justify-center space-x-3 py-4 px-6 bg-[#FF1493] hover:bg-[#FF1493]/80 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20"
            >
              <i className="fa fa-download"></i>
              <span>Download Image</span>
            </button>

            <button 
              onClick={handleSave}
              className={`flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${saved ? 'bg-green-500 text-white' : 'bg-[#FFD700] hover:bg-[#FFD700]/80 text-black shadow-yellow-500/20'}`}
            >
              <i className={`fa ${saved ? 'fa-check' : 'fa-save'}`}></i>
              <span>{saved ? 'Saved!' : 'Save to Gallery'}</span>
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center justify-center space-x-3 py-4 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
            >
              <i className="fa fa-share-nodes"></i>
              <span>Share to Social</span>
            </button>
          </div>
          
          <div className="flex justify-between items-center opacity-40 text-[10px] font-black uppercase tracking-[2px] pt-4 border-t border-white/5">
             <span className="flex items-center"><i className="fa fa-globe mr-2"></i> Culture: {dress.culture || 'Universal'}</span>
             <span className="flex items-center"><i className="fa fa-shield-check mr-2"></i> Verified Result</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressPreview;
