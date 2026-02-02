# Reference

Complete list of classes, CSS variables, and data attributes.

---

## Base layout

| Class | Description |
|-------|-------------|
| `t-layout` | Flex container. Must be used with `column` or `row`. |
| `t-layout column` | `flex-direction: column`. |
| `t-layout row` | `flex-direction: row`. |
| `t-layout-reverse` | Use with `column` or `row` for `column-reverse` or `row-reverse`. |

**Nesting:** Level is set by the optional `thamanyan.js` script (unlimited depth). Each `.t-layout` gets `--t-level` equal to its nesting depth; gap and padding are computed from that. Without the script, only the root has level 1—override `--t-level` manually on nested layouts if needed.

---

## Flex behavior

| Class | Description |
|-------|-------------|
| `t-layout-grow` | `flex: 1` — use on the layout that should take remaining space. |
| `t-layout-grow-2` | `flex: 2` — grow twice as much as `t-layout-grow`. |
| `t-layout-grow-3` | `flex: 3` — grow three times as much. |
| `t-layout-grow-auto` | `flex: 1 1 auto` — grow from content size instead of 0. |
| `t-layout-shrink-0` | `flex-shrink: 0` — use on fixed-width layouts (e.g. sidebar). |
| `t-layout-shrink` | `flex-shrink: 1` — explicit shrink when needed. |
| `t-layout-scroll` | `min-height: 0; overflow: auto` — for scrollable flex children (e.g. long lists). |
| `t-layout-wrap` | `flex-wrap: wrap` — row items wrap on narrow space. |
| `t-layout-wrap-reverse` | `flex-wrap: wrap-reverse`. |
| `t-layout-fill` | `min-height: 100%` — fill parent height. |
| `t-layout-min-h-screen` | `min-height: 100vh` — full viewport height. |
| `t-layout-overflow-hidden` | `overflow: hidden`. |
| `t-layout-overflow-x-auto` | `overflow-x: auto`. |
| `t-layout-overflow-y-auto` | `overflow-y: auto`. |
| `t-layout-sticky` | `position: sticky; top: 0` — for sticky headers/sidebars. Override `top` via CSS if needed. |

Use these **on the same element** as `t-layout` (e.g. `class="t-layout column t-layout-grow"`).

---

## Alignment

Layouts use `justify-content` and `align-items`. Set via variables or classes.

**Justify (main axis):**

| Class | Effect |
|-------|--------|
| `t-layout-justify-end` | `flex-end` |
| `t-layout-justify-center` | `center` |
| `t-layout-justify-between` | `space-between` |
| `t-layout-justify-around` | `space-around` |

**Align (cross axis):**

| Class | Effect |
|-------|--------|
| `t-layout-align-center` | `center` |
| `t-layout-align-end` | `flex-end` |
| `t-layout-align-start` | `flex-start` |
| `t-layout-align-baseline` | `baseline` |

**CSS variables:** `--t-justify` (default `flex-start`), `--t-align` (default `stretch`). Override on the layout element if needed.

**Align-self (children):** Use on **children** of `.t-layout` to override parent `align-items`:

| Class | Effect |
|-------|--------|
| `t-layout-self-center` | `align-self: center` |
| `t-layout-self-start` | `align-self: flex-start` |
| `t-layout-self-end` | `align-self: flex-end` |
| `t-layout-self-stretch` | `align-self: stretch` |
| `t-layout-self-baseline` | `align-self: baseline` |

---

## Order (flex children)

Use on **children** of a layout to change visual order without changing the DOM.

| Class | Effect |
|-------|--------|
| `t-layout-order-1` … `t-layout-order-5` | `order: 1` … `order: 5` |
| `t-layout-order-first` | `order: -9999` |
| `t-layout-order-last` | `order: 9999` |

---

## Responsive and print

| Class | Where | Effect |
|-------|--------|-------|
| `t-layout-responsive` | Root layout | On viewport ≤ `--ls-breakpoint` (default 48rem), all `.t-layout.row` inside stack as column. |
| `t-layout-print-stack` | Root layout | In print, all `.t-layout.row` inside stack as column. |

---

## Opt-in behavior

| Class | Effect |
|-------|--------|
| `t-layout-safe-area` | Adds `env(safe-area-inset-*)` to padding (notch / home indicator). Use on root layout. |

---

## Data attributes

| Attribute | Effect |
|-----------|--------|
| `data-manual` | Disables automatic gap and padding (`gap: unset; padding: unset`). |
| `data-t-no-padding` | Padding set to 0; gap unchanged. |
| `data-t-no-gap` | Gap set to 0; padding unchanged. |

---

## CSS variables

Set on `.t-layout` (or a parent) to override.

| Variable | Default | Description |
|----------|---------|-------------|
| `--t-level` | 1 (incremented for nested `.t-layout`) | Depth used for gap/padding. Override to force a level. |
| `--t-base` | 1rem | Base size for gap formula. |
| `--t-gap-min` | 0.25rem | Minimum gap (clamp). |
| `--t-gap-max` | 1rem | Maximum gap (clamp). |
| `--t-gap-row` | `var(--t-gap)` | Row gap (vertical when column, horizontal when row). |
| `--t-gap-column` | `var(--t-gap)` | Column gap. |
| `--t-justify` | flex-start | `justify-content`. |
| `--t-align` | stretch | `align-items`. |

