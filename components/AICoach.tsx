
import React, { useState, useEffect } from 'react';

const WELLNESS_TIPS = [
  {
    insight: "Presence is the greatest gift you can give yourself today.",
    recommendations: [
      "Try leaving your phone in another room for 30 mins", 
      "Notice the physical sensation of breath before checking a notification", 
      "Schedule a 5-minute technology-free walk outdoors"
    ],
    tone: "Zen"
  },
  {
    insight: "Intentionality turns habit into conscious choice.",
    recommendations: [
      "Ask 'Why am I opening this app?' before you tap", 
      "Set your device to grayscale to reduce visual dopamine", 
      "Delete one app that consistently makes you feel drained"
    ],
    tone: "Focused"
  },
  {
    insight: "Your attention is your most valuable resource.",
    recommendations: [
      "Disable non-human notifications for 24 hours", 
      "Practice 'Single-Tasking': do one thing at a time with full focus", 
      "Create a 'Charging Station' away from your bedside"
    ],
    tone: "Protective"
  }
];

interface AICoachProps {
  onBack: () => void;
}

const AICoach: React.FC<AICoachProps> = () => {
  const [summary, setSummary] = useState(WELLNESS_TIPS[0]);

  useEffect(() => {
    // Select a random tip on mount for variety
    const randomIndex = Math.floor(Math.random() * WELLNESS_TIPS.length);
    setSummary(WELLNESS_TIPS[randomIndex]);
  }, []);

  return (
    <div className="pb-8 min-h-full bg-slate-50 animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">Presence Guide</h1>
        <div className="ml-auto bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Local & Private</div>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
             </svg>
           </div>
           <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Today's Wisdom</h2>
           <p className="text-lg text-slate-700 leading-relaxed font-medium">"{summary.insight}"</p>
           <div className="mt-4 flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-500 rounded-full" />
             <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{summary.tone} Focus</span>
           </div>
        </div>

        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Practical Steps</h3>
          <div className="space-y-3">
            {summary.recommendations.map((rec, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-start group hover:border-indigo-100 transition-colors">
                <span className="bg-indigo-50 text-indigo-600 w-8 h-8 flex items-center justify-center rounded-xl font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-slate-600 text-sm leading-snug pt-1">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 text-indigo-800">
           <h4 className="font-bold mb-1">Deep Privacy</h4>
           <p className="text-sm opacity-80">These recommendations are generated entirely on your device. We never see your habits or personal data.</p>
        </div>
      </main>
    </div>
  );
};

export default AICoach;
