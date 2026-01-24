
import React from 'react';
import { ThemeType, Language, ViewState } from '../types';
import { THEMES } from '../constants';

interface SettingsViewProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (view: ViewState) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  currentTheme, 
  onThemeChange, 
  currentLanguage, 
  onLanguageChange,
  onNavigate
}) => {
  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto py-8">
      <div className="text-center md:text-left space-y-2">
        <h1 className="title-font text-5xl font-black text-white tracking-tight">Settings</h1>
        <p className="opacity-60 text-sm font-bold uppercase tracking-widest text-pink-500">Configure your personal GLAM AI experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Theme Selection */}
        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-md">
          <h2 className="text-xl font-black mb-6 flex items-center uppercase tracking-widest text-pink-500">
            <i className="fa fa-palette mr-4"></i> Choose Theme
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(ThemeType).map((t) => (
              <button 
                key={t}
                onClick={() => onThemeChange(t as ThemeType)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${currentTheme === t ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 hover:border-pink-500/50 bg-white/5'}`}
              >
                <span className="text-xs font-bold uppercase truncate pr-2">{t.replace('_', ' ')}</span>
                <div className={`w-4 h-4 rounded-full border border-white/20 ${THEMES[t as ThemeType].split(' ')[0]}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-md">
          <h2 className="text-xl font-black mb-6 flex items-center uppercase tracking-widest text-pink-500">
            <i className="fa fa-globe mr-4"></i> Choose Language
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(Language).map((l) => (
              <button 
                key={l}
                onClick={() => onLanguageChange(l as Language)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${currentLanguage === l ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 hover:border-pink-500/50 bg-white/5'}`}
              >
                <span className="text-sm font-bold">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legal & Security */}
      <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl backdrop-blur-md">
        <h2 className="text-xl font-black mb-8 flex items-center uppercase tracking-widest text-pink-500">
          <i className="fa fa-shield-halved mr-4"></i> Privacy, Terms & Security
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button 
            onClick={() => onNavigate('PRIVACY')}
            className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-pink-500/10 hover:border-pink-500 transition-all text-center group"
          >
            <i className="fa fa-user-shield text-2xl mb-4 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="block text-xs font-black uppercase tracking-widest">Privacy Policy</span>
          </button>
          
          <button 
            onClick={() => onNavigate('TERMS')}
            className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-pink-500/10 hover:border-pink-500 transition-all text-center group"
          >
            <i className="fa fa-file-signature text-2xl mb-4 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="block text-xs font-black uppercase tracking-widest">Terms & Conditions</span>
          </button>

          <button 
            onClick={() => onNavigate('SECURITY')}
            className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-pink-500/10 hover:border-pink-500 transition-all text-center group"
          >
            <i className="fa fa-lock text-2xl mb-4 text-pink-500 group-hover:scale-110 transition-transform"></i>
            <span className="block text-xs font-black uppercase tracking-widest">Security</span>
          </button>
        </div>
      </div>

      <div className="text-center opacity-30 text-[10px] font-black uppercase tracking-[5px]">
        GLAM AI v2.4.0 Engine - Verified
      </div>
    </div>
  );
};

export default SettingsView;
