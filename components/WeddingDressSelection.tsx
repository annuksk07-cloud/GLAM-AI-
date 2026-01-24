
import React, { useState } from 'react';
import { WeddingDress } from '../types';
import { WEDDING_DRESSES } from '../constants';

interface WeddingDressSelectionProps {
  onSelect: (dress: WeddingDress) => void;
  onClose: () => void;
}

const WeddingDressSelection: React.FC<WeddingDressSelectionProps> = ({ onSelect, onClose }) => {
  const [filterCulture, setFilterCulture] = useState<string>('All');
  const [filterOccasion, setFilterOccasion] = useState<string>('All');
  const [search, setSearch] = useState('');

  const cultures = ['All', 'Western', 'Indian', 'Chinese', 'Japanese', 'Middle Eastern', 'African'];
  const occasions = ['All', 'Traditional', 'Modern', 'Cultural', 'Fusion'];

  const filteredDresses = WEDDING_DRESSES.filter(d => {
    const matchesCulture = filterCulture === 'All' || d.culture === filterCulture;
    const matchesOccasion = filterOccasion === 'All' || d.occasion === filterOccasion;
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchesCulture && matchesOccasion && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn py-6">
      <div className="flex justify-between items-center">
        <h1 className="title-font text-4xl font-black text-white tracking-tight">Global Wedding <span className="text-pink-500">Dress Try-On</span></h1>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
          <i className="fa fa-times"></i>
        </button>
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/30"></i>
            <input 
              type="text" 
              placeholder="Search 100+ global designs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-pink-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {cultures.map(c => (
              <button 
                key={c}
                onClick={() => setFilterCulture(c)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filterCulture === c ? 'bg-pink-500 border-pink-400 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-[10px] font-black uppercase text-white/30 self-center mr-2">Style:</span>
          {occasions.map(o => (
            <button 
              key={o}
              onClick={() => setFilterOccasion(o)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filterOccasion === o ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
        {filteredDresses.map(dress => (
          <button 
            key={dress.id}
            onClick={() => onSelect(dress)}
            className="group relative bg-white/5 rounded-[40px] overflow-hidden border border-white/10 hover:border-pink-500 transition-all text-left"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/10 to-transparent flex items-center justify-center p-8">
               <i className={`fa ${dress.culture === 'Western' ? 'fa-female' : dress.culture === 'Indian' ? 'fa-gem' : 'fa-crown'} text-5xl text-pink-500/20 group-hover:scale-110 transition-transform duration-500`}></i>
            </div>
            <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-pink-500">{dress.culture}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/40">{dress.occasion}</span>
               </div>
               <h3 className="font-black text-sm text-white group-hover:text-pink-400 transition-colors truncate">{dress.name}</h3>
               <p className="text-[10px] opacity-40 line-clamp-1 mt-1">{dress.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeddingDressSelection;
