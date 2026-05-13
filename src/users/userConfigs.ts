import { UserConfig } from "./types";
import { rayane, ayoub } from "./configs/users";

/**
 * Registry of all personalized user configs.
 *
 * HOW TO ADD A NEW USER:
 *   1. Copy src/users/configs/_template.ts to a new file, e.g. rayan.ts
 *   2. Replace "USER_UUID_HERE" with the real profile UUID from Supabase
 *   3. Uncomment and tweak the fields you need
 *   4. Import the config below and add it to the ALL_CONFIGS array
 *
 * The hook useUserConfig() looks up the current logged-in user's profile.id
 * against this list. If no match → guest/default view. If match → user's
 * personalized view is applied.
 */

// ─── IMPORT USER CONFIGS HERE ──────────────────────────────
// import rayan from "./configs/rayan";
// import amina from "./configs/amina";
// etc...

// ─── REGISTRY ────────────────────────────────────────────
const ALL_CONFIGS: UserConfig[] = [
  rayane,
  ayoub,
  // amina,
];

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
