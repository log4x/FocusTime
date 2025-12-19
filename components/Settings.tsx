
import React from 'react';
import { MonitoredApp } from '../types';

interface SettingsProps {
  apps: MonitoredApp[];
  onToggle: (id: string) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ apps, onToggle, onBack }) => {
  return (
    <div className="pb-32 animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-10 pb-6 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-3 -ml-2 rounded-2xl hover:bg-slate-50 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Configuration</h1>
      </header>

      <main className="p-6 space-y-8">
        <div className="bg-indigo-50 p-5 rounded-[32px] border border-indigo-100 flex gap-4 shadow-sm shadow-indigo-50">
          <div className="text-3xl mt-1">🧠</div>
          <p className="text-sm text-indigo-700 font-medium leading-relaxed">
            Selecting apps here enables the <strong>Intentional Delay</strong> system. Mindfulness begins with a simple pause.
          </p>
        </div>

        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Target Applications</h2>
          <div className="space-y-2">
            {apps.map(app => (
              <div 
                key={app.id} 
                onClick={() => onToggle(app.id)}
                className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-slate-100 active:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl">{app.icon}</span>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{app.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{app.category}</p>
                  </div>
                </div>
                
                <div className={`w-14 h-8 rounded-full transition-all relative ${app.isMonitored ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all ${app.isMonitored ? 'left-7' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="pt-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Secure Environment</h2>
          <div className="space-y-3">
            <PermissionItem label="Accessibility Service" status="active" />
            <PermissionItem label="System Overlay" status="active" />
            <PermissionItem label="Device Context" status="active" />
          </div>
          <p className="text-[10px] text-center text-slate-300 mt-6 font-bold uppercase tracking-widest">Focus v2.4.0 — Local Encrypted Build</p>
        </section>
      </main>
    </div>
  );
};

const PermissionItem: React.FC<{ label: string, status: 'active' | 'warning' | 'disabled' }> = ({ label, status }) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-slate-100 shadow-sm">
      <span className="text-slate-800 font-bold">{label}</span>
      <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
        status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
        status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
      }`}>
        {status}
      </span>
    </div>
  );
};

export default Settings;
