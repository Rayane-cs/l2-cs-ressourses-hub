# UOSPC Design System (v2)

The visual language for the UOSPC Computer Science Student Hub. It should read
like a modern academic productivity app: clean, dense, readable, functional.

Live reference: run the app and open `/design-system`.

## Sources of truth

| Layer | File | Use |
| --- | --- | --- |
| CSS variables | `src/styles/tokens.css` | runtime tokens (light + dark) |
| Tailwind mapping | `tailwind.config.ts` | utility classes built from the tokens |
| Shared classes | `src/index.css` (`@layer components`) | `.ds-container`, `.ds-card`, `.ds-nav-item`, … |
| TypeScript mirror | `src/lib/design-tokens.ts` | values for charts, canvas, tests, docs |
| Primitives | `src/components/ui/*` | `Button`, `Card`, `Badge`, `Input`, `Textarea`, layout |

Never hard-code a hex value in a component — use a token.

## Colour

Neutral base, one blue accent.

| Role | Token | Light value |
| --- | --- | --- |
| Page background | `--background` / `bg-background` | `#F8FAFC` |
| Surface (cards, header) | `--surface` / `bg-surface` | `#FFFFFF` |
| Primary text | `--foreground` / `text-foreground` | `#111827` |
| Secondary text | `--muted-foreground` | `#64748B` |
| Border | `--border` | `#E2E8F0` |
| Primary accent | `--primary` | `#2563EB` |
| Secondary accent | `--accent` | `#0EA5E9` |
| Success | `--success` | `#16A34A` |
| Warning | `--warning` | `#F59E0B` |
| Danger | `--danger` | `#EF4444` |

Each status colour also has a `-subtle` tint for badge/alert backgrounds.

Category colours tag content types only — never page chrome:

| Category | Token | Badge |
| --- | --- | --- |
| Courses | `--category-course` (blue) | `<Badge variant="course">` |
| TD | `--category-td` (violet) | `<Badge variant="td">` |
| TP | `--category-tp` (green) | `<Badge variant="tp">` |
| Exams | `--category-exam` (red) | `<Badge variant="exam">` |
| Videos | `--category-video` (orange) | `<Badge variant="video">` |

Dark mode overrides the same variables under `.dark`; components need no
dark-specific classes.

## Typography

Inter (fallbacks: Plus Jakarta Sans, system sans). Scale: 12 / 14 / 16 / 18 /
20 / 24 / 30 px. Headings are semibold-to-bold and never larger than 30px on a
page title. Body copy is 16px with 1.6 line-height.

## Spacing

8px rhythm (`--space-*`: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80). Tailwind's
numeric scale is unchanged (4px base), so prefer even steps: `gap-2` (8px),
`p-4` (16px), `space-y-6` (24px). Named utilities `p-ds-5`, `gap-ds-4`, … map
directly to the token scale.

## Layout

- Max content width 1400px via `.ds-container` or `max-w-content`.
- Gutters: 16px mobile, 24px from `md`.
- Header height 64px (`--header-height`).
- Mobile is single column; grids start at `md`.

Helpers in `src/components/ui/layout.tsx`: `PageContainer`, `PageHeader`
(compact title block — no hero), `Section`, `NavItem`.

## Cards

White surface, 1px `#E2E8F0` border, 12px radius, `shadow-sm`, 24px padding.
Add `.ds-card-interactive` for a hover state (border darkens, `shadow-md`). No
glow, no gradient, no heavy shadow.

## Buttons

| Variant | Appearance |
| --- | --- |
| `default` | solid blue, white text |
| `secondary` | white surface, gray border |
| `outline` | white surface, gray border, neutral text |
| `ghost` | transparent, muted text |
| `destructive` | solid red |
| `success` | solid green |
| `link` | blue underline on hover |

Sizes: `sm` 32px, `default` 40px, `lg` 48px, plus `icon` / `icon-sm`.
Focus is a 3px blue ring (`shadow-focus`).

## Inputs

40px height, 8px radius, 1px border, white background, blue border + focus ring
on focus, muted background when disabled. Pair with `Label`.

## Navigation

Styled from `--nav-item-*`: 36px height, 8px radius, muted text; hover fills
with `--muted`; active uses `--primary-subtle` background with blue text. Use
`<NavItem active={…}>` or the `.ds-nav-item` class with `data-active="true"`.

## Badges

Full radius, 12px medium text, 8px horizontal padding, subtle tinted background
with the matching accent text colour.

## Motion

One duration (150ms) and one easing (`cubic-bezier(0.4, 0, 0.2, 1)`) via
`--transition-base`, applied to colour, border, and shadow only.
`prefers-reduced-motion` disables animation globally.

## Migration notes

- Legacy utilities (`gradient-hero`, `gradient-card`, `shadow-glow`,
  `shadow-card`, `shadow-hover`, `transition-smooth`) still exist but now
  resolve to flat, subtle values so existing pages keep rendering. Remove them
  as each page is migrated.
- The old per-theme palettes (pink / red / green) are gone; `ThemeColorContext`
  still sets `data-theme` but no longer changes colours. Blue is the single
  brand accent. Removing that context is a follow-up once pages are migrated.
