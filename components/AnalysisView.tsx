
import React, { useState } from 'react';
import { FaceAnalysis } from '../types';

interface AnalysisViewProps {
  analysis: FaceAnalysis;
  onProceed: () => void;
  onBack: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, onProceed, onBack }) => {
  const [activeLayer, setActiveLayer] = useState<'STANDARD' | 'INTELLIGENCE'>('STANDARD');
  const intel = analysis.intelligence;

  return (
    <div className="space-y-12 animate-fadeIn py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
             <span className="text-[10px] font-black uppercase tracking-[3px] text-pink-500">AI Intelligence Layer Active</span>
          </div>
          <h1 className="title-font text-5xl font-black text-white tracking-tight">Facial <span className="text-pink-500">Genome</span></h1>
          <p className="opacity-40 text-xs font-bold uppercase tracking-widest">Biometric Scan ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
        <div className="flex bg-black/40 p-2 rounded-3xl border border-white/10 self-start md:self-center">
          <button 
            onClick={() => setActiveLayer('STANDARD')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all ${activeLayer === 'STANDARD' ? 'bg-pink-500 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            Core Results
          </button>
          <button 
            onClick={() => setActiveLayer('INTELLIGENCE')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all ${activeLayer === 'INTELLIGENCE' ? 'bg-[#FFD700] text-black shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            AI Deep Scan
          </button>
        </div>
      </div>

      {activeLayer === 'STANDARD' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Section 1: Face Profile */}
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-pink-500/30 transition-all group">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fa fa-user-circle text-pink-500 mr-3 group-hover:scale-110 transition-transform"></i> Face Profile
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Face Shape', value: analysis.faceShape },
                { label: 'Symmetry', value: `${analysis.symmetry}%` },
                { label: 'Eye Shape', value: analysis.eyeShape },
                { label: 'Lip Profile', value: analysis.lipShape },
                { label: 'Brow Structure', value: analysis.eyebrowShape }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="opacity-40 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  <span className="font-bold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Skin Profile */}
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-pink-500/30 transition-all group">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fa fa-palette text-pink-500 mr-3 group-hover:scale-110 transition-transform"></i> Skin Profile
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Tone Detected', value: analysis.skinTone },
                { label: 'Undertone', value: analysis.undertone },
                { label: 'Texture Class', value: analysis.skinTexture },
                { label: 'Hydration', value: intel?.hydrationLevel || 'Normal' },
                { label: 'Acne Status', value: intel?.acneStage || 'Clear' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="opacity-40 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  <div className="flex items-center space-x-2">
                     {item.label === 'Tone Detected' && <div className="w-3 h-3 rounded-full shadow-lg" style={{backgroundColor: intel?.skinToneHex || '#D4A574'}}></div>}
                     <span className="font-bold text-sm">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Priority Concerns */}
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-pink-500/30 transition-all group">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fa fa-exclamation-triangle text-pink-500 mr-3 group-hover:scale-110 transition-transform"></i> High Priority
            </h3>
            <div className="space-y-6">
              {analysis.problemZones.map((zone, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-xs uppercase tracking-widest">{zone}</span>
                    <span className="text-pink-400 text-[10px] font-black">SCAN ALERT</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-pink-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
                  </div>
                </div>
              ))}
              <div className="pt-4 bg-pink-500/5 p-4 rounded-2xl border border-pink-500/10">
                 <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Quick Action</p>
                 <p className="text-xs font-medium opacity-80">Use color-correcting primer with green base to neutralize redness.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
           {/* Symmetry Map */}
           <div className="bg-white/5 p-10 rounded-[48px] border border-[#FFD700]/30 shadow-[0_0_40px_rgba(255,215,0,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className="fa fa-vector-square text-6xl text-[#FFD700]"></i>
              </div>
              <h4 className="text-[11px] font-black text-[#FFD700] uppercase tracking-[4px] mb-10 flex items-center">
                <i className="fa fa-face-smile-beam mr-3 text-lg"></i> Facial Symmetry Scan
              </h4>
              <div className="flex flex-col items-center justify-center space-y-8">
                 <div className="w-32 h-32 rounded-full border-4 border-[#FFD700]/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-[#FFD700] rounded-full" style={{ clipPath: `inset(0 ${100 - (intel?.symmetryScore || 92)}% 0 0)` }}></div>
                    <span className="text-4xl font-black text-white">{intel?.symmetryScore || 92}%</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                       <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-1">Left Deviation</p>
                       <p className="text-sm font-bold text-pink-400">-2.4mm</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                       <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-1">Right Deviation</p>
                       <p className="text-sm font-bold text-[#FFD700]">+1.1mm</p>
                    </div>
                 </div>
                 <p className="text-xs opacity-60 text-center italic">"Corrective contouring recommended for the lower jawline to achieve 99% perceived symmetry."</p>
              </div>
           </div>

           {/* Style Compatibility */}
           <div className="bg-white/5 p-10 rounded-[48px] border border-pink-500/30 shadow-[0_0_40px_rgba(255,20,147,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className="fa fa-wand-magic text-6xl text-pink-500"></i>
              </div>
              <h4 className="text-[11px] font-black text-pink-500 uppercase tracking-[4px] mb-10 flex items-center">
                <i className="fa fa-stars mr-3 text-lg"></i> Style Intelligence
              </h4>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-[2px] mb-3">Detected Hair Texture</p>
                    <div className="inline-flex items-center px-4 py-2 bg-pink-500/10 rounded-xl border border-pink-500/20 text-pink-400 font-black text-xs uppercase tracking-widest">
                       {intel?.hairTexture || 'Medium Wavy'}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-[2px]">Suitability Rankings</p>
                    <div className="space-y-3">
                       {['Wolf Cut (High)', 'Curtain Bangs (Med)', 'Long Layers (High)'].map((s, idx) => (
                         <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="text-xs font-bold">{s}</span>
                            <i className="fa fa-check-circle text-green-500 text-[10px]"></i>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-[2px] mb-2">Zoom Video Prep</p>
                    <p className="text-[10px] font-medium opacity-60 leading-relaxed">{intel?.zoomOptimization || 'Use high-angle lighting and cool-toned concealer under eyes.'}</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Recommendations Slider */}
      <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/5 blur-[80px] rounded-full"></div>
        <h3 className="text-xl font-bold mb-8 flex items-center group-hover:text-pink-500 transition-colors">
          <i className="fa fa-lightbulb text-pink-500 mr-3"></i> AI Intelligence Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysis.recommendations.map((rec, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <span className="w-8 h-8 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center text-[10px] font-black mb-4 border border-pink-500/10">{i+1}</span>
              <p className="text-xs font-medium leading-relaxed opacity-80">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-12">
        <button 
          onClick={onProceed}
          className="flex-1 bg-pink-500 py-8 rounded-[40px] font-black text-xl hover:bg-pink-600 transition-all transform hover:scale-[1.02] shadow-[0_20px_60px_rgba(255,20,147,0.3)] flex items-center justify-center group"
        >
          <i className="fa fa-wand-magic-sparkles mr-4 group-hover:rotate-12 transition-transform"></i> Render My Personal Guide
        </button>
        <button className="px-12 py-8 bg-white/5 rounded-[40px] font-black hover:bg-white/10 border border-white/10 transition-all uppercase tracking-[2px] text-xs">
          <i className="fa fa-share-nodes mr-3"></i> Share Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisView;
