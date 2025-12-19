
import React from 'react';
import { MonitoredApp } from '../types';

interface SettingsProps {
  apps: MonitoredApp[];
  onToggle: (id: string) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ apps, onToggle, onBack }) => {
  return (
    <div className="pb-24 animate-in slide-in-from-right duration-300">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-slate-800">Monitored Apps</h1>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
          <div className="text-2xl mt-1">💡</div>
          <p className="text-sm text-blue-700 leading-snug">
            Choose apps where you often find yourself scrolling unconsciously. We'll show an overlay whenever you open them.
          </p>
        </div>

        <div className="space-y-1">
          {apps.map(app => (
            <div 
              key={app.id} 
              onClick={() => onToggle(app.id)}
              className="flex items-center justify-between py-4 border-b border-slate-100 cursor-pointer active:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl w-8 h-8 flex items-center justify-center">{app.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800">{app.name}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{app.category}</p>
                </div>
              </div>
              
              <div className={`w-12 h-6 rounded-full transition-colors relative ${app.isMonitored ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${app.isMonitored ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-8 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">System Status</h2>
          
          <div className="space-y-3">
            <PermissionItem label="Accessibility Service" status="active" />
            <PermissionItem label="Display Over Apps" status="active" />
            <PermissionItem label="Privacy Encryption" status="active" />
          </div>
        </div>
      </main>
    </div>
  );
};

const PermissionItem: React.FC<{ label: string, status: 'active' | 'warning' | 'disabled' }> = ({ label, status }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
      <span className="text-slate-700 font-medium">{label}</span>
      <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
        status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
        status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
      }`}>
        {status}
      </span>
    </div>
  );
};

export default Settings;
