
import React from 'react';
import { MonitoredApp } from './types';

export const INITIAL_APPS: MonitoredApp[] = [
  { id: '1', name: 'Instagram', packageName: 'com.instagram.android', icon: '📸', isMonitored: true, dailyUsageMinutes: 45, category: 'Social' },
  { id: '2', name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: '🎵', isMonitored: true, dailyUsageMinutes: 120, category: 'Social' },
  { id: '3', name: 'YouTube', packageName: 'com.google.android.youtube', icon: '📺', isMonitored: false, dailyUsageMinutes: 30, category: 'Entertainment' },
  { id: '4', name: 'X (Twitter)', packageName: 'com.twitter.android', icon: '🐦', isMonitored: true, dailyUsageMinutes: 65, category: 'Social' },
  { id: '5', name: 'Facebook', packageName: 'com.facebook.katana', icon: '📘', isMonitored: false, dailyUsageMinutes: 15, category: 'Social' },
];

export const COLORS = {
  primary: '#6366f1',
  secondary: '#10b981',
  accent: '#f59e0b',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b'
};