**Gap formula:** `gap = clamp(--t-gap-min, --t-base / --t-level, --t-gap-max)`. Use `--t-gap-row` and `--t-gap-column` if you need different row vs column gap. Depth layouts use uniform `--ls-gap`; override with custom CSS if needed.

**Override level example:**

```html
<div class="t-layout column" style="--t-level: 1">...</div>
```

**Override base and bounds:**

```css
.t-layout {
  --t-base: 1.25rem;
  --t-gap-min: 0.5rem;
  --t-gap-max: 1.5rem;
}
```

---

## Root variables (tune the whole system)

Override on `:root` or `html` to control the relative scale. Defaults are applied by ThamanyanLS; you only need to load thamanyan.js.

| Variable | Default | Description |
|----------|---------|-------------|
| `--ls-base` | `1rem` | Base unit at depth 0 (space, gap, padding). |
| `--ls-breakpoint` | `48rem` | Responsive breakpoint for `t-layout-responsive` (viewport max-width). |
| `--ls-scale` | `0.85` | Scale per depth (d1 = base × scale, d2 = base × scale², …). |
| `--ls-radius-ratio` | `0.375` | Radius = depth’s space × this ratio. |
| `--ls-text-ratio` | `1` | Text size = depth’s space × this ratio. |
| `--ls-border-ratio` | `0.0625` | Border at each depth = that depth’s space × this ratio (d0 ≈ 1px at 1rem base). |
| `--ls-h1-ratio` | `1.5` | h1 = --ls-text × this ratio inside depth. |
| `--ls-h2-ratio` | `1.25` | h2 = --ls-text × this ratio inside depth. |
| `--ls-h3-ratio` | `1.125` | h3 = --ls-text × this ratio inside depth. |
| `--ls-h4-ratio` | `1.0625` | h4 = --ls-text × this ratio inside depth. |
| `--ls-h5-ratio` | `1` | h5 = --ls-text × this ratio inside depth. |
| `--ls-h6-ratio` | `0.9375` | h6 = --ls-text × this ratio inside depth. |
| `--ls-small-ratio` | `0.875` | small = --ls-text × this ratio inside depth. |

**Default typography and spacing:** Inside any depth context, all HTML5 content elements are relative by default (see table below). No classes or `var(--ls-text)` needed.

---

## HTML5 elements inside depth

Inside `.ls-d0` … `.ls-d5`, these elements get depth-relative typography, spacing, and/or border/radius:

| Tag | Typography | Spacing (gap / padding) | Border / radius |
|-----|------------|-------------------------|-----------------|
| h1–h6 | ratio / inherit | gap via flex parent | — |
| p, blockquote, pre, address | inherit | gap via flex parent | — |
| section, article, aside, header, footer, nav, main | inherit | flex column + gap --ls-space | — |
| ul, ol | inherit | flex column + gap, padding-inline-start | — |
| li, dl, dt, dd | inherit | gap via flex parent (ul/ol/dl) | — |
| figure, figcaption, hr, details | inherit | flex column + gap (figure, details); hr gets margin-block --ls-space | — |
| a, small, span, code, … (inline) | inherit or ratio | — | — |
| form, input, button, select, textarea, … | inherit | padding --ls-padding | border --ls-border, radius --ls-radius |
| table, th, td, caption | inherit | padding --ls-padding | border --ls-border |
| img, video | — | — | border-radius --ls-radius, max-width 100% |

---

## Layout system tokens (`--ls-*`)

**Token contract (Option B):** One variable per kind; value is set per depth context by class `.ls-d0` … `.ls-d5`. All values are derived from the root variables above. Consumers (e.g. ParajanovCS) should use only these names.

| Token | Description | Notes |
|-------|-------------|-------|
| `--ls-space` | Base spacing unit | Set per depth by `.ls-d0` … `.ls-d5`. |
| `--ls-gap` | Gap between items | Same scale as space. |
| `--ls-padding` | Typical container padding | Same scale. |
| `--ls-radius` | border-radius | Scaled by depth. |
| `--ls-text` | font-size | Scaled by depth. |
| `--ls-border` | border-width | Depth-relative: space × --ls-border-ratio at each depth. |

**Depth classes:** Apply one per layout to set the six tokens in that scope.

| Class | Depth | Notes |
|-------|-------|-------|
| `ls-d0` | 0 (root, largest) | 1rem space, 0.375rem radius, 1rem text. |
| `ls-d1` … `ls-d5` | 1 … 5 (smaller) | Values scale down (e.g. 0.85× per level). |
| — | **Max depth 5** | Do not rely on `ls-d6` or deeper. |

The optional script adds one of `ls-d0` … `ls-d5` to each `.t-layout` automatically; or add the class manually.

---

## Re-run API (SPA / dynamic content)

When using React, Vue, or other SPAs, layouts may be added after the initial load. Call `ThamanyanLS.init()` after DOM changes to recalculate levels and depth classes:

```js
// After mount or update
if (window.ThamanyanLS) ThamanyanLS.init();
```

Example with React `useEffect`:

```js
useEffect(() => {
  ThamanyanLS?.init();
});
```

---

## RTL

When `<html dir="rtl">`, `.t-layout.row` automatically uses `flex-direction: row-reverse`. No extra class.
