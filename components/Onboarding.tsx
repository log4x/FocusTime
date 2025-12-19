
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
    <div className={`h-screen flex flex-col p-8 transition-colors duration-500 ${currentStep.color}`}>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-8xl mb-8 animate-bounce">{currentStep.icon}</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{currentStep.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-xs">{currentStep.description}</p>
        
        {step === 3 && (
          <div className="mt-6 bg-white/50 px-4 py-2 rounded-full border border-blue-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">100% Local Processing</span>
          </div>
        )}
      </div>

      <div className="pb-8 space-y-4">
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
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          {step === steps.length - 1 ? "Start Being Present" : "Next"}
        </button>
        
        {step < steps.length - 1 && (
          <button 
            onClick={onComplete}
            className="w-full text-slate-400 font-medium py-2 hover:text-slate-600"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
