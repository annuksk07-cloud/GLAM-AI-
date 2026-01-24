
import React from 'react';

interface UploadSelectionProps {
  onSelect: (method: 'CAMERA' | 'GALLERY' | 'FILE') => void;
  onClose: () => void;
}

const UploadSelection: React.FC<UploadSelectionProps> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl animate-slideIn">
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="title-font text-3xl font-bold text-gray-900">📸 Upload Your Selfie</h2>
            <p className="text-gray-500 text-sm">Get personalized makeup recommendations</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="fa fa-times"></i>
          </button>
        </div>

        <div className="px-8 mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-pink-500 uppercase tracking-widest">
            <span>Step 1 of 3</span>
            <div className="flex-1 h-1 bg-gray-100 rounded-full">
              <div className="w-1/3 h-full bg-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <button 
            onClick={() => onSelect('CAMERA')}
            className="w-full p-6 bg-pink-500 rounded-3xl text-left flex items-center space-x-4 hover:bg-pink-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-pink-500/20"
          >
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white text-2xl">
              <i className="fa fa-camera"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Take a Selfie</h3>
              <p className="text-white/80 text-sm">Use front camera now</p>
            </div>
          </button>

          <button 
            onClick={() => onSelect('GALLERY')}
            className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-left flex items-center space-x-4 hover:border-pink-200 hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-2xl group-hover:bg-pink-100 group-hover:text-pink-500 transition-colors">
              <i className="fa fa-images"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Choose from Gallery</h3>
              <p className="text-gray-500 text-sm">Select existing photo</p>
            </div>
          </button>

          <button 
            onClick={() => onSelect('FILE')}
            className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-left flex items-center space-x-4 hover:border-pink-200 hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-2xl group-hover:bg-pink-100 group-hover:text-pink-500 transition-colors">
              <i className="fa fa-folder-open"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Upload from Computer</h3>
              <p className="text-gray-500 text-sm">Drag & drop or browse</p>
            </div>
          </button>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-400">
          <i className="fa fa-shield-alt mr-2 text-green-500"></i> Your photos are processed securely and deleted after analysis.
        </div>
      </div>
    </div>
  );
};

export default UploadSelection;
