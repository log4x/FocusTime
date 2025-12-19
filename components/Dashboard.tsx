
import React from 'react';
import { MonitoredApp, AppScreen } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  apps: MonitoredApp[];
  onNavigate: (screen: AppScreen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ apps, onNavigate }) => {
  const totalMinutes = apps.reduce((acc, app) => acc + app.dailyUsageMinutes, 0);
  const monitoredMinutes = apps.filter(a => a.isMonitored).reduce((acc, app) => acc + app.dailyUsageMinutes, 0);
  const chartData = apps.filter(a => a.dailyUsageMinutes > 0).sort((a, b) => b.dailyUsageMinutes - a.dailyUsageMinutes);

  return (
    <div className="pb-32 animate-in fade-in duration-500">
      <header className="px-6 pt-10 pb-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Focus</h1>
          <p className="text-slate-500 text-xs font-medium">Daily Digital Wellness</p>
        </div>
        <div className="bg-indigo-600 px-4 py-2 rounded-2xl text-white font-bold text-lg shadow-lg shadow-indigo-100">
          {totalMinutes} <span className="text-xs font-normal opacity-80">min</span>
        </div>
      </header>

      <main className="p-6 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Monitored" value={`${monitoredMinutes}m`} color="indigo" />
          <StatCard label="Sessions" value="12" color="emerald" />
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Usage Distribution</h2>
          </div>
          <div className="h-60 w-full bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="dailyUsageMinutes" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.isMonitored ? '#6366f1' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Protection</h2>
            <button onClick={() => onNavigate(AppScreen.SETTINGS)} className="text-indigo-600 text-xs font-bold bg-indigo-50 px-3 py-1 rounded-full">Manage</button>
          </div>
          <div className="space-y-4">
            {apps.filter(a => a.isMonitored).map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-100 active:scale-[0.98] transition-transform shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-2xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl shadow-inner">{app.icon}</span>
                  <div>
                    <p className="font-bold text-slate-800">{app.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{app.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 text-lg">{app.dailyUsageMinutes}m</p>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min((app.dailyUsageMinutes / 120) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div onClick={() => onNavigate(AppScreen.SIMULATOR)} className="bg-slate-900 p-6 rounded-[32px] text-white shadow-2xl relative overflow-hidden group active:scale-[0.97] transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 transform group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2 relative z-10">System Simulation</h3>
          <p className="text-slate-400 text-sm relative z-10">Test how the overlay works in the wild.</p>
        </div>
      </main>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black text-slate-800`}>{value}</p>
  </div>
);

export default Dashboard;
