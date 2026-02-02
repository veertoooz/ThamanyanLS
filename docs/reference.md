# Reference

Complete list of classes, CSS variables, and data attributes.

---

## Base layout

| Class | Description |
|-------|-------------|
| `t-layout` | Flex container. Default direction is column; add `row` for horizontal. |
| `t-layout column` | `flex-direction: column` (explicit; default). |
| `t-layout row` | `flex-direction: row`. |
| `t-layout-reverse` | Use with `column` or `row` for `column-reverse` or `row-reverse`. |
| `t-layout-root` | Full viewport (`min-height: 100vh` / `100dvh`). Direct child `main` gets flex 1, scroll. |
| `t-layout-app` | App shell preset: header (sticky), main (scroll), footer (shrink-0). Use with `header`, `main`, `footer` tags. |

**Nesting:** Level is set by the optional `thamanyan.js` script (unlimited depth). Each `.t-layout` gets `--t-level` equal to its nesting depth; gap and padding are computed from that. Without the script, only the root has level 1—override `--t-level` manually on nested layouts if needed.

---

## Flex behavior

| Class | Description |
|-------|-------------|
| `t-layout-grow` | `flex: 1` — use on the layout that should take remaining space. |
| `t-layout-grow-2` | `flex: 2` — grow twice as much as `t-layout-grow`. |
| `t-layout-grow-3` | `flex: 3` — grow three times as much. |
| `t-layout-grow-4` | `flex: 4` — grow four times as much. |
| `t-layout-grow-5` | `flex: 5` — grow five times as much. |
| `t-layout-grow-auto` | `flex: 1 1 auto` — grow from content size instead of 0. |
| `t-layout-shrink-0` | `flex-shrink: 0` — use on fixed-width layouts (e.g. sidebar). |
| `t-layout-sidebar` | Responsive sidebar: `min-width: min(var(--ls-sidebar-min, 10rem), 100%)`, `flex-shrink: 0`. Use instead of `t-layout-shrink-0` + inline min-width. |
| `t-layout-container` | Content width: `max-width: var(--ls-container)`, centered. Use for readable line length (default 80ch). |
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

**Gap override:** Use `t-layout-gap-none`, `t-layout-gap-tight`, or `t-layout-gap-loose` to override default gap. Inside flex column with gap, block flow margin (p + p) may be additive; override with custom CSS if needed.

| Class | Effect |
|-------|--------|
| `t-layout-gap-none` | `gap: 0` — class alternative to data-t-no-gap |
| `t-layout-gap-tight` | `gap` = 0.5× default |
| `t-layout-gap-loose` | `gap` = 1.5× default |

**Padding override:** Use `t-layout-padding-none`, `t-layout-padding-tight`, or `t-layout-padding-loose` to override default padding.

| Class | Effect |
|-------|--------|
| `t-layout-padding-none` | `padding: 0` — class alternative to data-t-no-padding |
| `t-layout-padding-tight` | `padding` = 0.5× default |
| `t-layout-padding-loose` | `padding` = 1.5× default |

---

## Flex utilities (children)

Standalone utilities for flex children. Use on any element inside a flex parent (no `t-layout` required).

| Class | Effect |
|-------|--------|
| `t-flex-none` | `flex: 0 0 auto` — fixed size, no grow/shrink. |
| `t-flex-initial` | `flex: 0 1 auto` — default flex, shrink only. |
| `t-flex-1` | `flex: 1` — take remaining space. |
| `t-flex-2` | `flex: 2` — 2× grow. |
| `t-flex-3` | `flex: 3` — 3× grow. |

**Example:**
```html
<div class="t-layout row">
  <span class="t-flex-1">Takes remaining space</span>
  <span class="t-flex-none">Fixed</span>
</div>
```

---

## Width / min-height utilities

Standalone utilities for min-width, min-height, and width. Use on any element.

| Class | Effect |
|-------|--------|
| `t-min-w-0` | `min-width: 0` — allow flex child to shrink below content size (fix overflow/scroll, row) |
| `t-min-h-0` | `min-height: 0` — allow flex child to shrink below content size (fix overflow/scroll, column) |
| `t-w-full` | `width: 100%` — fill parent width |

**Use case:** `t-min-w-0` — flex row child with long text that should truncate or scroll. `t-min-h-0` — flex column child that should scroll. `t-w-full` — fill available width (e.g. input in flex row).

