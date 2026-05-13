/**
 * User personalization config types.
 *
 * To add a new user:
 *   1. Copy src/users/configs/_template.ts
 *   2. Fill in the user's UUID (from profiles.id) and preferences
 *   3. Import & register it in src/users/userConfigs.ts
 */

export interface UserConfig {
  /** The user's UUID from the profiles table (primary key) */
  id: string;

  /** Display name used in the welcome popup */
  displayName: string;

  /** Optional custom welcome message. Falls back to "Welcome {displayName}, happy to have you here!" */
  welcomeMessage?: string;

  /** Which year sections to hide on the home page. e.g. ['m1','m2'] hides Master years */
  hiddenYears?: string[];

  /** Which page sections to hide by ID. e.g. ['programming-languages'] */
  hiddenSections?: string[];

  /** If set, ONLY these years are shown (takes precedence over hiddenYears) */
  showOnlyYears?: string[];

  /** Custom banner text shown at the top of the home page */
  customBanner?: string;

  /** Whether to show the Programming Languages section (default: true) */
  showProgrammingLanguages?: boolean;

  /** Whether to show the Feedback link in nav (default: true) */
  showFeedbackLink?: boolean;

  /** Extra module-level visibility overrides. e.g. { algo: false } hides the Algo module card */
  hiddenModules?: Record<string, boolean>;

  /** Extra semester-level visibility overrides. e.g. { 'l1-s1': false } */
  hiddenSemesters?: Record<string, boolean>;

  /** Generic extra flags for 100% custom view logic */
  flags?: Record<string, boolean | string | number>;

  /** Anything else you want to store per-user */
  [key: string]: any;
}
