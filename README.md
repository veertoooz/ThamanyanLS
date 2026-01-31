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
- Direction is explicit (`row` or `column`)
- Spacing is contextual, not manual

This is a deliberate constraint.

---

## Installation

```bash
npm install thamanyanls
```

Then in your app:

```html
<link rel="stylesheet" href="node_modules/thamanyanls/dist/thamanyan.css">
```

For automatic level (unlimited depth), add the optional script after the CSS:

```html
<script src="node_modules/thamanyanls/dist/thamanyan.js"></script>
```

Without the script, only the root layout has level 1; nested layouts need manual `--t-level` override or the script.

Or with a bundler:

```js
import 'thamanyanls';
```

You can also copy `dist/thamanyan.css` into your project.

**Documentation:** See the [docs](docs/README.md) folder for full documentation (getting started, reference, examples).

---

## Usage

### Basic example

```html
<div class="t-layout column">
  <div class="t-layout row">
    <div class="t-layout column">
      Content
    </div>
  </div>
</div>
```

Result:

- Outer layout → larger spacing
- Inner layout → tighter spacing
- All automatic

**Grow / shrink / wrap:** Use `t-layout-grow` on the layout that should take remaining space (e.g. main content), `t-layout-shrink-0` on fixed-width items (e.g. sidebar). Use `t-layout-wrap` on a row so items wrap on narrow space.

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-shrink-0">Sidebar</aside>
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

Add the class `t-layout-responsive` to your root layout (e.g. the outermost `.t-layout`). On narrow viewports (≤48rem), all `.t-layout.row` inside that root will automatically stack as columns. To change the breakpoint, edit the media query in the source and rebuild.

```html
<div class="t-layout column t-layout-responsive">
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

**Gap-only or padding-only:** Use `data-t-no-padding` on a layout for gap but no padding; use `data-t-no-gap` for padding but no gap.

```html
<div class="t-layout row" data-t-no-padding>...</div>
```

**Safe area:** Add `t-layout-safe-area` on the root layout to add `env(safe-area-inset-*)` to padding (for notched devices / home indicator).

```html
<div class="t-layout column t-layout-safe-area">...</div>
```

**Order:** Use `t-layout-order-1` … `t-layout-order-5`, or `t-layout-order-first` / `t-layout-order-last` on **children** of a layout to change visual order without changing the DOM.

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
