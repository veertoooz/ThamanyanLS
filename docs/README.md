# ThamanyanLS — Documentation

Context-aware layout system for deep interfaces. Layout should reflect structure, not the designer's memory.

---

## Contents

| Document | Description |
|----------|-------------|
| [Getting started](getting-started.md) | Installation, first layout, quick concepts |
| [Reference](reference.md) | Classes, CSS variables, data attributes |
| [Examples](examples.md) | Basic example and snippets |

---

## What is ThamanyanLS

ThamanyanLS is a **CSS-only** layout system that:

- Computes **gap** and **padding** from layout nesting depth (no JavaScript).
- Uses **flexbox** with explicit direction (`row` or `column`).
- Is **framework-agnostic** and works alongside Tailwind, daisyUI, or plain CSS.

**Core idea:** Each layout node has a *level* (depth). Spacing is `BaseSize / Level`, so outer layouts get larger gaps and inner layouts get tighter gaps—automatically.

**Formula:** `gap = clamp(--t-gap-min, --t-base / --t-level, --t-gap-max)` (default base 1rem, so level 1 → 1rem, level 2 → 0.5rem, level 3 → ~0.333rem, etc.).

---

## What it does and does not do

**Does:**

- Flex layout with automatic gap and padding by depth.
- Optional responsive (rows stack on narrow viewport), print stack, RTL, safe area.
- Utilities: grow/shrink, wrap, alignment, order, gap-only/padding-only.

**Does not:**

- Provide UI components, colors, or typography.
- Replace Tailwind or daisyUI—it only handles layout structure.

---

## When to use it

- Deep dashboards and app shells.
- Nested editors and knowledge systems.
- OS-like or graph-style interfaces where layout depth varies a lot.

---

## Philosophy

- **Structure first.** Form follows structure; space is governed by rules.
- **Layout as architecture.** CSS is not decoration—it encodes hierarchy.
- **Spatial sense.** UI should make sense spatially, not only look good.

---

## License

MIT. See [../LICENSE](../LICENSE).
