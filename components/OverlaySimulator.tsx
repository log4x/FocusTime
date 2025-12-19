
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
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden relative">
      <div className="p-6 pb-2">
        <button onClick={onBack} className="text-white flex items-center gap-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit Home Screen
        </button>
        <h2 className="text-white text-xl font-bold mb-1">Android OS Home</h2>
        <p className="text-slate-400 text-sm">Simulating background service...</p>
      </div>

      <div className="flex-1 p-6 grid grid-cols-4 gap-6 items-start content-start">
        {apps.map(app => (
          <button 
            key={app.id} 
            onClick={() => onLaunch(app)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-active:scale-90 transition-all shadow-lg backdrop-blur-sm border border-white/5">
              {app.icon}
            </div>
            <span className="text-white text-[10px] font-medium text-center truncate w-full">{app.name}</span>
          </button>
        ))}
      </div>

      {/* Simulated App View */}
      {activeApp && timeLeft > 0 && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center animate-in fade-in duration-300 z-30">
           <div className="text-6xl mb-4">{activeApp.icon}</div>
           <h3 className="text-2xl font-bold text-slate-800">{activeApp.name}</h3>
           <p className="text-slate-400 mt-2 mb-8">App is running...</p>
           
           <div className="bg-indigo-50 px-8 py-6 rounded-3xl border border-indigo-100 flex flex-col items-center gap-2 mb-12">
              <span className="text-indigo-600 font-bold text-4xl tabular-nums">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-indigo-400 uppercase font-bold tracking-widest">Focus Timer</span>
           </div>

           <button 
            onClick={onExit}
            className="px-8 py-3 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg"
           >
             Exit App Early
           </button>
           <p className="text-[10px] text-slate-400 mt-4 max-w-[200px] text-center italic">
             (Exiting now will stop the timer and cancel the "Time's up" popup)
           </p>
        </div>
      )}

      <div className="p-8 text-center">
        <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Accessibility Service</p>
            <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                ACTIVE & MONITORING
            </p>
        </div>
      </div>
    </div>
  );
};

export default OverlaySimulator;
