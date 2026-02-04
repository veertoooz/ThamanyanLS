# ThamanyanLS

**Context-aware layout system for deep interfaces**

Layout should reflect structure, not the designer's memory.

---

## What is ThamanyanLS

ThamanyanLS is a CSS layout system that automatically computes **gap** and **padding** from layout nesting depth.

It is intended for interfaces where layouts are deep, multi-layered, and structural—and where manual spacing leads to chaos.

ThamanyanLS is not a framework and not a UI library.  
It is layout logic: minimal, predictable, and framework-agnostic.

**Ecosystem:** ThamanyanLS · SaryanTS · ParajanovCS · Dodo. ParajanovCS consumes `--ls-*` tokens for UI components.

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
- Works with Tailwind, daisyUI, ParajanovCS, or plain CSS — no conflicts

---

## What it does NOT do

- Does not provide UI components
- Does not manage colors or typography
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

## Configuration (optional)

**Override base spacing:**

```css
.t-layout {
  --t-base: 1.25rem;
}
```

**Gap bounds (min/max):** Override `--t-gap-min` (default `0.25rem`) and `--t-gap-max` (default `1rem`).

**Override level manually:** `style="--t-level: 1"` on a layout.

**Disable automatic spacing:** Add `data-manual` to opt out of gap/padding.

**Responsive:** Default. Rows stack on narrow viewport (≤`--ls-breakpoint`). Add `data-t-no-responsive` to keep a row horizontal (e.g. navbar).

**SPA / dynamic content:** Call `ThamanyanLS.init()` after DOM changes.

For alignment, RTL, print stack, safe area, order, reverse, gap/padding overrides, and breakpoint utilities, see [docs/reference.md](docs/reference.md).

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

`npm run build` then `npm publish`. For scoped packages use `--access public`. See package.json `files` and `publishConfig`.

---

## License

MIT
