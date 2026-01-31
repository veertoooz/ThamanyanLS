# Examples

## Basic example

Simple app shell: header row + main row (sidebar + content). Responsive: rows stack on narrow viewport.

```html
<div class="t-layout column t-layout-responsive">
  <header class="t-layout row t-layout-justify-between">
    <h1>Dashboard</h1>
    <span>Level 1</span>
  </header>

  <div class="t-layout row">
    <aside class="t-layout column t-layout-shrink-0">Nav A · Nav B</aside>
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

**Features used:** `t-layout-responsive`, `t-layout-justify-between`, `t-layout-shrink-0`, `t-layout-grow`, `t-layout-wrap`. Spacing shrinks from level 1 (outer) to level 5 (cards).

**File:** [../examples/basic.html](../examples/basic.html)

---

## Dashboard example

Full dashboard: header (logo + nav + actions), main row with left sidebar, center content (breadcrumb, toolbar, stats, card grid), right panel, footer.

**Structure:**

- **Level 1:** App column (responsive + print-stack).
- **Level 2:** Main row → sidebar | content | right panel.
- **Level 3:** Content column → breadcrumb row, toolbar row, stats row, content block.
- **Level 4:** Stats row (wrap), tabs row, card grid (wrap).
- **Level 5:** Each card is a column (title row + body); one card uses `data-t-no-padding` for an inner list.

**Features used:**

- `t-layout-responsive`, `t-layout-print-stack`
- `t-layout-grow`, `t-layout-shrink-0` (sidebars fixed, center grows)
- `t-layout-wrap` (toolbar, stats, card grid)
- `t-layout-justify-between`, `t-layout-align-center`
- `data-t-no-padding` (list inside a card)

**File:** [../examples/dashboard.html](../examples/dashboard.html)

Open in a browser and resize to see rows stack on narrow viewport; use print preview to see print stack.

---

## Tailwind + daisyUI example

Same layout idea (app shell, sidebar + content, stats, cards) but **layout from ThamanyanLS** and **look from Tailwind CSS + daisyUI**. Spacing and nesting are handled by ThamanyanLS; colors, components (btn, card, stats, menu, badge), and theme come from Tailwind and daisyUI.

**Load order:** Tailwind (script) → daisyUI (full.min.css) → thamanyan.css. ThamanyanLS is loaded last so its layout rules (flex, gap, padding) win.

**Features:** `t-layout-responsive`, `t-layout-grow`, `t-layout-shrink-0`, `t-layout-wrap`, `t-layout-justify-between`; daisyUI theme (`data-theme="cupcake"`), navbar area, menu, stats, cards, buttons.

**File:** [../examples/tailwind-daisyui.html](../examples/tailwind-daisyui.html)

Open in a browser (CDN works; no build). Resize to see responsive stacking.

---

## Snippets

**Sidebar + main (grow/shrink):**

```html
<div class="t-layout row">
  <aside class="t-layout column t-layout-shrink-0" style="min-width: 12rem;">Sidebar</aside>
  <main class="t-layout column t-layout-grow">Content</main>
</div>
```

**Gap only (no padding):**

```html
<div class="t-layout row" data-t-no-padding>...</div>
```

**Reorder children (order):**

```html
<div class="t-layout row">
  <span class="t-layout-order-last">Last</span>
  <span class="t-layout-order-first">First</span>
</div>
```

**Safe area (notch devices):**

```html
<div class="t-layout column t-layout-safe-area">...</div>
```

**Print stack:**

```html
<div class="t-layout column t-layout-print-stack">...</div>
```
