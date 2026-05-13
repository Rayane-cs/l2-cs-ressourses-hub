import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserConfig, UserConfig } from "@/users/userConfigs";

/**
 * Returns the current logged-in user's personalized config, or null if:
 *   - the user is a guest
 *   - the user has no config in src/users/userConfigs.ts
 *
 * Usage:
 *   const userCfg = useUserConfig();
 *   if (userCfg?.hiddenYears?.includes('m1')) { ... }
 */
export function useUserConfig(): UserConfig | null {
  const { user, profile, isGuest } = useAuth();

  const config = useMemo(() => {
    if (isGuest || !user || !profile?.id) return null;
    return getUserConfig(profile.id) ?? null;
  }, [isGuest, user, profile?.id]);

  return config;
}

/**
 * Convenience hook that also tells you if the current user
 * is a known personalized user (has a config).
 */
export function useIsPersonalizedUser(): boolean {
  const cfg = useUserConfig();
  return cfg !== null;
}
