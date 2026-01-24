
import React, { useState } from 'react';

interface PhotoPreviewProps {
  image: string;
  onConfirm: () => void;
  onRetake: () => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ image, onConfirm, onRetake }) => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl animate-scaleUp my-auto">
        <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="title-font text-xl sm:text-2xl font-bold text-gray-900">📸 Preview Your Photo</h2>
            <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-bold text-pink-500 uppercase tracking-widest mt-1">
              <span>Step 2 of 3</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex flex-col items-end">
               <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">Quality Score</span>
               <span className="text-xs sm:text-sm font-bold text-green-500">92/100</span>
             </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gray-100">
          <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-inner bg-black flex items-center justify-center">
            <img 
              src={image} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain transition-all duration-300"
              style={{ 
                filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`,
                transform: `rotate(${rotation}deg)`
              }}
            />
            <div className="absolute inset-0 border-2 border-pink-500/30 pointer-events-none rounded-2xl sm:rounded-3xl m-3 sm:m-4"></div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase flex justify-between">
                <span>Brightness</span>
                <span className="text-gray-900">{brightness > 0 ? `+${brightness}` : brightness}</span>
              </label>
              <input 
                type="range" min="-50" max="50" value={brightness} 
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-pink-500 h-1 bg-gray-100 rounded-full"
              />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase flex justify-between">
                <span>Contrast</span>
                <span className="text-gray-900">{contrast > 0 ? `+${contrast}` : contrast}</span>
              </label>
              <input 
                type="range" min="-50" max="50" value={contrast} 
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full accent-pink-500 h-1 bg-gray-100 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => setRotation(r => r - 90)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500 transition-colors"
            >
              <i className="fa fa-undo"></i>
            </button>
            <button 
              onClick={() => setRotation(r => r + 90)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500 transition-colors"
            >
              <i className="fa fa-redo"></i>
            </button>
          </div>

          <div className="flex space-x-3 sm:space-x-4">
            <button 
              onClick={onRetake}
              className="flex-1 py-3 sm:py-4 bg-gray-100 text-gray-600 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Retake
            </button>
            <button 
              onClick={onConfirm}
              className="flex-[2] py-3 sm:py-4 bg-pink-500 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-pink-500/20 hover:bg-pink-600 transition-all transform hover:scale-[1.02] text-sm sm:text-base"
            >
              Confirm & Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;
