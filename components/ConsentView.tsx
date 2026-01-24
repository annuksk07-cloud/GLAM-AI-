
import React, { useState } from 'react';

interface ConsentViewProps {
  onAgree: () => void;
  onDisagree: () => void;
}

const ConsentView: React.FC<ConsentViewProps> = ({ onAgree, onDisagree }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-[130] bg-black/95 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl animate-slideIn my-auto">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-green-600 text-xl sm:text-2xl mb-4 mx-auto">
            <i className="fa fa-shield-alt"></i>
          </div>
          <h2 className="title-font text-xl sm:text-2xl font-bold text-gray-900 text-center">Privacy & Data Notice</h2>
          <div className="flex items-center justify-center space-x-2 text-[9px] sm:text-[10px] font-bold text-pink-500 uppercase tracking-widest mt-2">
            <span>Step 3 of 3</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p className="font-bold text-gray-900">By proceeding, you agree:</p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check text-green-500 mt-1 mr-3"></i>
                <span>Your face data will be analyzed by our GLAM AI neural networks.</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check text-green-500 mt-1 mr-3"></i>
                <span>Photos are stored securely and deleted after 30 days.</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check text-green-500 mt-1 mr-3"></i>
                <span>Data is NOT shared with third parties or used for training without consent.</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check text-green-500 mt-1 mr-3"></i>
                <span>This analysis is for cosmetic purposes and is not medical advice.</span>
              </li>
            </ul>
          </div>

          <label className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 cursor-pointer hover:bg-pink-50 hover:border-pink-200 transition-all group">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4 sm:w-5 sm:h-5 accent-pink-500 mr-3"
            />
            <span className="text-[11px] sm:text-sm font-medium text-gray-700">I have read and agree to the <span className="text-pink-500 underline">Privacy Policy</span>.</span>
          </label>

          <div className="flex space-x-3 sm:space-x-4">
            <button 
              onClick={onDisagree}
              className="flex-1 py-3 sm:py-4 bg-gray-100 text-gray-600 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Disagree
            </button>
            <button 
              disabled={!agreed}
              onClick={onAgree}
              className="flex-[2] py-3 sm:py-4 bg-pink-500 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-pink-500/20 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] text-sm sm:text-base"
            >
              Agree & Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentView;
