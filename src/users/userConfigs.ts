import { UserConfig } from "./types";
import { ALL_USERS_FROM_CONFIGS } from "./configs/users";

/**
 * Registry of all personalized user configs.
 *
 * HOW TO ADD A NEW USER:
 *   1. Add a `const name: UserConfig = { id, displayName, ... }` in
 *      `src/users/configs/users.ts`
 *   2. Append that entry to `ALL_USERS_FROM_CONFIGS` in the same file
 *
 * The hook useUserConfig() looks up the current logged-in user's profile.id
 * against this list. If no match → guest/default view. If match → user's
 * personalized view is applied.
 */

const ALL_CONFIGS: UserConfig[] = ALL_USERS_FROM_CONFIGS;

// Build a fast lookup map: uuid → config
const CONFIG_MAP = new Map<string, UserConfig>();
for (const cfg of ALL_CONFIGS) {
  if (cfg.id && cfg.id !== "USER_UUID_HERE") {
    CONFIG_MAP.set(cfg.id, cfg);
  }
}

/**
 * Get a user config by their profile UUID.
 * Returns undefined if the user is not in the registry.
 */
export function getUserConfig(userId: string): UserConfig | undefined {
  return CONFIG_MAP.get(userId);
}

/**
 * Check if a user has a personalized config.
 */
export function hasUserConfig(userId: string): boolean {
  return CONFIG_MAP.has(userId);
}

export { ALL_CONFIGS };
export type { UserConfig };
