
import React, { useState } from 'react';
import { WeddingDress } from '../types';
import { WEDDING_DRESS_NAMES, COUNTRIES, OCCASIONS } from '../constants';

interface GlobalDressDesignerProps {
  onVisualize: (dress: Partial<WeddingDress>) => void;
  onClose: () => void;
}

const GlobalDressDesigner: React.FC<GlobalDressDesignerProps> = ({ onVisualize, onClose }) => {
  const [selectedCulture, setSelectedCulture] = useState<string>('USA');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('WEDDING');
  const [selectedDressName, setSelectedDressName] = useState<string>('');

  const handleDesign = () => {
    if (!selectedDressName) {
      alert("Please select a dress name first!");
      return;
    }
    onVisualize({
      name: selectedDressName,
      culture: selectedCulture,
      occasion: selectedOccasion,
      styleParams: `designer_look: name=${selectedDressName}, culture=${selectedCulture}, occasion=${selectedOccasion}`
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn py-6 max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center bg-white/5 p-10 rounded-[48px] border border-white/10 backdrop-blur-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[3px] text-pink-500">Neural Design Studio</span>
          <h1 className="title-font text-4xl font-black text-white tracking-tight">Global <span className="text-pink-500">Dress Designer</span></h1>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
          <i className="fa fa-times text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-10">
          {/* CULTURE SELECTION (6x2) */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[4px] text-pink-500 px-4">Culture Selection</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {COUNTRIES.map(c => (
                <button 
                  key={c.value}
                  onClick={() => setSelectedCulture(c.value)}
                  className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all ${selectedCulture === c.value ? 'bg-pink-500 border-pink-400 text-white shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <i className={`fa ${c.icon} text-lg mb-2`}></i>
                  <span className="text-[8px] font-black uppercase text-center">{c.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* OCCASION SELECTION (4x2) */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[4px] text-pink-500 px-4">Occasion Selection</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OCCASIONS.slice(2).map(o => (
                <button 
                  key={o.value}
                  onClick={() => setSelectedOccasion(o.value)}
                  className={`flex flex-col items-center justify-center p-5 rounded-3xl border transition-all ${selectedOccasion === o.value ? 'bg-pink-500 border-pink-400 text-white shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <i className={`fa ${o.icon} text-xl mb-2`}></i>
                  <span className="text-[8px] font-black uppercase text-center">{o.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* DRESS NAME SELECTION (6x5) */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[4px] text-pink-500 px-4">Dress Name Selection</h3>
          <div className="bg-white/5 rounded-[40px] border border-white/10 p-6 h-[400px] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WEDDING_DRESS_NAMES.map(name => (
                <button 
                  key={name}
                  onClick={() => setSelectedDressName(name)}
                  className={`p-4 rounded-2xl border text-left transition-all ${selectedDressName === name ? 'bg-pink-500 border-pink-400 text-white shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <span className="text-[10px] font-bold line-clamp-2">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-[100] animate-slideUp">
         <button 
           onClick={handleDesign}
           className="w-full bg-pink-500 py-8 rounded-[40px] font-black text-xl hover:bg-pink-600 transition-all shadow-[0_20px_60px_rgba(255,20,147,0.4)] flex items-center justify-center space-x-4 border border-pink-400/30"
         >
           <i className="fa fa-wand-magic-sparkles"></i>
           <span>Render Custom Design</span>
         </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 20, 147, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 20, 147, 0.4); }
      `}</style>
    </div>
  );
};

export default GlobalDressDesigner;
