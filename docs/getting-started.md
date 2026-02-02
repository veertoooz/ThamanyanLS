# Getting started

## Installation

```bash
npm install thamanyanls
```

**In HTML:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="node_modules/thamanyanls/dist/thamanyan.js"></script>
```

The viewport meta is required for proper mobile scaling. The script injects the layout styles and sets automatic nesting level on all `.t-layout` elements. Without it, only the root has level 1; you can override `--t-level` manually per layout.

**With a bundler:**

```js
import 'thamanyanls';
```

You can also copy `dist/thamanyan.js` into your project and load it directly.

---

## First layout

Every layout is a flex container with class `t-layout`. Default direction is column; add `row` for horizontal.

```html
<div class="t-layout">
  <header>Header</header>
  <div class="t-layout row">
    <aside>Sidebar</aside>
    <main>Content</main>
  </div>
</div>
```

- The outer `t-layout` is **level 1** (column by default) → gap and padding ≈ 1rem.
- The inner `t-layout row` is **level 2** → gap and padding ≈ 0.5rem.
- No manual spacing: depth decides it.

---

## Direction

- **Column (default):** `t-layout` or `t-layout column` — children stack vertically.
- **Row:** `class="t-layout row"` — children sit in a row.

Use both in a tree: e.g. app column → header row + main row → main row = sidebar column + content column.

---

## App shell

For a full-page app with sticky header, scrollable main, and fixed footer, use `t-layout-app` with `header`, `main`, and `footer` tags:

```html
<div class="t-layout t-layout-app">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

- Full viewport height
- Header stays sticky at top
- Main scrolls when content overflows
- Footer stays at bottom

For full viewport without the app shell structure, use `t-layout-root` instead.

---

## Grow and shrink

- **Take remaining space:** add `t-layout-grow` to the layout that should expand (e.g. main content).
- **Don’t shrink:** add `t-layout-shrink-0` to fixed-width areas (e.g. sidebar).
- **Sidebar:** use `t-layout-sidebar` for responsive sidebar (min-width + shrink-0 in one class).
- **Scrollable content:** add `t-layout-scroll` with `t-layout-grow` when the layout should scroll (e.g. long list).
- **Non-layout children:** For inline elements (e.g. `span`) inside a flex parent, use `t-flex-1` to take remaining space or `t-flex-none` for fixed size — no `t-layout` required.
- **Gap override:** Use `t-layout-gap-tight` or `t-layout-gap-loose` when default gap is too large or too small; `t-layout-gap-none` for no gap.
- **Padding override:** Use `t-layout-padding-tight` or `t-layout-padding-loose` similarly; `t-layout-padding-none` for no padding.
- **Flex overflow fix:** Add `t-min-w-0` to a flex row child with long text that should truncate or scroll — prevents `min-width: auto` from blocking shrink. For flex column, add `t-min-h-0` so the child can shrink and scroll.

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-sidebar">Sidebar</aside>
  <main class="t-layout column t-layout-grow t-layout-scroll">Content</main>
</div>
```

---

## Responsive (mobile)

Responsive behavior works by default. On viewports ≤ `--ls-breakpoint` (default 48rem), every `t-layout row` stacks as a column. Override the breakpoint: `:root { --ls-breakpoint: var(--ls-breakpoint-sm); }`.

To keep a row horizontal on narrow screens (e.g. navbar), add `data-t-no-responsive`:

```html
<nav class="t-layout row" data-t-no-responsive>
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
</nav>
```

For show/hide at breakpoints, use `t-below-sm-hide` (hide on mobile), `t-above-md-show` (show only on larger screens), and similar utilities. See [Reference](reference.md#responsive-breakpoint-utilities).

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
