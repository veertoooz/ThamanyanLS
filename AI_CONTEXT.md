# AI context — ThamanyanLS

This document helps AI agents quickly understand the project: what it is, how it is structured, and how to extend it without breaking changes.

---

## 1. Project identity

**ThamanyanLS** is a context-aware layout system for deep interfaces. Spacing (gap and padding) is computed from layout nesting depth: outer layouts get larger gaps, inner layouts get tighter gaps, automatically.

- **Flex-only, optional JavaScript for automatic level (unlimited depth), framework-agnostic.** It is not a UI library and not a Tailwind plugin.
- **Layout reflects structure.** Spacing formula: `gap = clamp(--t-gap-min, --t-base / --t-level, --t-gap-max)` (default base 1rem; level 1 → 1rem, level 2 → 0.5rem, etc.).

---

## 2. Core principles

- **Optional JS for level** — The optional `thamanyan.js` script sets `--t-level` on each `.t-layout` by nesting depth (unlimited). Without the script, only the root has level 1; override `--t-level` manually on nested layouts if needed. All other behavior is CSS (flex, custom properties, media queries).
- **Layout by depth** — Each `.t-layout` has `--t-level` (set by script or manually). Gap and padding are derived from that level.
- **Opt-in features** — Responsive (rows stack on narrow viewport), print stack, safe area, gap-only/padding-only are enabled via classes or data attributes on the layout, not by default.
- **No breaking changes** — New features are additive: new classes or data attributes. Do not remove or rename existing ones without a major version.

---

## 3. Repo structure

| Path | Role |
|------|------|
| `src/thamanyan.css` | Single source of truth; all layout CSS. Edit only this file for layout logic. |
| `src/thamanyan.js` | Optional script; sets `--t-level` on each `.t-layout` by nesting depth (unlimited). |
| `dist/thamanyan.css` | Build output (copy of src); published to npm. |
| `dist/thamanyan.js` | Build output (copy of src); optional script for automatic level. |
| `package.json` | `name`, `main`/`style` → dist CSS, `unpkg` → dist JS, `files: ["dist"]`, `build` copies both CSS and JS, `prepublishOnly` runs build. |
| `README.md` | User-facing docs; npm displays it on the package page. |
| `docs/` | Full documentation: getting-started, reference, examples. |
| `examples/` | `basic.html`, `dashboard.html`, `tailwind-daisyui.html` — demos (include script for level). |

**Build:** `npm run build` copies `src/thamanyan.css` and `src/thamanyan.js` to `dist/`. No bundler, no minification by default.

---

## 4. Naming and conventions

- **Class prefix:** `t-layout` (base; use with `column` or `row`). Modifiers: `t-layout-*` (e.g. `t-layout-grow`, `t-layout-responsive`, `t-layout-justify-between`).
- **Data attributes:** `data-manual` (opt-out of automatic gap/padding), `data-t-no-padding`, `data-t-no-gap`.
- **CSS variables (on `.t-layout` or parent):** `--t-level`, `--t-base`, `--t-gap`, `--t-gap-min`, `--t-gap-max`, `--t-justify`, `--t-align`.

---

## 5. Key concepts (for edits)

- **Level:** Root `.t-layout` has `--t-level: 1` in CSS. Nested level is set by optional `thamanyan.js` (querySelectorAll `.t-layout`, count ancestor `.t-layout`, setProperty `--t-level`). Without script, only root has level 1; override manually if needed.
- **Gap formula:** `--t-gap: clamp(var(--t-gap-min, 0.25rem), calc(var(--t-base) / var(--t-level)), var(--t-gap-max, 1rem))`.
- **Direction:** `.t-layout.column` → `flex-direction: column`; `.t-layout.row` → `flex-direction: row`.
- **Responsive:** Class `t-layout-responsive` on root + `@media (max-width: 48rem)` → all `.t-layout.row` inside that root become column (stack).
- **RTL:** `html[dir="rtl"] .t-layout.row` → `flex-direction: row-reverse`. No class needed.
- **Print:** Class `t-layout-print-stack` on root + `@media print` → rows stack as column when printing.
- **Safe area:** Class `t-layout-safe-area` on root → padding includes `env(safe-area-inset-*)`.

---

## 6. How to add or change features

- **CSS:** Edit only `src/thamanyan.css`. Add short comments for new blocks. Keep section order: base layout → modifiers (grow/shrink, wrap, alignment) → responsive media → RTL → print → opt-out (data attrs) → safe area → order utilities.
- **Docs:** Update `README.md` (Configuration and/or Usage) and `docs/reference.md` (tables). Optionally `docs/getting-started.md` or `docs/examples.md` if the feature affects first steps or examples.
- **Examples:** If the feature is user-facing, add usage to `examples/basic.html` or `examples/dashboard.html`.
- **Build:** After editing src, run `npm run build` to refresh `dist/thamanyan.css`.

---

## 7. What NOT to do

- Do not add JavaScript except the optional level script (`thamanyan.js`); no other runtime JS for layout.
- Do not add a Tailwind plugin (out of scope; the library is standalone CSS).
- Do not add UI components (buttons, cards, typography, colors); only layout structure.
- Do not remove or rename existing classes or data attributes without a major version; prefer additive changes.

---

## 8. Files to read first

When working on this project, read in this order:

1. `AI_CONTEXT.md` (this file)
2. `src/thamanyan.css`
3. `README.md`
4. `docs/reference.md`

This gives identity, implementation, user-facing overview, and full API in minimal reads.
