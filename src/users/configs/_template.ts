import { UserConfig } from "../types";

/**
 * Template user config.
 *
 * 1. Replace "USER_UUID_HERE" with the real UUID from the profiles table.
 * 2. Uncomment the fields you want to customize.
 * 3. Import this file in src/users/userConfigs.ts and add it to the registry.
 */

const templateUser: UserConfig = {
  id: "USER_UUID_HERE",
  displayName: "User Name",

  // welcomeMessage: "Welcome back, chief! Ready to study?",

  // Hide master years for L1/L2 students:
  // hiddenYears: ["m1", "m2"],

  // Show only specific years:
  // showOnlyYears: ["l1", "l2"],

  // Hide specific sections:
  // hiddenSections: ["programming-languages"],

  // Custom banner on home page:
  // customBanner: "Focus on your L2 modules this semester!",

  // Toggle sections:
  // showProgrammingLanguages: false,
  // showFeedbackLink: false,

  // Hide specific modules by slug:
  // hiddenModules: { "method-num": true },

  // Hide whole semesters:
  // hiddenSemesters: { "l3-s5": true },

  // Generic custom flags for any page logic:
  // flags: { showStudyTimer: true, showTodaysGoal: "Finish Algo TD 3" },
};

export default templateUser;
