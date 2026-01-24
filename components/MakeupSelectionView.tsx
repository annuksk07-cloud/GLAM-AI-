
import React from 'react';
import { Occasion, CountryStyle } from '../types';
import { OCCASIONS, COUNTRIES } from '../constants';

interface MakeupSelectionViewProps {
  onSelectOccasion: (occ: Occasion) => void;
  onSelectCountry: (country: CountryStyle) => void;
}

const MakeupSelectionView: React.FC<MakeupSelectionViewProps> = ({ onSelectOccasion, onSelectCountry }) => {
  return (
    <div className="space-y-12 animate-fadeIn py-6">
      <div className="text-center md:text-left space-y-2 mb-10">
        <h1 className="title-font text-5xl font-black text-white tracking-tight">Makeup <span className="text-pink-500">Selection</span></h1>
        <p className="opacity-60 text-sm font-bold uppercase tracking-widest">Select your style and occasion for professional AI rendering</p>
      </div>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-black mb-8 flex items-center uppercase tracking-widest text-pink-500">
            <i className="fa fa-wand-magic-sparkles mr-4"></i> Makeup Occasion Selection
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {OCCASIONS.map(occ => (
              <button 
                key={occ.value}
                onClick={() => onSelectOccasion(occ.value)}
                className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl hover:bg-pink-500/20 transition-all border border-transparent hover:border-pink-500 group"
              >
                <i className={`fa ${occ.icon} text-3xl mb-4 group-hover:scale-110 transition-transform`}></i>
                <span className="text-xs font-black uppercase tracking-widest">{occ.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-black mb-8 flex items-center uppercase tracking-widest text-pink-500">
            <i className="fa fa-globe mr-4"></i> Makeup Cultural Trends
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {COUNTRIES.map(country => (
              <button 
                key={country.value}
                onClick={() => onSelectCountry(country.value)}
                className="flex items-center justify-center p-6 bg-white/5 rounded-3xl hover:bg-pink-500/20 transition-all border border-transparent hover:border-pink-500"
              >
                <span className="text-sm font-black uppercase tracking-widest">{country.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeupSelectionView;
