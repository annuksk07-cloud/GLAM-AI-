
import React from 'react';
import { ThemeType, Language, ViewState } from '../types';
import { THEMES, TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onNavigate?: (view: ViewState | 'START_STYLIST' | 'START_PERSONALITY' | 'START_DESIGNER') => void;
  language: Language;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, onThemeChange, onNavigate, language }) => {
  const t = (key: string) => TRANSLATIONS[key]?.[language] || key;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${THEMES[theme]}`}>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-inherit border-b border-gray-200/20 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate?.('DASHBOARD')}>
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">G</div>
          <span className="title-font text-2xl font-bold tracking-tight">GLAM AI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => onNavigate?.('DASHBOARD')} className="hover:text-pink-400 font-medium transition-colors">{t('HOME')}</button>
          <button onClick={() => onNavigate?.('MAKEUP_SELECTION')} className="hover:text-pink-400 font-medium transition-colors">{t('MAKEUP')}</button>
          <button onClick={() => onNavigate?.('START_DESIGNER')} className="text-yellow-400 hover:text-yellow-300 font-black transition-colors">{t('DESIGNER')}</button>
          <button onClick={() => onNavigate?.('HAIRCUTS')} className="hover:text-pink-400 font-medium transition-colors">{t('HAIRCUTS')}</button>
          <button onClick={() => onNavigate?.('WEDDING_DRESS_SELECTION')} className="hover:text-pink-400 font-medium transition-colors">{t('WEDDING')}</button>
          <button onClick={() => onNavigate?.('START_PERSONALITY')} className="text-pink-400 hover:text-pink-300 font-black transition-colors">{t('PERSONALITY')}</button>
          <button onClick={() => onNavigate?.('SETTINGS')} className="hover:text-pink-400 font-medium transition-colors">{t('SETTINGS')}</button>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => onNavigate?.('SETTINGS')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
             <i className="fa fa-cog text-white/80 text-sm"></i>
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden border-2 border-pink-500/30">
             <i className="fa fa-user text-gray-600"></i>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        {children}
      </main>

      {/* Bottom Mobile-Friendly Navigation */}
      <div className="fixed bottom-0 w-full z-[90] bg-black/60 backdrop-blur-2xl border-t border-white/10 px-4 py-4 md:hidden">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button onClick={() => onNavigate?.('DASHBOARD')} className="flex flex-col items-center space-y-1 text-white/60 hover:text-pink-500 transition-all">
            <i className="fa fa-home text-lg"></i>
            <span className="text-[7px] font-black uppercase">{t('HOME')}</span>
          </button>
          <button onClick={() => onNavigate?.('MAKEUP_SELECTION')} className="flex flex-col items-center space-y-1 text-white/60 hover:text-pink-500 transition-all">
            <i className="fa fa-wand-magic-sparkles text-lg"></i>
            <span className="text-[7px] font-black uppercase">{t('MAKEUP')}</span>
          </button>
          <button onClick={() => onNavigate?.('START_DESIGNER')} className="flex flex-col items-center space-y-1 text-yellow-400 hover:text-yellow-300 transition-all scale-110">
            <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
               <i className="fa fa-palette text-lg"></i>
            </div>
            <span className="text-[7px] font-black uppercase">Designer</span>
          </button>
          <button onClick={() => onNavigate?.('START_PERSONALITY')} className="flex flex-col items-center space-y-1 text-pink-500 transition-all scale-110">
            <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
               <i className="fa fa-user-astronaut text-lg"></i>
            </div>
            <span className="text-[7px] font-black uppercase">Persona</span>
          </button>
          <button onClick={() => onNavigate?.('HAIRCUTS')} className="flex flex-col items-center space-y-1 text-white/60 hover:text-pink-500 transition-all">
            <i className="fa fa-scissors text-xl"></i>
            <span className="text-[7px] font-black uppercase">{t('HAIRCUTS')}</span>
          </button>
        </div>
      </div>

      <footer className="py-8 border-t border-gray-200/10 text-center text-sm opacity-60 flex flex-col items-center space-y-4">
        <p>&copy; 2024 GLAM AI - Professional Generative Style Intelligence.</p>
        <div className="flex space-x-6 text-[10px] font-black uppercase tracking-widest">
           <button onClick={() => onNavigate?.('PRIVACY')} className="hover:text-pink-500">Privacy</button>
           <button onClick={() => onNavigate?.('TERMS')} className="hover:text-pink-500">Terms</button>
           <button onClick={() => onNavigate?.('SECURITY')} className="hover:text-pink-500">Security</button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
