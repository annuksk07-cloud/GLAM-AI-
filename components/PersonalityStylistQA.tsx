
import React, { useState } from 'react';

interface PersonalityStylistQAProps {
  onSubmit: (answers: string[]) => void;
  onClose: () => void;
}

const PersonalityStylistQA: React.FC<PersonalityStylistQAProps> = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      q: "What’s your favorite color?",
      options: ["Red", "Blue", "Green", "Black", "White"]
    },
    {
      q: "How do you usually dress?",
      options: ["Casual", "Formal", "Boho", "Chic", "Minimalist", "Edgy"]
    },
    {
      q: "What’s your ideal look?",
      options: ["Powerful", "Soft", "Mysterious", "Playful", "Elegant"]
    },
    {
      q: "What’s your go-to outfit?",
      options: ["Jeans + T-shirt", "Dress", "Suit", "Traditional"]
    },
    {
      q: "What emotion do you want to express?",
      options: ["Confidence", "Calm", "Joy", "Mystery"]
    }
  ];

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-xl bg-white/5 rounded-[56px] border border-white/10 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <i className="fa fa-user-astronaut text-8xl text-pink-500"></i>
        </div>

        <button onClick={onClose} className="absolute top-8 left-8 text-white/40 hover:text-white transition-all">
          <i className="fa fa-times text-xl"></i>
        </button>

        <div className="space-y-10 relative">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[4px] text-pink-500">Personality Stylist Questionnaire</span>
            <div className="flex space-x-2">
               {questions.map((_, i) => (
                 <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-pink-500' : 'bg-white/10'}`}></div>
               ))}
            </div>
          </div>

          <h2 className="text-3xl font-black text-white leading-tight">{questions[step].q}</h2>

          <div className="grid grid-cols-1 gap-3">
            {questions[step].options.map(option => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full py-5 rounded-3xl bg-white/5 border border-white/10 text-lg font-bold hover:bg-pink-500 hover:border-pink-400 transition-all text-left px-8 flex justify-between items-center group"
              >
                <span>{option}</span>
                <i className="fa fa-chevron-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityStylistQA;
