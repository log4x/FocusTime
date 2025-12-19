
import React, { useState } from 'react';
import { MonitoredApp } from '../types';

interface SystemTriggerProps {
  apps: MonitoredApp[];
  onTrigger: (app: MonitoredApp) => void;
  isDarkMode: boolean;
}

const SystemTrigger: React.FC<SystemTriggerProps> = ({ apps, onTrigger, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-[60]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-5 w-64 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-300">
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-1">Accessibility Bridge</h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4 leading-relaxed px-1">Simulate an app launch to see Focus in action.</p>
          <div className="grid grid-cols-2 gap-2">
            {apps.length > 0 ? apps.map(app => (
              <button 
                key={app.id}
                onClick={() => {
                  onTrigger(app);
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors group active:scale-90"
              >
                <span className="text-2xl transition-transform">{app.icon}</span>
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter truncate w-full text-center">{app.name}</span>
              </button>
            )) : (
                <div className="col-span-2 text-[10px] text-center text-slate-400 dark:text-slate-600 py-4 font-bold uppercase">No monitored apps</div>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${
          isOpen ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800'
        }`}
        title="Accessibility Bridge"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default SystemTrigger;
