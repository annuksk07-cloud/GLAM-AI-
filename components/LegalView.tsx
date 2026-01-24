
import React from 'react';
import { ViewState } from '../types';

interface LegalViewProps {
  type: 'PRIVACY' | 'TERMS' | 'SECURITY';
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  const content = {
    PRIVACY: {
      title: 'Privacy Policy',
      icon: 'fa-user-shield',
      text: `Your privacy is our priority. GLAM AI uses advanced neural processing to analyze facial biometrics. 
      All images are processed securely. We do not sell your personal data. 
      Facial maps are used exclusively to provide personalized makeup and haircut recommendations. 
      Storage is ephemeral and deleted after a set period of inactivity unless you explicitly save your lookbook.`
    },
    TERMS: {
      title: 'Terms & Conditions',
      icon: 'fa-file-signature',
      text: `By using GLAM AI, you agree that this application is for cosmetic and style visualization purposes only. 
      The AI renders are simulations and may not exactly match real-world results. 
      You are responsible for any actions taken based on the AI recommendations. 
      Always patch test cosmetics before full application. 
      GLAM AI is not liable for skin reactions or hair styling choices made outside the app.`
    },
    SECURITY: {
      title: 'Security',
      icon: 'fa-lock',
      text: `GLAM AI employs enterprise-grade security protocols. 
      All data transmissions are encrypted using SSL/TLS. 
      Facial biometric data is stored in isolated, encrypted partitions. 
      Our systems are audited daily for integrity by the GLAM AI Guardian protocol. 
      We use multi-factor authentication for internal systems to ensure your data remains your own.`
    }
  };

  const current = content[type];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn py-12">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-pink-500 font-black uppercase tracking-widest text-xs hover:opacity-70"
      >
        <i className="fa fa-arrow-left"></i>
        <span>Back to Settings</span>
      </button>

      <div className="bg-white/5 p-12 rounded-[56px] border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500 mb-8 border border-pink-500/20">
          <i className={`fa ${current.icon} text-2xl`}></i>
        </div>
        <h1 className="title-font text-4xl font-black mb-6">{current.title}</h1>
        <div className="space-y-6 opacity-80 leading-relaxed font-medium">
          {current.text.split('. ').map((sentence, i) => (
            <p key={i}>{sentence}.</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalView;
