# Examples

## Basic example

Simple app shell: header row + main row (sidebar + content). Responsive by default: rows stack on narrow viewport.

```html
<div class="t-layout">
  <header class="t-layout row t-layout-justify-between">
    <h1>Dashboard</h1>
    <span>Level 1</span>
  </header>

  <div class="t-layout row">
    <aside class="t-layout column t-layout-sidebar">Nav A · Nav B</aside>
    <div class="t-layout column t-layout-grow">
      <div class="t-layout row t-layout-wrap">
        <div class="stat">42 Items</div>
        <div class="stat">7 Active</div>
      </div>
      <div class="t-layout column">
        <h2>Section</h2>
        <div class="t-layout row">
          <div class="t-layout column card t-layout-grow">Card A</div>
          <div class="t-layout column card t-layout-grow">Card B</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Features used:** `t-layout-justify-between`, `t-layout-sidebar`, `t-layout-grow`, `t-layout-wrap`. Responsive stacking is default. Spacing shrinks from level 1 (outer) to level 5 (cards).

**File:** [../examples/basic.html](../examples/basic.html)

---

## More examples (coming soon)

Dashboard (full app shell with sidebar, stats, card grid) and Tailwind + daisyUI integration examples are planned. For now, see [basic.html](../examples/basic.html) for a comprehensive tag showcase and layout patterns.

---

## Snippets

**App shell (t-layout-app):**

```html
<div class="t-layout t-layout-app">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

Full viewport, sticky header, scrollable main, fixed footer.

**Sidebar + main (grow/shrink):**

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-sidebar">Sidebar</aside>
  <main class="t-layout column t-layout-grow">Content</main>
</div>
```

**Container (content width):**

```html
<div class="t-layout t-layout-container">
  <p>Content constrained to 80ch, centered.</p>
</div>
```

**Aspect ratio:**

```html
<div class="t-aspect-16-9">Video or card</div>
```

**Gap only (no padding):**

```html
<div class="t-layout row" data-t-no-padding>...</div>
```

**Gap override:**

```html
<div class="t-layout row t-layout-gap-tight">...</div>
<div class="t-layout row t-layout-gap-loose">...</div>
```

Use `t-layout-gap-none`, `t-layout-gap-tight` (0.5×), or `t-layout-gap-loose` (1.5×) to override default gap.

**Padding override:**

```html
<div class="t-layout row t-layout-padding-tight">...</div>
<div class="t-layout row t-layout-padding-loose">...</div>
```

Use `t-layout-padding-none`, `t-layout-padding-tight` (0.5×), or `t-layout-padding-loose` (1.5×) to override default padding.

**Width utilities:**

```html
<div class="t-layout row">
  <span class="t-flex-1 t-min-w-0" style="overflow: hidden; text-overflow: ellipsis;">Long text truncates</span>
</div>
<input class="t-w-full" type="text">
```

Use `t-min-w-0` for flex row overflow fix; `t-min-h-0` for flex column overflow fix; `t-w-full` to fill parent width. Use `t-overflow-hidden` or `t-overflow-auto` for standalone overflow control (no t-layout required).

**Flex children (t-flex-*):**

```html
<div class="t-layout row">
  <span class="t-flex-1">Takes remaining space</span>
  <span class="t-flex-none">Fixed</span>
</div>
```

Use `t-flex-1`, `t-flex-2`, `t-flex-3` for grow; `t-flex-none` for fixed size; `t-flex-initial` for default (shrink only).

**Responsive breakpoint utilities:**

```html
<span class="t-below-md-hide">Visible on desktop only</span>
<span class="t-above-md-show">Visible on larger screens only</span>
<span class="t-above-md-hide">Visible on mobile only</span>
```

Use `t-below-sm-hide`, `t-below-md-hide`, `t-below-lg-hide` to hide on narrow viewports; `t-above-sm-show`, `t-above-md-show`, `t-above-lg-show` to show only on wide viewports; `t-above-sm-hide`, `t-above-md-hide`, `t-above-lg-hide` for mobile-only content.

**Reorder children (order):**

```html
<div class="t-layout row">
  <span class="t-layout-order-last">Last</span>
  <span class="t-layout-order-first">First</span>
</div>
```

**Safe area:** Default on `body`. For a non-body root layout, use `t-layout-safe-area`:

```html
<div class="t-layout column t-layout-safe-area">...</div>
```

**Print stack:**

```html
<div class="t-layout column t-layout-print-stack">...</div>
```
