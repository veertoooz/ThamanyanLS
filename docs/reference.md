# Reference

Complete list of classes, CSS variables, and data attributes.

---

## Base layout

| Class | Description |
|-------|-------------|
| `t-layout` | Flex container. Must be used with `column` or `row`. |
| `t-layout column` | `flex-direction: column`. |
| `t-layout row` | `flex-direction: row`. |

**Nesting:** Level is set by the optional `tamanyan.js` script (unlimited depth). Each `.t-layout` gets `--t-level` equal to its nesting depth; gap and padding are computed from that. Without the script, only the root has level 1—override `--t-level` manually on nested layouts if needed.

---

## Flex behavior

| Class | Description |
|-------|-------------|
| `t-layout-grow` | `flex: 1` — use on the layout that should take remaining space. |
| `t-layout-shrink-0` | `flex-shrink: 0` — use on fixed-width layouts (e.g. sidebar). |
| `t-layout-wrap` | `flex-wrap: wrap` — row items wrap on narrow space. |

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
| `t-layout-responsive` | Root layout | On viewport ≤ 48rem, all `.t-layout.row` inside stack as column. |
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
| `--t-justify` | flex-start | `justify-content`. |
| `--t-align` | stretch | `align-items`. |

**Gap formula:** `gap = clamp(--t-gap-min, --t-base / --t-level, --t-gap-max)`.

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

## RTL

When `<html dir="rtl">`, `.t-layout.row` automatically uses `flex-direction: row-reverse`. No extra class.