**Overflow utilities (standalone):**

| Class | Effect |
|-------|--------|
| `t-overflow-hidden` | `overflow: hidden` |
| `t-overflow-auto` | `overflow: auto` |

Use on any element; no `t-layout` required. For per-axis overflow on layouts, use `t-layout-overflow-x-auto`, `t-layout-overflow-y-auto`.

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

## Aspect ratio

Standalone utilities for video, cards, images. Use on any element.

| Class | Effect |
|-------|--------|
| `t-aspect-16-9` | `aspect-ratio: 16/9` |
| `t-aspect-4-3` | `aspect-ratio: 4/3` |
| `t-aspect-1-1` | `aspect-ratio: 1/1` |

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

**Responsive (default):** On viewport ≤ `--ls-breakpoint` (default 48rem), all `.t-layout.row` stack as column. No class needed. To keep a row horizontal on narrow screens (e.g. navbar), add `data-t-no-responsive` — such rows also get `flex-wrap: wrap` by default. Opt-out of wrap with `data-t-no-wrap`.

| Class | Where | Effect |
|-------|--------|-------|
| `t-layout-print-stack` | Root layout | In print, all `.t-layout.row` inside stack as column. |

---

## Responsive breakpoint utilities

Show or hide elements at breakpoints. Uses `--ls-breakpoint-sm` (24rem), `--ls-breakpoint-md` (48rem), `--ls-breakpoint-lg` (64rem).

**Hide below breakpoint (desktop-only content):**

| Class | Effect | Use case |
|-------|--------|----------|
| `t-below-sm-hide` | `display: none` when viewport ≤ 24rem | Hide on mobile |
| `t-below-md-hide` | `display: none` when viewport ≤ 48rem | Hide on small screens |
| `t-below-lg-hide` | `display: none` when viewport ≤ 64rem | Hide on medium screens |

**Show above breakpoint (hidden by default):**

| Class | Effect | Use case |
|-------|--------|----------|
| `t-above-sm-show` | Hidden by default; visible when viewport > 24rem | Desktop-only nav |
| `t-above-md-show` | Hidden by default; visible when viewport > 48rem | Large-screen content |
| `t-above-lg-show` | Hidden by default; visible when viewport > 64rem | Wide-screen content |

**Hide above breakpoint (mobile-only content):**

| Class | Effect | Use case |
|-------|--------|----------|
| `t-above-sm-hide` | `display: none` when viewport > 24rem | Mobile menu toggle |
| `t-above-md-hide` | `display: none` when viewport > 48rem | Mobile-only back button |
| `t-above-lg-hide` | `display: none` when viewport > 64rem | Mobile-only controls |

---

## Safe area

**Default:** `body` has `env(safe-area-inset-*)` padding for notch / home indicator on mobile. No class needed.

| Class | Effect |
|-------|--------|
| `t-layout-safe-area` | Adds safe-area insets to a specific layout (use when root is not `body`). |

---

## Data attributes

| Attribute | Effect |
|-----------|--------|
| `data-manual` | Disables automatic gap and padding (`gap: unset; padding: unset`). |
| `data-t-no-padding` | Padding set to 0; gap unchanged. |
| `data-t-no-gap` | Gap set to 0; padding unchanged. |
| `data-t-no-responsive` | Row stays horizontal on narrow viewport (opt-out of default stack). |
| `data-t-no-wrap` | Opt-out of default wrap on `data-t-no-responsive` rows. |

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
| `--ls-breakpoint` | `48rem` | Responsive breakpoint (viewport max-width). Override with `--ls-breakpoint-sm` (24rem), `--ls-breakpoint-md` (48rem), or `--ls-breakpoint-lg` (64rem). |
| `--ls-breakpoint-sm` | `24rem` | Small breakpoint (384px). |
| `--ls-breakpoint-md` | `48rem` | Medium breakpoint (768px). |
| `--ls-breakpoint-lg` | `64rem` | Large breakpoint (1024px). |
| `--ls-touch-min` | `2.75rem` | Min touch target (44px) for button, select, etc. inside depth. |
| `--ls-container` | `min(80ch, 100%)` | Max content width for `t-layout-container`. |
| `--ls-sidebar-min` | `10rem` | Min sidebar width for `t-layout-sidebar`. |
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
| p, blockquote, pre, address | inherit | gap via flex parent; adjacent siblings (p + p, etc.) get margin-block-start --ls-space | — |
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
