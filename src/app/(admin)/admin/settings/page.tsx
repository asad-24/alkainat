'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface TimeZone {
  name: string;
  city: string;
  timezone: string;
  flag: string;
}

const timezones: TimeZone[] = [
  { name: 'Qatar', city: 'Doha', timezone: 'Asia/Qatar', flag: '🇶🇦' },
  { name: 'Saudi Arabia', city: 'Riyadh', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'United Arab Emirates', city: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Oman', city: 'Muscat', timezone: 'Asia/Muscat', flag: '🇴🇲' },
  { name: 'Pakistan', city: 'Islamabad', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'China', city: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
]; const WorldClockCard = ({ timezone }: { timezone: TimeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  const getDateInTimezone = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{timezone.flag}</span>
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {timezone.name}
              </h3>
              <p className="text-sm text-slate-400">{timezone.city}</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">🕐</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-mono font-bold text-white">
            {getTimeInTimezone(time, timezone.timezone)}
          </div>
          <div className="text-sm text-slate-400">
            {getDateInTimezone(time, timezone.timezone)}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Timezone: {timezone.timezone}</span>
            <span className="text-green-400">● Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSettingsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AdminLayout onLogout={() => { }}>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🌍 World Clock
          </h1>
          <p className="text-slate-400 text-lg">
            Real-time clocks for our key regions
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Current UTC: {currentTime.toISOString().split('T')[1].split('.')[0]}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timezones.map((timezone) => (
            <WorldClockCard key={timezone.timezone} timezone={timezone} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-white/10 rounded-full px-6 py-3">
            <span className="text-green-400 animate-pulse">●</span>
            <span className="text-slate-400 text-sm">All times are synchronized and updating in real-time</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
