
import React, { useState } from 'react';
import { GlobalOverlayState } from '../types';

interface GlobalOverlayProps {
  state: GlobalOverlayState;
  onStartSession: (minutes: number) => void;
  onClose: () => void;
  usageCount: number;
}

const GlobalOverlay: React.FC<GlobalOverlayProps> = ({ state, onStartSession, onClose, usageCount }) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(15);

  if (state.type === 'NONE') return null;

  const showDonation = usageCount > 0 && usageCount % 10 === 0;

  const handleCustomStart = () => {
    const totalMins = (selectedHours * 60) + selectedMinutes;
    if (totalMins > 0) {
      onStartSession(totalMins);
      setIsCustomMode(false);
    }
  };

  const renderTimeColumn = (
    max: number, 
    current: number, 
    setter: (val: number) => void, 
    label: string
  ) => {
    const values = Array.from({ length: max }, (_, i) => i);
    return (
      <div className="flex flex-col items-center flex-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
        <div className="h-40 w-full overflow-y-auto snap-y snap-mandatory no-scrollbar bg-slate-50 rounded-2xl border border-slate-100 relative">
          <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-indigo-50/50 pointer-events-none border-y border-indigo-100/50" />
          <div className="py-16">
            {values.map((v) => (
              <button
                key={v}
                onClick={() => setter(v)}
                className={`w-full h-10 flex items-center justify-center snap-center transition-all duration-200 ${
                  current === v 
                    ? 'text-indigo-600 text-xl font-bold scale-110' 
                    : 'text-slate-300 text-base hover:text-slate-500'
                }`}
              >
                {v.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (state.type === 'INTENTION') {
      return (
        <div className="bg-white w-full max-w-sm max-h-[90dvh] overflow-y-auto no-scrollbar rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4 p-4 bg-slate-50 rounded-2xl">{state.app?.icon}</div>
            <h3 className="text-xl font-black text-slate-800 mb-1">Opening {state.app?.name}</h3>
            <p className="text-slate-500 text-sm mb-8">Set your intention for this session.</p>

            {isCustomMode ? (
              <div className="w-full space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="flex gap-4 w-full">
                  {renderTimeColumn(24, selectedHours, setSelectedHours, "Hours")}
                  {renderTimeColumn(60, selectedMinutes, setSelectedMinutes, "Minutes")}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-black text-slate-400 mb-4">
                    Total: <span className="text-indigo-600">
                      {selectedHours > 0 && `${selectedHours}h `}{selectedMinutes}m
                    </span>
                  </p>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleCustomStart} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 active:scale-95 transition-all">Start Session</button>
                    <button onClick={() => setIsCustomMode(false)} className="w-full py-3 bg-slate-50 text-slate-400 rounded-2xl font-bold text-sm">Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div className="grid grid-cols-3 gap-3 w-full">
                  {[2, 5, 10].map(m => (
                    <button 
                      key={m} 
                      onClick={() => onStartSession(m)} 
                      className="py-5 bg-slate-50 rounded-2xl font-black text-slate-800 active:bg-indigo-600 active:text-white transition-all border border-transparent active:border-indigo-100 shadow-sm"
                    >
                      +{m}m
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setIsCustomMode(true)} 
                  className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black border-2 border-indigo-50 active:bg-indigo-50 transition-all shadow-sm"
                >
                  Custom Duration...
                </button>
                <div className="pt-4">
                  <button onClick={onClose} className="w-full py-2 text-slate-400 font-bold text-xs uppercase tracking-widest active:text-slate-600 transition-colors">
                    Continue without timer
                  </button>
                </div>
              </div>
            )}

            {showDonation && !isCustomMode && (
              <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in duration-700 w-full">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-black">Support Independence</p>
                <a 
                  href="https://donate.netio.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all"
                >
                  <span>Buy us a coffee</span>
                  <span className="text-base">☕</span>
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (state.type === 'NUDGE') {
      return (
        <div className="bg-white w-full max-w-sm max-h-[90dvh] overflow-y-auto no-scrollbar rounded-[40px] p-8 shadow-2xl animate-in zoom-in duration-500">
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-6">🧘‍♂️</div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Time is up</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Your chosen window has closed.<br/>Ready to return to the physical world?</p>
            
            <div className="space-y-4 w-full">
              <button onClick={onClose} className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black shadow-xl active:scale-95 transition-all">
                Exit Application
              </button>
              
              {isCustomMode ? (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div className="flex gap-2 h-40">
                    {renderTimeColumn(24, selectedHours, setSelectedHours, "Hrs")}
                    {renderTimeColumn(60, selectedMinutes, setSelectedMinutes, "Mins")}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={handleCustomStart} className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black">Add Extra Time</button>
                    <button onClick={() => setIsCustomMode(false)} className="w-full py-2 bg-transparent text-slate-400 rounded-xl font-bold text-xs uppercase">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2">
                    {[2, 5, 10].map(m => (
                      <button 
                        key={m} 
                        onClick={() => onStartSession(m)} 
                        className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl text-sm font-black active:bg-slate-100 transition-colors border border-slate-100"
                      >
                        +{m}m
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsCustomMode(true)} 
                    className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest active:bg-indigo-100 transition-all"
                  >
                    Custom Extension...
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-lg flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
      {renderContent()}
    </div>
  );
};

export default GlobalOverlay;
