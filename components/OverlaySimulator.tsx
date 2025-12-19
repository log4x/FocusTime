
import React from 'react';
import { MonitoredApp } from '../types';

interface OverlaySimulatorProps {
  apps: MonitoredApp[];
  activeApp: MonitoredApp | null;
  timeLeft: number;
  onLaunch: (app: MonitoredApp) => void;
  onExit: () => void;
  onBack: () => void;
}

const OverlaySimulator: React.FC<OverlaySimulatorProps> = ({ apps, activeApp, timeLeft, onLaunch, onExit, onBack }) => {
  return (
    <div className="min-h-full flex flex-col bg-slate-950 overflow-y-auto pb-32 relative">
      <div className="p-8 pb-4">
        <button onClick={onBack} className="text-white flex items-center gap-3 mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md active:scale-95 transition-all text-sm font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-white text-3xl font-black mb-1">9:41</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Digital Wellness Active</p>
          </div>
          <div className="flex gap-1 items-end h-4">
            {[2, 4, 3, 5].map((h, i) => <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${h * 20}%` }} />)}
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 grid grid-cols-4 gap-y-8 items-start content-start">
        {apps.map(app => (
          <button 
            key={app.id} 
            onClick={() => onLaunch(app)}
            className="flex flex-col items-center gap-2 group active:opacity-60 transition-opacity"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl shadow-xl backdrop-blur-xl border border-white/10 group-active:scale-90 transition-transform">
              {app.icon}
            </div>
            <span className="text-white text-[10px] font-bold text-center truncate w-full shadow-sm">{app.name}</span>
          </button>
        ))}
        {/* Placeholder apps to fill screen */}
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center gap-2 opacity-20">
            <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/5" />
            <div className="h-2 w-10 bg-white/20 rounded-full" />
          </div>
        ))}
      </div>

      {activeApp && timeLeft > 0 && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 z-50">
           <div className="text-7xl mb-6">{activeApp.icon}</div>
           <h3 className="text-3xl font-black text-slate-800">{activeApp.name}</h3>
           <p className="text-slate-400 mt-2 mb-10 font-medium">Application Context Running</p>
           
           <div className="bg-indigo-600 px-10 py-8 rounded-[40px] shadow-2xl shadow-indigo-200 flex flex-col items-center gap-2 mb-12 transform hover:scale-105 transition-transform">
              <span className="text-white font-black text-5xl tabular-nums tracking-tight">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] text-indigo-200 uppercase font-black tracking-widest">Focus Countdown</span>
           </div>

           <button 
            onClick={onExit}
            className="px-10 py-4 bg-slate-900 text-white rounded-[24px] font-black hover:bg-black active:scale-95 transition-all shadow-xl"
           >
             Exit Application
           </button>
           <p className="text-[10px] text-slate-400 mt-6 max-w-[240px] text-center font-bold uppercase tracking-widest opacity-60">
             Early exit stops the nudge service
           </p>
        </div>
      )}

      <div className="px-10 py-6 text-center">
        <div className="bg-emerald-500/10 p-5 rounded-3xl backdrop-blur-md border border-emerald-500/20">
            <p className="text-[10px] text-emerald-500/60 uppercase tracking-widest mb-1 font-black">Accessibility Bridge</p>
            <p className="text-sm text-emerald-400 font-black flex items-center justify-center gap-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                SYSTEM MONITORING
            </p>
        </div>
      </div>
    </div>
  );
};

export default OverlaySimulator;
