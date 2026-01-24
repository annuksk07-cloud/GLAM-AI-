
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  onStartAnalysis: () => void;
  onStartHaircuts?: () => void;
  onStartWeddingDresses?: () => void;
  onStartPersonality?: () => void;
  onStartDesigner?: () => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onStartAnalysis, 
  onStartHaircuts, 
  onStartWeddingDresses, 
  onStartPersonality,
  onStartDesigner,
  language 
}) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="text-center md:text-left space-y-6">
        <h1 className="title-font text-5xl md:text-7xl font-black leading-tight tracking-tighter text-white">
          {TRANSLATIONS.DASHBOARD_TITLE[language].split(' AI ')[0]} <span className="text-pink-500">AI Stylist</span>.
        </h1>
        <p className="text-xl opacity-80 max-w-2xl font-medium leading-relaxed text-white/80">
          The world's most advanced neural engine for personalized beauty. Discover professional makeup, hair, and bridal fashion visualization.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
          <button 
            onClick={onStartAnalysis}
            className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/20 flex items-center justify-center"
          >
            <i className="fa fa-wand-magic-sparkles mr-3"></i> Makeup Designer
          </button>
          
          <button 
            onClick={onStartDesigner}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/20 flex items-center justify-center"
          >
            <i className="fa fa-palette mr-3"></i> Global Dress Designer
          </button>

          <button 
            onClick={onStartWeddingDresses}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/20 flex items-center justify-center"
          >
            <i className="fa fa-ring mr-3"></i> Wedding Section
          </button>

          <button 
            onClick={onStartHaircuts}
            className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 backdrop-blur-md border border-white/10 flex items-center justify-center"
          >
            <i className="fa fa-scissors mr-3"></i> Haircut Visualizer
          </button>

          <button 
            onClick={onStartPersonality}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/20 flex items-center justify-center"
          >
            <i className="fa fa-user-astronaut mr-3"></i> Personality Stylist
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div onClick={onStartDesigner} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-yellow-500/50 transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><i className="fa fa-palette text-4xl"></i></div>
          <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <i className="fa fa-palette text-2xl"></i>
          </div>
          <h3 className="text-xl font-black mb-2 text-white">Dress Designer</h3>
          <p className="text-sm opacity-50 font-medium text-white/60">Craft custom bridal and fashion looks from a global catalog of 100+ designs.</p>
        </div>

        <div onClick={onStartWeddingDresses} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-orange-500/50 transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><i className="fa fa-crown text-4xl"></i></div>
          <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <i className="fa fa-crown text-2xl"></i>
          </div>
          <h3 className="text-xl font-black mb-2 text-white">Global Bridal</h3>
          <p className="text-sm opacity-50 font-medium text-white/60">Try on 100+ wedding dresses from cultures around the world instantly.</p>
        </div>

        <div onClick={onStartPersonality} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><i className="fa fa-user-astronaut text-4xl"></i></div>
          <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <i className="fa fa-user-astronaut text-2xl"></i>
          </div>
          <h3 className="text-xl font-black mb-2 text-white">AI Persona</h3>
          <p className="text-sm opacity-50 font-medium text-white/60">Define your personality style and transform your look with AI strategy.</p>
        </div>

        <div onClick={onStartHaircuts} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-pink-500/50 transition-all group cursor-pointer">
          <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <i className="fa fa-scissors text-2xl"></i>
          </div>
          <h3 className="text-xl font-black mb-2 text-white">New: Haircuts</h3>
          <p className="text-sm opacity-50 font-medium text-white/60">Visualize 30+ trending styles on your face before you visit the salon.</p>
        </div>
        
        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-green-500/50 transition-all group relative overflow-hidden">
          <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <i className="fa fa-shopping-bag text-2xl"></i>
          </div>
          <h3 className="text-xl font-black mb-2 text-white">Inventory</h3>
          <p className="text-sm opacity-50 font-medium text-white/60">3 products in your virtual wardrobe are approaching expiry. Restock now.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
