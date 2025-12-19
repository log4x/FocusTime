
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
    <div className="pb-24 animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Focus</h1>
          <p className="text-slate-500 text-sm">Today's Presence</p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 font-bold text-lg">
          {totalMinutes} <span className="text-xs font-normal">min</span>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Monitored</p>
            <p className="text-2xl font-bold text-slate-800">{monitoredMinutes}m</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Sessions</p>
            <p className="text-2xl font-bold text-slate-800">12</p>
          </div>
        </div>

        {/* Visual Usage */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            Usage Breakdown
          </h2>
          <div className="h-64 w-full bg-white p-4 rounded-2xl border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="dailyUsageMinutes" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.isMonitored ? '#6366f1' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* App List Mini */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Active Monitoring</h2>
            <button 
              onClick={() => onNavigate(AppScreen.SETTINGS)}
              className="text-indigo-600 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {apps.filter(a => a.isMonitored).map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl bg-slate-50 w-10 h-10 flex items-center justify-center rounded-xl">{app.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-400">{app.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-700">{app.dailyUsageMinutes}m</p>
                  <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${Math.min((app.dailyUsageMinutes / 120) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Simulator CTA */}
        <div 
          onClick={() => onNavigate(AppScreen.SIMULATOR)}
          className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 cursor-pointer active:scale-[0.98] transition-all group"
        >
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            Try Simulator
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h3>
          <p className="text-indigo-100 text-sm">See how Focus nudges you in other apps.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
