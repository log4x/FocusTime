
import React, { useState } from 'react';
import { MonitoredApp } from '../types';

interface SystemTriggerProps {
  apps: MonitoredApp[];
  onTrigger: (app: MonitoredApp) => void;
}

const SystemTrigger: React.FC<SystemTriggerProps> = ({ apps, onTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-[60]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white shadow-2xl rounded-2xl p-4 w-64 border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Simulate App Launch</h4>
          <div className="grid grid-cols-2 gap-2">
            {apps.length > 0 ? apps.map(app => (
              <button 
                key={app.id}
                onClick={() => {
                  onTrigger(app);
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors group"
              >
                <span className="text-xl group-active:scale-90 transition-transform">{app.icon}</span>
                <span className="text-[10px] font-medium text-slate-600">{app.name}</span>
              </button>
            )) : (
                <div className="col-span-2 text-[10px] text-center text-slate-400 py-2">No apps monitored. Enable some in Settings!</div>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
          isOpen ? 'bg-slate-800 text-white' : 'bg-white text-slate-400 border border-slate-200'
        }`}
        title="Simulate System Event"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default SystemTrigger;
