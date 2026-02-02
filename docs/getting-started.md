# Getting started

## Installation

```bash
npm install thamanyanls
```

**In HTML:**

```html
<script src="node_modules/thamanyanls/dist/thamanyan.js"></script>
```

The script injects the layout styles and sets automatic nesting level on all `.t-layout` elements. Without it, only the root has level 1; you can override `--t-level` manually per layout.

**With a bundler:**

```js
import 'thamanyanls';
```

You can also copy `dist/thamanyan.js` into your project and load it directly.

---

## First layout

Every layout is a flex container with class `t-layout` and a direction: `column` or `row`.

```html
<div class="t-layout column">
  <header>Header</header>
  <div class="t-layout row">
    <aside>Sidebar</aside>
    <main>Content</main>
  </div>
</div>
```

- The outer `t-layout column` is **level 1** → gap and padding ≈ 1rem.
- The inner `t-layout row` is **level 2** → gap and padding ≈ 0.5rem.
- No manual spacing: depth decides it.

---

## Direction

- **Column:** `class="t-layout column"` — children stack vertically.
- **Row:** `class="t-layout row"` — children sit in a row.

Use both in a tree: e.g. app column → header row + main row → main row = sidebar column + content column.

---

## Grow and shrink

- **Take remaining space:** add `t-layout-grow` to the layout that should expand (e.g. main content).
- **Don’t shrink:** add `t-layout-shrink-0` to fixed-width areas (e.g. sidebar).
- **Scrollable content:** add `t-layout-scroll` with `t-layout-grow` when the layout should scroll (e.g. long list).

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-shrink-0">Sidebar</aside>
  <main class="t-layout column t-layout-grow t-layout-scroll">Content</main>
</div>
```

---

## Responsive (mobile)

Add `t-layout-responsive` to the **root** layout. On viewports ≤ `--ls-breakpoint` (default 48rem), every `t-layout row` inside that root becomes a column (stacks vertically). Override: `:root { --ls-breakpoint: 40rem; }`.

```html
<div class="t-layout column t-layout-responsive">
  <!-- rows here will stack on narrow screens -->
</div>
```

---

## SPA / dynamic content

If you use React, Vue, or similar, layouts are often added after the initial load. Call `ThamanyanLS.init()` after DOM changes:

```js
// After mount or update
ThamanyanLS?.init();
```

---

## Next steps

- [Reference](reference.md) — all classes, variables, and data attributes.
- [Examples](examples.md) — basic and dashboard examples.
