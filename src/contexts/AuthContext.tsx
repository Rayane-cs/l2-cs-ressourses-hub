import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface AuthProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  language: string;
  theme_color: string;
  display_id: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: AuthProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AuthProfile>) => Promise<{ error: any }>;
  isGuest: boolean;
  setGuest: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('isGuest') === 'true';
  });

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116" || error.message.includes("no rows")) {
          // Profile doesn't exist, try to create it
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert([
                {
                  id: userId,
                  email: userData.user.email,
                  full_name: userData.user.user_metadata?.full_name,
                  language: userData.user.user_metadata?.language || 'en',
                  theme_color: userData.user.user_metadata?.theme_color || 'red'
                }
              ])
              .select()
              .single();
            
            if (!createError) {
              setProfile(newProfile);
              return;
            }
          }
        }
        console.error("Error fetching/creating profile:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      setProfile(null);
    }
  };

  // Function to increment login count
  const incrementLoginCount = async (userId: string) => {
    try {
      const { error } = await supabase.rpc('increment_usage_stats', {
        user_id: userId,
        inc_total: 0,
        inc_red: 0,
        inc_blue: 0,
        inc_en: 0,
        inc_fr: 0,
        inc_login: 1
      });

      if (error) {
        console.error('[AuthContext] Failed to increment login count:', error);
      } else {
        console.log('[AuthContext] ✅ Login count incremented');
      }
    } catch (err) {
      console.error('[AuthContext] Unexpected error incrementing login count:', err);
    }
  };

  useEffect(() => {
    // Get initial user securely
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchProfile(user.id);
      }
      setLoading(false);
      
      // Also get session for compatibility if needed
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        fetchProfile(currentUser.id);
        setIsGuest(false);
        localStorage.removeItem('isGuest');
        
        // Only increment login count on actual sign-in events, not session restoration
        if (event === 'SIGNED_IN') {
          incrementLoginCount(currentUser.id);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (updates: Partial<AuthProfile>) => {
    if (!user) return { error: new Error("No user logged in") };

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (!error && data) {
        setProfile(data);
      }
      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  const setGuest = (value: boolean) => {
    setIsGuest(value);
    if (value) {
      localStorage.setItem('isGuest', 'true');
      setUser(null);
      setProfile(null);
    } else {
      localStorage.removeItem('isGuest');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setGuest(false);
    setProfile(null);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    updateProfile,
    isGuest,
    setGuest
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
