
import React, { useRef, useState, useEffect } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  useEffect(() => {
    const initCamera = async () => {
      try {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    initCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [facingMode]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const base64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
        onCapture(base64);
      }
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black flex flex-col">
      {/* Top Controls */}
      <div className="absolute top-0 w-full z-10 p-6 flex justify-between items-start">
        <div className="space-y-2">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Quality: ⭐⭐⭐ Excellent</span>
          </div>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/20">
             <i className="fa fa-sun text-yellow-400 text-[10px]"></i>
             <span className="text-white text-[10px] font-bold uppercase tracking-widest">Lighting: Good ✓</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/10"
          >
            <i className="fa fa-times text-xl"></i>
          </button>
          <button 
            onClick={toggleCamera}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/10"
          >
            <i className="fa fa-sync-alt"></i>
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="relative flex-1 overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover ${facingMode === 'user' ? 'mirror' : ''}`}
        />
        
        {/* Face Detection Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-72 h-96 border-2 border-dashed border-pink-500/50 rounded-[80px] flex items-center justify-center">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
              Face Detected: Perfect Alignment
            </div>
            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pink-500 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-500 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-pink-500 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-500 rounded-br-3xl"></div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full p-10 flex flex-col items-center bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white/80 text-sm mb-6 font-medium animate-pulse">Position face in frame, ensure good lighting</p>
        <button 
          onClick={handleCapture}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,20,147,0.5)] transition-all hover:scale-110 active:scale-90"
        >
          <div className="w-16 h-16 border-4 border-pink-500 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-pink-500 rounded-full"></div>
          </div>
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <style>{`.mirror { transform: scaleX(-1); }`}</style>
    </div>
  );
};

export default CameraView;
