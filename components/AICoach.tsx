
import React, { useState, useEffect } from 'react';
import { MonitoredApp, DailySummary } from '../types';
import { getWellnessInsight } from '../services/geminiService';

interface AICoachProps {
  apps: MonitoredApp[];
  onBack: () => void;
}

const AICoach: React.FC<AICoachProps> = ({ apps, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DailySummary | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const res = await getWellnessInsight(apps);
      setSummary(res);
      setLoading(false);
    };
    fetchInsight();
  }, [apps]);

  return (
    <div className="pb-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">Presence Coach</h1>
        <div className="ml-auto bg-indigo-100 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">AI Powered</div>
      </header>

      <main className="p-6 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-medium animate-pulse">Analyzing habits...</p>
          </div>
        ) : summary && (
          <>
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </div>
               <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">The Insight</h2>
               <p className="text-lg text-slate-700 leading-relaxed font-medium">"{summary.insight}"</p>
               <div className="mt-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                 <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{summary.tone} Tone</span>
               </div>
            </div>

            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Shifts</h3>
              <div className="space-y-3">
                {summary.recommendations.map((rec, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-start group hover:border-indigo-100 transition-colors">
                    <span className="bg-indigo-50 text-indigo-600 w-8 h-8 flex items-center justify-center rounded-xl font-bold flex-shrink-0">{i + 1}</span>
                    <p className="text-slate-600 text-sm leading-snug pt-1">{rec}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 text-amber-800">
               <h4 className="font-bold mb-1">Remember</h4>
               <p className="text-sm opacity-80">You are more than your screen time. This tool is here to support you, not judge you.</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AICoach;
