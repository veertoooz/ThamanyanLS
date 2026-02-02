# ThamanyanLS

**Context-aware layout system for deep interfaces**

Layout should reflect structure, not the designer's memory.

---

## What is ThamanyanLS

ThamanyanLS is a CSS layout system that automatically computes **gap** and **padding** from layout nesting depth.

It is intended for interfaces where layouts are deep, multi-layered, and structural—and where manual spacing leads to chaos.

ThamanyanLS is not a framework and not a UI library.  
It is layout logic: minimal, predictable, and framework-agnostic.

---

## The problem it solves

In modern UIs we often see:

- Irregular spacing in nested layouts
- Manual gap/padding at every level
- Inconsistent space between components
- Layout rules that are hard to maintain

ThamanyanLS fixes this by **tying spacing to logical layout depth**.

---

## Core idea

ThamanyanLS treats layout as a **tree**.

Each layout node has:

- **Depth** (level)
- **Base spacing**
- **Computed gap and padding**

### Spacing formula

```
BaseSize = 1rem

Level 1 → gap = 1rem
Level 2 → gap = 0.5rem
Level 3 → gap ≈ 0.333rem
Level N → gap = BaseSize / N
```

Spacing is computed automatically using **CSS Custom Properties** only.

---

## What ThamanyanLS does

- Uses flex layout
- Calculates gap automatically
- Calculates padding automatically
- Works with infinite nesting (optional JS for automatic level)
- Optional JavaScript for automatic level (unlimited depth); without script, only root has level 1 or override `--t-level` manually
- Framework-agnostic
- Works alongside Tailwind and daisyUI

---

## What it does NOT do

- Does not provide UI components
- Does not manage colors or typography
- Does not replace Tailwind or daisyUI
- Does not enforce design decisions

ThamanyanLS deals only with **layout logic**.

---

## Layout model

- Layout is always `display: flex`
- Default direction is `column`; add `row` for horizontal
- Spacing is contextual, not manual

This is a deliberate constraint.

---

## Token contract

ThamanyanLS exposes a **fixed set of size-only CSS variables** for consumers (e.g. ParajanovCS). Consumers should rely only on these names and not on implementation details.

**Public API (Option B):** One variable per kind; the value is set per depth context via class `.ls-d0` … `.ls-d5`.

| Token | Description |
|-------|-------------|
| `--ls-space` | Base spacing unit (padding, gap) |
| `--ls-gap` | Gap between items |
| `--ls-padding` | Typical container padding |
| `--ls-radius` | border-radius |
| `--ls-text` | font-size |
| `--ls-border` | border-width |

**Depth:** Use classes `.ls-d0` (largest) through `.ls-d5` (smallest). **Max depth is 5**—do not rely on `.ls-d6` or deeper. Depth classes are applied automatically by the optional script, or add `ls-d0` … `ls-d5` manually.

**Prefix:** Only `--ls-*` for these size tokens. ThamanyanLS does not define color variables (that is SaryanTS).

**Root-controlled system:** All depth values are derived from `:root` variables. Override them on `:root` or `html` to tune the whole system (before or after loading thamanyan.js):

| Root variable | Default | Description |
|---------------|---------|-------------|
| `--ls-base` | `1rem` | Base unit for space, gap, padding at depth 0. |
| `--ls-breakpoint` | `48rem` | Responsive breakpoint (rows stack below this). Use `--ls-breakpoint-sm` (24rem), `--ls-breakpoint-md` (48rem), or `--ls-breakpoint-lg` (64rem) to override. |
| `--ls-scale` | `0.85` | Scale factor per depth (d1 = base × scale, d2 = base × scale², …). |
| `--ls-radius-ratio` | `0.375` | Radius at each depth = that depth’s space × this ratio. |
| `--ls-text-ratio` | `1` | Text size at each depth = that depth’s space × this ratio. |
| `--ls-border-ratio` | `0.0625` | Border at each depth = that depth’s space × this ratio (d0 ≈ 1px at 1rem base). |
| `--ls-h1-ratio` | `1.5` | h1 font-size = --ls-text × this ratio inside depth. |
| `--ls-h2-ratio` | `1.25` | h2 font-size = --ls-text × this ratio inside depth. |
| `--ls-h3-ratio` | `1.125` | h3 font-size = --ls-text × this ratio inside depth. |
| `--ls-h4-ratio` | `1.0625` | h4 font-size = --ls-text × this ratio inside depth. |
| `--ls-h5-ratio` | `1` | h5 font-size = --ls-text × this ratio inside depth. |
| `--ls-h6-ratio` | `0.9375` | h6 font-size = --ls-text × this ratio inside depth. |
| `--ls-small-ratio` | `0.875` | small font-size = --ls-text × this ratio inside depth. |

