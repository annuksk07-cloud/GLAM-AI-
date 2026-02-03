
import React, { useState, useEffect } from 'react';
import { MakeupStep, FaceAnalysis } from '../types';

interface TutorialPlayerProps {
  steps: MakeupStep[];
  onComplete: () => void;
  onLoadStepImage: (index: number) => Promise<void>;
  originalPhoto: string;
  analysis?: FaceAnalysis | null;
}

const TutorialPlayer: React.FC<TutorialPlayerProps> = ({ steps, onComplete, onLoadStepImage, originalPhoto, analysis }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBefore, setShowBefore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'STANDARD' | 'INTEL'>('STANDARD');
  
  const step = steps[currentStep];

  useEffect(() => {
    if (!step?.generatedImageUrl) {
      const load = async () => {
        setIsGenerating(true);
        await onLoadStepImage(currentStep);
        setIsGenerating(false);
      };
      load();
    }
  }, [currentStep, step?.generatedImageUrl, onLoadStepImage]);

  if (!step) return null;

  // Personalized Pro Tip Logic with safety checks
  const getFaceSpecificTip = () => {
    if (!analysis) return null;
    const shape = (analysis.faceShape || '').toLowerCase();
    const eyeShape = (analysis.eyeShape || '').toLowerCase();
    const stepName = (step.name || '').toLowerCase();
    
    if (stepName.includes('contour')) {
      if (shape.includes('round')) return "Apply contour slightly higher on your cheekbones to create the illusion of length.";
      if (shape.includes('square')) return "Focus contour on the outer corners of your jawline to soften your structure.";
      if (shape.includes('heart')) return "Keep contour light on the chin and focus on the sides of your forehead.";
    }
    
    if (stepName.includes('liner') || stepName.includes('eye')) {
      if (eyeShape.includes('hooded')) return "Apply eyeshadow slightly above your natural crease for visibility.";
      if (eyeShape.includes('almond')) return "Emphasize the outer corners for a classic cat-eye effect.";
    }

    if (!shape) return null;
    return `Based on your ${shape} face, ensure seamless blending toward the hairline.`;
  };

  const faceTip = getFaceSpecificTip();

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-24">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 p-8 rounded-[48px] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-pink-500/10 blur-[60px] rounded-full"></div>
        <div className="flex items-center space-x-8 relative z-10">
          <div className="bg-pink-500 text-white w-20 h-20 rounded-[28px] flex items-center justify-center font-black text-3xl shadow-[0_15px_40px_rgba(255,20,147,0.4)] border border-pink-400/30">
            {step.step}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
               <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-[3px] text-pink-400">Professional Intelligence Active</span>
            </div>
            <h2 className="text-4xl font-black title-font tracking-tight leading-none text-white">{step.name}</h2>
            <div className="flex items-center space-x-6 mt-4 text-[10px] font-black uppercase tracking-[2px] opacity-60">
              <span className="flex items-center text-[#FFD700]">
                <i className="fa fa-star mr-2"></i>
                Expert Rating: {step.difficulty}
              </span>
              <span className="flex items-center text-pink-400">
                <i className="fa fa-clock mr-2"></i>
                Est. {step.duration}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 relative z-10">
          <button 
            onClick={() => setViewMode(viewMode === 'STANDARD' ? 'INTEL' : 'STANDARD')}
            className={`px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[2px] transition-all border ${viewMode === 'INTEL' ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-lg shadow-[#FFD700]/20' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
          >
            {viewMode === 'INTEL' ? 'Close Intelligence' : 'AI Micro-Data'}
          </button>
          <button 
            onClick={() => setShowBefore(!showBefore)}
            className={`px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[2px] transition-all border ${showBefore ? 'bg-pink-500 text-white border-pink-400 shadow-lg' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
          >
            <i className="fa fa-columns mr-2"></i> {showBefore ? 'Viewing Before' : 'Compare Result'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* MAIN VISUAL AREA (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="aspect-[3/4] md:aspect-video bg-[#050505] rounded-[56px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative group border border-white/5">
            {isGenerating && (
              <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12 animate-fadeIn">
                 <div className="w-20 h-20 border-[6px] border-pink-500 border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_30px_rgba(255,20,147,0.3)]"></div>
                 <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase tracking-[4px]">Neural Render <span className="text-pink-500">Active</span></h3>
                 <p className="text-white/30 max-w-sm text-sm font-bold uppercase tracking-widest">Applying Layer {step.step} to Biometric ID: 4921-X</p>
              </div>
            )}

            <div className="w-full h-full relative">
              {showBefore ? (
                <div className="flex h-full w-full">
                  <div className="w-1/2 h-full relative border-r border-white/10 overflow-hidden">
                    <img src={originalPhoto} alt="Original" className="h-full w-full object-cover" decoding="async" loading="lazy" />
                    <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[3px] border border-white/10">Base Layer</div>
                  </div>
                  <div className="w-1/2 h-full relative overflow-hidden">
                    <img src={step.generatedImageUrl || originalPhoto} alt="Step Result" className={`h-full w-full object-cover ${!step.generatedImageUrl ? 'blur-2xl' : ''}`} decoding="async" loading="lazy" />
                    <div className="absolute top-8 left-8 bg-pink-600/90 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[3px] border border-pink-400/30">Step {step.step} Result</div>
                  </div>
                </div>
              ) : (
                <img 
                  src={step.generatedImageUrl || originalPhoto} 
                  alt={step.name} 
                  className={`w-full h-full object-cover transition-all duration-1000 ${!step.generatedImageUrl ? 'blur-3xl scale-110 opacity-30' : 'opacity-100 scale-100'}`}
                  decoding="async" 
                  loading="lazy"
                />
              )}
              
              {showMap && step.generatedImageUrl && (
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                   <div className="w-2/3 h-2/3 border-2 border-dashed border-pink-500/60 rounded-[80px] animate-pulse flex items-center justify-center">
                      <div className="bg-black/90 backdrop-blur-xl px-8 py-4 rounded-3xl border border-pink-500/30 text-xs font-black uppercase tracking-[4px] text-pink-400 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                        Neural Target Zone
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* AUDIO & CONTROLS OVERLAY */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
               <div className="bg-black/80 backdrop-blur-3xl p-6 rounded-[40px] border border-white/10 flex items-center space-x-8 max-w-[85%] shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-transparent opacity-0 group-hover:opacity-20 rounded-[42px] transition-opacity"></div>
                  <button className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all relative">
                     <i className="fa fa-play text-2xl translate-x-1"></i>
                  </button>
                  <div className="relative">
                    <div className="flex items-center space-x-2 mb-1">
                       <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                       <p className="text-[10px] font-black uppercase tracking-[3px] text-pink-400">AI Audio Guide</p>
                    </div>
                    <p className="text-white/90 text-sm font-bold leading-tight mt-1 line-clamp-1 italic">"{step.microData?.voiceScript || `Applying ${step.name} with light circular motions...`}"</p>
                  </div>
               </div>
               <button 
                 onClick={() => setShowMap(!showMap)}
                 className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all border shadow-2xl ${showMap ? 'bg-pink-500 text-white border-pink-400' : 'bg-white/10 backdrop-blur-md text-white border-white/10 hover:bg-white/20'}`}
               >
                  <i className="fa fa-map-location-dot text-2xl"></i>
               </button>
            </div>
          </div>

          {/* AI MICRO-DATA PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/5 p-12 rounded-[56px] border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <i className="fa fa-signature text-8xl"></i>
               </div>
               <h3 className="text-xl font-black mb-10 flex items-center uppercase tracking-[3px] text-pink-500">
                 <i className="fa fa-feather-pointed mr-4"></i> Artistry Protocol
               </h3>
               <div className="text-white/80 leading-relaxed text-base font-medium space-y-8">
                 {(step.instruction || '').split('. ').map((line, idx) => line.trim() && (
                   <div key={idx} className="flex items-start">
                     <div className="w-10 h-10 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center text-[12px] font-black shrink-0 mr-6 mt-0.5 border border-pink-500/20">{idx + 1}</div>
                     <div className="space-y-1">
                        <span className="pt-1 block">{line.trim()}</span>
                        {viewMode === 'INTEL' && (
                           <span className="text-[10px] font-bold text-pink-400/60 uppercase tracking-widest block mt-2">
                             ES: {step.microData?.translationEs || 'Cargando traducción AI...'}
                           </span>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="space-y-10">
              {faceTip && (
                <div className="p-10 bg-[#FFD700]/5 rounded-[48px] border border-[#FFD700]/30 shadow-2xl animate-fadeIn relative group">
                   <div className="absolute -inset-2 bg-[#FFD700]/5 rounded-[52px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <h4 className="text-[11px] font-black text-[#FFD700] uppercase tracking-[4px] mb-8 flex items-center">
                    <i className="fa fa-microchip mr-4 text-xl"></i> Biometric Adjustment
                  </h4>
                  <p className="text-lg font-black italic opacity-90 leading-relaxed text-white/90">"{faceTip}"</p>
                </div>
              )}

              {viewMode === 'INTEL' && (
                <div className="p-10 bg-blue-500/5 rounded-[48px] border border-blue-500/30 shadow-2xl animate-slideLeft">
                   <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[4px] mb-8 flex items-center">
                    <i className="fa fa-atom mr-4 text-xl"></i> Intelligence Micro-Data
                  </h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Target Weight</span>
                        <span className="text-sm font-black text-white">{step.microData?.exactWeight || '0.45g'}</span>
                     </div>
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Application Pressure</span>
                        <span className="text-sm font-black text-white">{step.microData?.pressureLevel || '1.2 PSI (Light)'}</span>
                     </div>
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Lighting Opt.</span>
                        <span className="text-sm font-black text-white">{step.microData?.lightingAngle || '45° Elevated'}</span>
                     </div>
                  </div>
                </div>
              )}
              
              <div className="p-10 bg-green-500/10 rounded-[48px] border border-green-500/20 shadow-xl group hover:border-green-500/40 transition-all">
                <h4 className="text-[11px] font-black text-green-400 uppercase tracking-[3px] mb-6 flex items-center">
                  <i className="fa fa-lightbulb mr-4 text-xl group-hover:rotate-12 transition-transform"></i> Expert Tip
                </h4>
                <p className="text-base font-bold italic opacity-90 leading-relaxed text-white/90">"{step.proTip}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-10 sticky top-28">
          <div className="bg-white/5 p-12 rounded-[64px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden relative group">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-all"></div>
            
            <div className="flex justify-between items-center border-b border-white/5 pb-8 mb-10">
               <h3 className="text-xl font-black flex items-center uppercase tracking-[4px]">
                 <i className="fa fa-box-open text-pink-500 mr-5"></i> Formula
               </h3>
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-pink-400 text-sm">
                  <i className="fa fa-barcode"></i>
               </div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-3">
                <p className="text-[11px] font-black text-white/30 uppercase tracking-[4px]">Verified Product</p>
                <p className="text-3xl font-black title-font tracking-tight text-white leading-tight">{step.product}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-white/5 p-6 rounded-[36px] border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4">Shade ID</p>
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-2xl border-2 border-white/10 shadow-2xl relative group-hover:scale-105 transition-transform" style={{backgroundColor: step.colorHex}}>
                         <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 rounded-2xl"></div>
                      </div>
                      <span className="text-xs font-black font-mono text-white/80 tracking-tighter">{step.colorHex}</span>
                    </div>
                 </div>
                 <div className="bg-white/5 p-6 rounded-[36px] border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4">Dosage</p>
                    <span className="text-sm font-black text-white leading-tight block pt-3">{step.amount}</span>
                 </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-white/5">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[4px] mb-2">Inventory Alternatives</p>
                 
                 <div className="bg-white/5 p-7 rounded-[32px] flex justify-between items-center group/item cursor-pointer hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mr-6 font-black text-lg border border-emerald-500/20">₹</div>
                      <div>
                        <p className="text-[9px] font-black opacity-30 uppercase tracking-[2px]">Efficiency Choice</p>
                        <p className="text-sm font-black text-white/90">{step.budgetOption || 'Lakmé Pro-X'}</p>
                      </div>
                    </div>
                    <i className="fa fa-arrow-right text-[10px] opacity-0 group-hover/item:opacity-40 transition-opacity"></i>
                 </div>

                 <div className="bg-white/5 p-7 rounded-[32px] flex justify-between items-center group/item cursor-pointer hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mr-6 font-black text-lg border border-purple-500/20">★</div>
                      <div>
                        <p className="text-[9px] font-black opacity-30 uppercase tracking-[2px]">Premium Tier</p>
                        <p className="text-sm font-black text-white/90">{step.luxuryOption || 'Luxe Artistry'}</p>
                      </div>
                    </div>
                    <i className="fa fa-arrow-right text-[10px] opacity-0 group-hover/item:opacity-40 transition-opacity"></i>
                 </div>
              </div>

              <div className="pt-10 space-y-8">
                <div className="flex justify-between items-center bg-black/40 px-8 py-5 rounded-3xl border border-white/10 shadow-inner">
                   <div className="flex items-center space-x-3">
                      <i className="fa fa-stopwatch text-pink-400 text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-[2px] opacity-40">Persistence</span>
                   </div>
                   <span className="text-xs font-black text-pink-400">{step.longevity || '14+ Hours'}</span>
                </div>
                <button className="w-full bg-pink-500 py-8 rounded-[40px] font-black text-white shadow-[0_25px_60px_rgba(255,20,147,0.3)] hover:bg-pink-600 transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center space-x-5 uppercase tracking-[4px] text-xs">
                   <i className="fa fa-shopping-bag text-lg"></i>
                   <span>Acquire Look</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-transparent p-12 rounded-[56px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
             <div className="flex justify-between items-center mb-10">
               <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <h4 className="font-black text-[11px] uppercase tracking-[4px] opacity-50">Mastery Track</h4>
               </div>
               <span className="text-pink-400 font-black text-lg">{Math.round((step.step/steps.length)*100)}%</span>
             </div>
             <div className="w-full h-5 bg-white/5 rounded-full mb-10 overflow-hidden border border-white/10 shadow-inner relative">
                <div className="absolute inset-0 bg-white/5 opacity-50"></div>
                <div className="h-full bg-pink-500 transition-all duration-1500 ease-out shadow-[0_0_30px_rgba(255,20,147,0.8)] relative" style={{ width: `${(step.step/steps.length)*100}%` }}>
                   <div className="absolute top-0 right-0 h-full w-8 bg-white/20 blur-md"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* FLOATING CONTROL DOCK */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-12 z-[100]">
        <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[56px] border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.9)] flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent pointer-events-none"></div>
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="w-24 h-24 rounded-[36px] font-black bg-white/5 hover:bg-white/10 disabled:opacity-5 transition-all flex items-center justify-center border border-white/10 shadow-inner relative group"
          >
            <i className="fa fa-chevron-left text-3xl group-hover:-translate-x-1 transition-transform"></i>
          </button>

          <div className="hidden md:flex space-x-6 items-center">
            {steps.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentStep(i)}
                className={`w-5 h-5 rounded-full transition-all duration-700 border-2 ${i === currentStep ? 'w-24 bg-pink-500 shadow-[0_0_40px_rgba(255,20,147,1)] border-pink-400' : i < currentStep ? 'bg-pink-500/40 border-pink-500/20 scale-90' : 'bg-white/5 border-white/10 hover:bg-white/20 scale-90'}`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <button 
              onClick={onComplete}
              className="px-24 py-8 rounded-[40px] font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_20px_60px_rgba(5,150,105,0.4)] transition-all transform hover:scale-105 uppercase tracking-[6px] text-xs border border-emerald-400/30"
            >
              SAVE LOOKBOOK
            </button>
          ) : (
            <button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={isGenerating && !steps[currentStep + 1]?.generatedImageUrl}
              className="px-24 py-8 rounded-[40px] font-black bg-pink-500 hover:bg-pink-600 text-white shadow-[0_20px_60px_rgba(255,20,147,0.4)] transition-all transform hover:scale-105 disabled:opacity-30 flex items-center uppercase tracking-[6px] text-xs border border-pink-400/30 group"
            >
              ADVANCE <i className="fa fa-chevron-right ml-8 group-hover:translate-x-2 transition-transform"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialPlayer;
