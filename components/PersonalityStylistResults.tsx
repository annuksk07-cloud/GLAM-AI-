
import React, { useState } from 'react';
import { PersonalityStylistData } from '../types';

interface PersonalityStylistResultsProps {
  data: PersonalityStylistData;
  onFinish: (selections: string[]) => void;
  onClose: () => void;
}

const PersonalityStylistResults: React.FC<PersonalityStylistResultsProps> = ({ data, onFinish, onClose }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const categories = [
    { key: 'hair', label: 'Hair Style', icon: 'fa-scissors', options: data.hair },
    { key: 'clothing', label: 'Clothing', icon: 'fa-shirt', options: data.clothing },
    { key: 'jeans', label: 'Jeans & Bottoms', icon: 'fa-person-half-dress', options: data.jeans },
    { key: 'jewelry', label: 'Jewelry', icon: 'fa-gem', options: data.jewelry },
    { key: 'shoes', label: 'Shoes', icon: 'fa-shoe-prints', options: data.shoes }
  ];

  const handleSelect = (catKey: string, option: string) => {
    setSelections(prev => ({ ...prev, [catKey]: option }));
  };

  const isComplete = Object.keys(selections).length === categories.length;

  return (
    <div className="space-y-10 animate-fadeIn py-6 max-w-5xl mx-auto pb-32">
      <div className="flex justify-between items-center bg-white/5 p-10 rounded-[48px] border border-white/10 backdrop-blur-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[3px] text-pink-500">Styling Strategy</span>
          <h1 className="title-font text-4xl font-black text-white tracking-tight">The <span className="text-pink-500">{data.personalityProfile}</span> Profile</h1>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-500/20 transition-all">
          <i className="fa fa-times"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {categories.map((cat, idx) => (
          <section key={cat.key} className="space-y-6">
            <div className="flex items-center space-x-4 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                 <i className={`fa ${cat.icon}`}></i>
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest">{cat.label}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cat.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(cat.key, option)}
                  className={`p-6 rounded-[32px] border text-left transition-all relative overflow-hidden group ${selections[cat.key] === option ? 'bg-pink-500 border-pink-400 shadow-xl shadow-pink-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <p className={`text-sm font-bold ${selections[cat.key] === option ? 'text-white' : 'text-white/80'}`}>{option}</p>
                  {selections[cat.key] === option && (
                    <div className="absolute top-4 right-4 text-white">
                      <i className="fa fa-check-circle"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-white/5 p-10 rounded-[48px] border border-[#FFD700]/30 space-y-6">
        <h4 className="text-[10px] font-black text-[#FFD700] uppercase tracking-[4px]">Personality Transformation Protocol</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.transformation.map((tip, idx) => (
            <div key={idx} className="flex space-x-4 italic opacity-80 text-sm">
               <span className="text-pink-500 font-black">#0{idx + 1}</span>
               <p>"{tip}"</p>
            </div>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-[100] animate-slideUp">
           <button 
             onClick={() => onFinish(Object.values(selections))}
             className="w-full bg-pink-500 py-8 rounded-[40px] font-black text-xl hover:bg-pink-600 transition-all shadow-[0_20px_60px_rgba(255,20,147,0.4)] flex items-center justify-center space-x-4 border border-pink-400/30"
           >
             <i className="fa fa-wand-magic-sparkles"></i>
             <span>Generate Final Render</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default PersonalityStylistResults;
