
import React, { useState } from 'react';

interface PersonalityStylistFinalProps {
  image: string;
  onRetry: () => void;
  onClose: () => void;
}

const PersonalityStylistFinal: React.FC<PersonalityStylistFinalProps> = ({ image, onRetry, onClose }) => {
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `glam_ai_personality_style.png`;
    link.click();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title: 'My GLAM AI Personality Style',
          text: `Check out my new AI-generated style from GLAM AI! #GLAMAI #AIStylist`,
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

  return (
    <div className="fixed inset-0 z-[160] bg-black/95 flex flex-col items-center justify-center p-6 backdrop-blur-3xl animate-fadeIn">
      <div className="w-full max-w-2xl bg-white/5 rounded-[56px] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-full md:h-auto">
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[4px] text-pink-500">Personality Render Result</span>
            <h2 className="title-font text-3xl font-black text-white tracking-tight">Your New Persona</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
            <i className="fa fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center min-h-[400px]">
           <img src={image} alt="Stylist Result" className="max-w-full max-h-full object-contain animate-scaleUp" />
           <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Neural Style Overlay</div>
        </div>

        <div className="p-10 bg-black/40 backdrop-blur-md space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleDownload}
              className="flex items-center justify-center space-x-3 py-5 px-6 bg-[#FF1493] hover:bg-[#FF1493]/80 rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20"
            >
              <i className="fa fa-download"></i>
              <span>Download</span>
            </button>

            <button 
              onClick={handleSave}
              className={`flex items-center justify-center space-x-3 py-5 px-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${saved ? 'bg-green-500 text-white' : 'bg-[#FFD700] hover:bg-[#FFD700]/80 text-black'}`}
            >
              <i className={`fa ${saved ? 'fa-check' : 'fa-save'}`}></i>
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center justify-center space-x-3 py-5 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              <i className="fa fa-share-nodes"></i>
              <span>Share</span>
            </button>
          </div>
          
          <button 
            onClick={onRetry}
            className="w-full py-5 border-2 border-white/10 rounded-3xl font-black text-xs uppercase tracking-[3px] hover:bg-white/5 transition-all flex items-center justify-center space-x-4"
          >
            <i className="fa fa-rotate-right"></i>
            <span>Try Another Option</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityStylistFinal;
