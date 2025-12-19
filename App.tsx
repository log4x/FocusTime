
import React, { useState, useEffect } from 'react';
import { AppScreen, MonitoredApp, GlobalOverlayState } from './types';
import { INITIAL_APPS } from './constants';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import OverlaySimulator from './components/OverlaySimulator';
import AICoach from './components/AICoach';
import GlobalOverlay from './components/GlobalOverlay';
import SystemTrigger from './components/SystemTrigger';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.ONBOARDING);
  const [monitoredApps, setMonitoredApps] = useState<MonitoredApp[]>(() => {
    const saved = localStorage.getItem('focus_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('focus_onboarding') === 'true';
  });
  const [usageCount, setUsageCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('focus_usage_count') || '0', 10);
  });

  const [overlayState, setOverlayState] = useState<GlobalOverlayState>({
    type: 'NONE',
    app: null,
    timeLeft: 0
  });

  useEffect(() => {
    if (hasCompletedOnboarding && currentScreen === AppScreen.ONBOARDING) {
      setCurrentScreen(AppScreen.DASHBOARD);
    }
  }, [hasCompletedOnboarding, currentScreen]);

  useEffect(() => {
    localStorage.setItem('focus_apps', JSON.stringify(monitoredApps));
  }, [monitoredApps]);

  useEffect(() => {
    let timer: number;
    if (overlayState.timeLeft > 0 && overlayState.type === 'NONE') {
      timer = window.setInterval(() => {
        setOverlayState(prev => {
          if (prev.timeLeft <= 1) {
            return { ...prev, timeLeft: 0, type: 'NUDGE' };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [overlayState.timeLeft, overlayState.type]);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('focus_onboarding', 'true');
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const toggleAppMonitoring = (id: string) => {
    setMonitoredApps(prev => prev.map(app => 
      app.id === id ? { ...app, isMonitored: !app.isMonitored } : app
    ));
  };

  const triggerAppOverlay = (app: MonitoredApp) => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('focus_usage_count', newCount.toString());

    setOverlayState({
      type: 'INTENTION',
      app: app,
      timeLeft: 0
    });
  };

  const startSession = (minutes: number) => {
    setOverlayState(prev => ({
      ...prev,
      type: 'NONE',
      timeLeft: Math.max(1, minutes * 60)
    }));
  };

  const closeOverlay = () => {
    setOverlayState({ type: 'NONE', app: null, timeLeft: 0 });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.ONBOARDING:
        return <Onboarding onComplete={handleCompleteOnboarding} />;
      case AppScreen.DASHBOARD:
        return <Dashboard apps={monitoredApps} onNavigate={setCurrentScreen} />;
      case AppScreen.SETTINGS:
        return <Settings apps={monitoredApps} onToggle={toggleAppMonitoring} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.SIMULATOR:
        return <OverlaySimulator apps={monitoredApps.filter(a => a.isMonitored)} activeApp={overlayState.app} timeLeft={overlayState.timeLeft} onLaunch={triggerAppOverlay} onExit={closeOverlay} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.COACH:
        return <AICoach apps={monitoredApps} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      default:
        return <Dashboard apps={monitoredApps} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto bg-slate-50 shadow-2xl overflow-hidden relative border-x border-slate-200 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </div>
      
      {currentScreen !== AppScreen.ONBOARDING && (
        <SystemTrigger 
          apps={monitoredApps.filter(a => a.isMonitored)} 
          onTrigger={triggerAppOverlay} 
        />
      )}

      <GlobalOverlay 
        state={overlayState} 
        onStartSession={startSession} 
        onClose={closeOverlay} 
        usageCount={usageCount}
      />

      {currentScreen !== AppScreen.ONBOARDING && (
        <nav className="shrink-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 flex justify-around pt-3 pb-safe px-2 z-40">
          <NavButton icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Home" active={currentScreen === AppScreen.DASHBOARD} onClick={() => setCurrentScreen(AppScreen.DASHBOARD)} />
          <NavButton icon="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" label="Sim" active={currentScreen === AppScreen.SIMULATOR} onClick={() => setCurrentScreen(AppScreen.SIMULATOR)} />
          <NavButton icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" label="Coach" active={currentScreen === AppScreen.COACH} onClick={() => setCurrentScreen(AppScreen.COACH)} />
          <NavButton icon="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" label="Config" active={currentScreen === AppScreen.SETTINGS} onClick={() => setCurrentScreen(AppScreen.SETTINGS)} />
        </nav>
      )}
    </div>
  );
};

const NavButton: React.FC<{ icon: string, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 min-w-[64px] min-h-[48px] justify-center transition-colors ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
    </svg>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
