/**
 * UOSPC design tokens, mirrored in TypeScript.
 *
 * `src/styles/tokens.css` is the runtime source of truth; this module exposes
 * the same values to code that cannot read CSS variables (charts, canvas,
 * emails, tests, documentation).
 */

export const palette = {
  backgroundPrimary: "#F8FAFC",
  backgroundSecondary: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  accentPrimary: "#2563EB",
  accentSecondary: "#0EA5E9",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const categoryColors = {
  course: "#2563EB",
  td: "#7C3AED",
  tp: "#16A34A",
  exam: "#EF4444",
  video: "#F97316",
} as const;

export type ResourceCategory = keyof typeof categoryColors;

/** Tailwind classes for each resource category badge. */
export const categoryBadgeClass: Record<ResourceCategory, string> = {
  course: "bg-category-course-subtle text-category-course",
  td: "bg-category-td-subtle text-category-td",
  tp: "bg-category-tp-subtle text-category-tp",
  exam: "bg-category-exam-subtle text-category-exam",
  video: "bg-category-video-subtle text-category-video",
};

/** 8px rhythm (4px half-steps for dense controls). */
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 40,
  8: 48,
  9: 64,
  10: 80,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  full: 9999,
} as const;

export const typography = {
  fontFamily: '"Inter", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(17 24 39 / 0.04)",
  sm: "0 1px 2px 0 rgb(17 24 39 / 0.05), 0 1px 3px 0 rgb(17 24 39 / 0.04)",
  md: "0 2px 4px -1px rgb(17 24 39 / 0.06), 0 4px 10px -2px rgb(17 24 39 / 0.06)",
  lg: "0 8px 24px -6px rgb(17 24 39 / 0.12)",
} as const;

export const layout = {
  maxContentWidth: 1400,
  gutter: 16,
  gutterLarge: 24,
  headerHeight: 64,
} as const;

export const controlHeights = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;
