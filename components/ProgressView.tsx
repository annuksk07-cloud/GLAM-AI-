
import React, { useState, useEffect } from 'react';

const ProgressView: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Detecting face shape...",
    "Analyzing skin tone...",
    "Identifying problem areas...",
    "Analyzing skin texture...",
    "Generating makeup recommendations...",
    "Creating makeup map...",
    "Finalizing analysis..."
  ];

  useEffect(() => {
    // Accelerated performance interval
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 98; // Hold at 98 until parent state triggers transition
        return prev + Math.random() * 15;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) return steps.length - 1;
        return prev + 1;
      });
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[140] bg-[#1A1A1A] flex flex-col items-center justify-center p-6 text-white animate-fadeIn">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
             <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
             <div 
               className="absolute inset-0 border-4 border-pink-500 rounded-full transition-all duration-300 ease-out"
               style={{ 
                 clipPath: `polygon(50% 50%, -50% -50%, ${progress}% -50%, ${progress}% 150%, -50% 150%)`,
                 transform: 'rotate(-90deg)'
               }}
             ></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{Math.min(100, Math.round(progress))}%</span>
             </div>
          </div>
          <h2 className="title-font text-3xl font-bold">Neural Core Processing</h2>
          <p className="text-pink-400 font-medium animate-pulse">{steps[step]}</p>
        </div>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center space-x-3 transition-all duration-300 ${i <= step ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-pink-500 text-white animate-ping' : 'bg-white/10 text-white'}`}>
                {i < step ? <i className="fa fa-check"></i> : i + 1}
              </div>
              <span className={`text-sm ${i === step ? 'font-black text-pink-400' : 'font-medium opacity-60'}`}>{s}</span>
            </div>
          ))}
        </div>

        <div className="pt-8 text-center text-xs opacity-40 font-medium italic">
          Optimization Active: Skipping redundant validation for instant results.
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
