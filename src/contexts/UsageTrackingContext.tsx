import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { useThemeColor } from './ThemeColorContext';
import { supabase } from '@/lib/supabaseClient';

const UsageTrackingContext = createContext<void | undefined>(undefined);

export const UsageTrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const { themeColor } = useThemeColor();
  
  const startTimeRef = useRef<number>(Date.now());
  const lastSyncRef = useRef<number>(Date.now());

  const syncUsage = async () => {
    if (!user) return;

    const now = Date.now();
    const elapsedSeconds = Math.round((now - startTimeRef.current) / 1000);
    
    console.log(`[UsageTracker] Attempting sync logic... Elapsed: ${elapsedSeconds}s`);

    if (elapsedSeconds <= 0) {
      console.log("[UsageTracker] Skipping sync: no time accumulated yet.");
      return;
    }

    // Reset start time for next interval
    startTimeRef.current = now;
    lastSyncRef.current = now;

    console.log(`[UsageTracker] Sending ${elapsedSeconds}s to DB (Theme: ${themeColor}, Lang: ${lang})`);

    try {
      const { data, error } = await supabase.rpc('increment_usage_stats', {
        user_id: user.id,
        inc_total: elapsedSeconds,
        inc_red: themeColor === 'red' ? elapsedSeconds : 0,
        inc_blue: themeColor === 'blue' ? elapsedSeconds : 0,
        inc_en: lang === 'en' ? elapsedSeconds : 0,
        inc_fr: lang === 'fr' ? elapsedSeconds : 0
      });

      if (error) {
          console.error("[UsageTracker] RPC Error:", error.message, error.details);
      } else {
          console.log("[UsageTracker] ✅ Sync Successful");
      }
    } catch (err) {
      console.error("[UsageTracker] ❌ Unexpected Error:", err);
    }
  };

  useEffect(() => {
    // Start tracking for this specific combination of user/lang/theme
    startTimeRef.current = Date.now();

    // 1. Heartbeat every 30 seconds
    const interval = setInterval(() => {
      syncUsage();
    }, 30000);

    // 2. Sync on visibility change (tab switch/close)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        syncUsage();
      } else {
        startTimeRef.current = Date.now();
      }
    };

    // 3. Sync before unload
    const handleBeforeUnload = () => {
      syncUsage();
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // CRITICAL: Sync current time spent in these settings BEFORE clearing
      syncUsage();
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user?.id, lang, themeColor]); // Sync every time user, language or theme changes

  return <>{children}</>;
};

export const useUsageTracking = () => {
  return useContext(UsageTrackingContext);
};
