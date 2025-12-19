
export interface MonitoredApp {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  isMonitored: boolean;
  dailyUsageMinutes: number;
  category: 'Social' | 'Entertainment' | 'Productivity' | 'Other';
}

export interface FocusSession {
  id: string;
  appName: string;
  startTime: number;
  durationMinutes: number;
  completed: boolean;
}

export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  SIMULATOR = 'SIMULATOR',
  COACH = 'COACH'
}

export type OverlayType = 'NONE' | 'INTENTION' | 'NUDGE';

export interface GlobalOverlayState {
  type: OverlayType;
  app: MonitoredApp | null;
  timeLeft: number; // seconds
}

export interface DailySummary {
  insight: string;
  recommendations: string[];
  tone: string;
}
