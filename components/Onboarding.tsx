
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Be Present",
      description: "Our goal is simple: to help you regain control over your digital life, one session at a time.",
      icon: "🧘‍♂️",
      color: "bg-indigo-50"
    },
    {
      title: "Set Intentions",
      description: "When you open a distracting app, we'll ask how long you want to spend. This creates a moment of mindfulness.",
      icon: "⏱️",
      color: "bg-emerald-50"
    },
    {
      title: "Gentle Nudges",
      description: "When time is up, we gently remind you to step back. No guilt, just clarity.",
      icon: "🕊️",
      color: "bg-amber-50"
    },
    {
      title: "Privacy is our DNA",
      description: "Every bit of your data stays exactly where it belongs: on your phone. No clouds, no trackers, just your focus.",
      icon: "🛡️",
      color: "bg-blue-50"
    }
  ];

  const currentStep = steps[step];

  return (
    <div className={`h-[100dvh] flex flex-col p-8 pt-safe pb-safe transition-colors duration-500 overflow-hidden ${currentStep.color}`}>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-8xl mb-8 animate-bounce transition-transform">{currentStep.icon}</div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 tracking-tight">{currentStep.title}</h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-[280px] font-medium">{currentStep.description}</p>
        
        {step === 3 && (
          <div className="mt-6 bg-white/60 px-5 py-2 rounded-full border border-blue-100 flex items-center gap-2 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">100% Local Processing</span>
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-4 pt-4">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] shadow-xl shadow-indigo-100 active:scale-95 active:bg-indigo-700 transition-all text-sm uppercase tracking-widest"
        >
          {step === steps.length - 1 ? "Start Being Present" : "Next"}
        </button>
        
        {step < steps.length - 1 && (
          <button 
            onClick={onComplete}
            className="w-full text-slate-400 font-black text-xs uppercase tracking-widest py-2 active:text-slate-600 transition-colors"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