Inside any depth context (`.ls-d0` … `.ls-d5`), **all HTML5 content elements are relative by default** — headings, sections, lists, forms, tables, inline text, and embedded media. No classes or `var(--ls-text)` needed. See [docs/reference.md](docs/reference.md#html5-elements-inside-depth) for the full list.

Example: `:root { --ls-base: 1.25rem; --ls-scale: 0.9; }` for a larger, gentler scale. You only load thamanyan.js; override in your own CSS if needed.

---

## Installation

```bash
npm install thamanyanls
```

Then in your app (include viewport meta for mobile; single script injects styles and sets automatic level):

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="node_modules/thamanyanls/dist/thamanyan.js"></script>
```

Or with a bundler:

```js
import 'thamanyanls';
```

You can also copy `dist/thamanyan.js` into your project. Without the script, only the root layout has level 1; nested layouts need manual `--t-level` override.

**Documentation:** See the [docs](docs/README.md) folder for full documentation (getting started, reference, examples).

---

## Usage

### Basic example

```html
<div class="t-layout">
  <div class="t-layout row">
    <div class="t-layout">
      Content
    </div>
  </div>
</div>
```

Result:

- Outer layout → larger spacing
- Inner layout → tighter spacing
- All automatic

**App shell:** Use `t-layout-app` for full viewport with sticky header, scrollable main, and fixed footer:

```html
<div class="t-layout t-layout-app">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

**Grow / shrink / wrap / scroll:** Use `t-layout-grow` on the layout that should take remaining space (e.g. main content), `t-layout-sidebar` for responsive sidebar (or `t-layout-shrink-0` for fixed-width), `t-layout-container` for content width (80ch), `t-layout-scroll` for scrollable flex children. Use `t-layout-wrap` on a row so items wrap on narrow space. For non-layout flex children (e.g. `span`), use `t-flex-1`, `t-flex-2`, `t-flex-3` to grow or `t-flex-none` for fixed size.

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-sidebar">Sidebar</aside>
  <main class="t-layout column t-layout-grow">Content</main>
</div>
<div class="t-layout row t-layout-wrap">...</div>
```

---

## How it works (simplified)

```css
.t-layout {
  --t-level: 1;
  --t-base: 1rem;
  --t-gap: calc(var(--t-base) / var(--t-level));

  display: flex;
  gap: var(--t-gap);
  padding: var(--t-gap);
}

.t-layout > .t-layout {
  --t-level: calc(var(--t-level) + 1);
}
```

CSS inheritance does the rest.

---

## Tailwind & daisyUI integration

ThamanyanLS is designed to work with:

- Next.js
- Tailwind CSS
- daisyUI

**Recommended separation:**

- Tailwind → utilities
- daisyUI → component look
- ThamanyanLS → layout structure

They do not conflict.

---

## Configuration (optional)

**Override base spacing:**

```css
.t-layout {
  --t-base: 1.25rem;
}
```

**Gap bounds (min/max):**

Gap is clamped so deep nesting does not make it too small and root does not exceed a max. Override with `--t-gap-min` (default `0.25rem`) and `--t-gap-max` (default `1rem`).

```css
.t-layout {
  --t-gap-min: 0.5rem;
  --t-gap-max: 1.5rem;
}
```

**Override level manually:**

```html
<div class="t-layout" style="--t-level: 1">
```

**Disable automatic spacing (opt-out):**

```html
<div class="t-layout" data-manual>
```

```css
.t-layout[data-manual] {
  gap: unset;
  padding: unset;
}
```

**Responsive (mobile):**

Responsive behavior is default. On narrow viewports (≤`--ls-breakpoint`, default 48rem), all `.t-layout.row` stack as columns. To keep a row horizontal (e.g. navbar), add `data-t-no-responsive`. Override the breakpoint: `:root { --ls-breakpoint: var(--ls-breakpoint-sm); }`. For show/hide at breakpoints, use `t-below-sm-hide`, `t-above-md-show`, `t-above-md-hide`, and similar utilities.

```html
<div class="t-layout column">
  ...
</div>
```

**Alignment:**

Layout uses `justify-content` and `align-items`. Set via CSS variables `--t-justify` (default `flex-start`) and `--t-align` (default `stretch`), or use classes on the layout element:

- Justify: `t-layout-justify-end`, `t-layout-justify-center`, `t-layout-justify-between`, `t-layout-justify-around`
- Align: `t-layout-align-center`, `t-layout-align-end`, `t-layout-align-start`, `t-layout-align-baseline`

```html
<div class="t-layout row t-layout-justify-between">...</div>
<div class="t-layout column t-layout-align-center">...</div>
```

**RTL:** When the document has `dir="rtl"` on `html`, `.t-layout.row` automatically uses `row-reverse`. No extra class needed.

**Print stack:** Add `t-layout-print-stack` to your root layout so all rows stack as columns when printing.

```html
<div class="t-layout column t-layout-print-stack">...</div>
```

**Gap-only or padding-only:** Use `data-t-no-padding` on a layout for gap but no padding; use `data-t-no-gap` for padding but no gap. **Gap override:** Use `t-layout-gap-none`, `t-layout-gap-tight` (0.5×), or `t-layout-gap-loose` (1.5×) to override default gap. **Padding override:** Use `t-layout-padding-none`, `t-layout-padding-tight`, or `t-layout-padding-loose` similarly. **Width utilities:** Use `t-min-w-0` for flex row overflow fix (truncate/scroll); `t-min-h-0` for flex column overflow fix; `t-w-full` to fill parent width. Use `t-overflow-hidden` or `t-overflow-auto` for standalone overflow control.

```html
<div class="t-layout row" data-t-no-padding>...</div>
```

**Safe area:** Add `t-layout-safe-area` on the root layout to add `env(safe-area-inset-*)` to padding (for notched devices / home indicator).

```html
<div class="t-layout column t-layout-safe-area">...</div>
```

**Order:** Use `t-layout-order-1` … `t-layout-order-5`, or `t-layout-order-first` / `t-layout-order-last` on **children** of a layout to change visual order without changing the DOM.

**Reverse direction:** Use `t-layout-reverse` with `column` or `row` for `column-reverse` or `row-reverse` (e.g. chat with newest at bottom).

**SPA / dynamic content:** When using React, Vue, or similar, call `ThamanyanLS.init()` after DOM changes so new layouts get correct levels.

```html
<div class="t-layout row">
  <span class="t-layout-order-last">Shown last</span>
  <span class="t-layout-order-first">Shown first</span>
</div>
```

---

## When to use ThamanyanLS

- Deep dashboards
- Nested editors
- Knowledge systems
- OS-like interfaces
- Graph / universe-style UI systems

---

## Why ThamanyanLS

The name is inspired by architectural thinking:

- Structure comes first
- Form follows structure
- Space is governed by rules

ThamanyanLS treats CSS not as decoration, but as **architecture**.

---

## Philosophy

UI should not only look good—it should make sense spatially.

ThamanyanLS turns spacing into a reflection of information hierarchy.

---

## Publishing

Before publishing to npm:

1. **Name:** If `thamanyanls` is taken, switch to a scoped name (e.g. `@veertoooz/thamanyanls`) and ensure `publishConfig.access` is `"public"`.
2. **Auth:** Run `npm login` (or confirm with `npm whoami`).
3. **Version:** Bump if needed: `npm version patch|minor|major` or edit `version` in package.json.
4. **Dry run:** Run `npm pack` and inspect the generated `.tgz` (should contain package.json, README, LICENSE, and `dist/`).

Then publish:

- Unscoped: `npm publish`
- Scoped: `npm publish --access public` (or rely on `publishConfig.access` in package.json)

---

## License

MIT
