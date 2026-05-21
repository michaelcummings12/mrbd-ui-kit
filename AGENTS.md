# AGENTS.md — AI Coding Assistant Instructions for mrbd-ui-kit

You are building a web app for Meta Ray-Ban Display glasses using the `mrbd-ui-kit` component library. Follow these instructions precisely.

## What is Meta Ray-Ban Display?

Meta Ray-Ban Display glasses have a 600×600 pixel monocular additive display projected into the right lens. Web apps are standard HTML/CSS/JS rendered on this display. Input comes from a D-pad (capacitive touch on the glasses temple) and the Meta Neural Band (EMG wrist gestures), both mapped to arrow keys and Enter.

## Critical Display Rules

These are NOT suggestions. Violating them creates a broken experience on the hardware.

### DO:

- Use `<DisplayRoot>` as the outermost wrapper for all MRBD UI
- Use dark/transparent backgrounds (`bg-mrbd-bg`, `bg-mrbd-surface`)
- Use `text-mrbd-text` for primary text (92% white, NOT pure white)
- Use `shadow-mrbd-glow-*` for emphasis effects (outer glow)
- Use `font-weight: 500` or higher for all text
- Use `Nunito` or a similar bold sans-serif font (weights 500+)
- Keep layouts right-anchored or F-pattern (display is in the right lens)
- Make all interactive elements D-pad focusable via `<Focusable>` or composite components
- Give every `<Focusable>` and `<Button>` a unique `id`
- Keep content glanceable — users scan in <2 seconds
- Use `lucide-react` icons via the `<Icon>` component

### NEVER:

- Use `#FFFFFF` or `rgb(255,255,255)` — causes ghosting. Use `text-mrbd-text` instead
- Use `drop-shadow` or `box-shadow` for decorative shadows — looks like dirt on lens. Use `shadow-mrbd-glow-*`
- Use `font-weight` below 500 — illegible on additive display
- Use mouse/touch event handlers as primary interaction — use D-pad events
- Create scrollable content without focus management — D-pad can't scroll
- Use heavy animations or frequent re-renders — battery-constrained device

## Project Setup

### Installation

```bash
npm install mrbd-ui-kit
```

### CSS Setup (global.css)

```css
@import "tailwindcss";
@import "mrbd-ui-kit/css/theme";
@import "mrbd-ui-kit/css/base";
```

Both CSS imports are required. `theme` provides Tailwind v4 tokens. `base` provides focus ring styles, scrollbar hiding, and transition defaults.

## Architecture

### Import Map

```typescript
// Components + client hooks (has "use client" banner)
import {
  Button,
  DisplayRoot,
  Focusable,
  Icon,
  LoadingSpinner,
  Pill,
  ScrollArea,
  ScrollBar,
  Slot,
  Text,
} from "mrbd-ui-kit";

// Icons — use lucide-react directly
import { Check, Home, Search, Settings } from "lucide-react";

// Hooks
import { useDpad, useFocusManager, useIsMRBD, useScroll } from "mrbd-ui-kit";

// Server-side device detection (no "use client")
import { isMRBD, isMRBDFromHeaders } from "mrbd-ui-kit/server";

// Next.js RSC device detection (uses next/headers)
import { isMRBDServer } from "mrbd-ui-kit/next";
```

### Component Hierarchy

Every MRBD app must follow this structure:

```tsx
<DisplayRoot>
  {/* Your content */}
</DisplayRoot>
```

## Component Reference

### DisplayRoot

Root wrapper. Required. Sets up the 600×600 viewport, focus engine context, and keyboard event handling.

```tsx
<DisplayRoot
  focusOptions={{ wrap: true, initialFocusId: "first-btn" }}
  onSelect={(focusedId) => handleAction(focusedId)}
>
  {children}
</DisplayRoot>
```

Props: `children`, `className?`, `focusOptions?: { wrap?: boolean, initialFocusId?: string }`, `onSelect?: (id: string) => void`

### Text

Display-optimized typography. Enforces minimum font weight.

```tsx
<Text size="lg" weight="bold" glow>Title</Text>
<Text size="sm" dim>Subtitle</Text>
```

Props: `children`, `size?: 'sm' | 'md' | 'lg'`, `weight?: 'medium' | 'semibold' | 'bold'`, `glow?: boolean`, `dim?: boolean`, `as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'label'`, `className?`

### Icon

Renders an icon component (e.g. from `lucide-react`) or custom SVG children. **No built-in icon set** — pass any `ElementType` via the `icon` prop.

```tsx
import { Home, Bell } from "lucide-react";

<Icon icon={Home} size={24} />
<Icon icon={Bell} size={20} color="var(--color-mrbd-accent)" />

{/* Custom SVG */}
<Icon size={24}>
  <circle cx="12" cy="12" r="10" />
</Icon>
```

Props: `icon?: ElementType`, `children?: ReactNode` (custom SVG), `size?: number`, `color?: string`, `className?`

### Focusable

Makes children D-pad navigable. Every `id` must be unique. On Enter key press, fires `onSelect` and clicks the first child element.

```tsx
<Focusable id="item-1" onSelect={handleSelect} group="list">
  <div>content</div>
</Focusable>
```

Props: `id: string` (required), `children`, `group?: string`, `onSelect?: () => void`, `onFocus?: () => void`, `onBlur?: () => void`, `disabled?: boolean`, `className?`

### Slot

Merges its own props onto a single child element — the child's props take precedence for conflicts, except `className` which is concatenated. Used internally by `Button`'s `asChild` pattern. Inspired by Radix UI.

```tsx
<Slot className="btn-styles">
  <Link href="/home">Home</Link>
</Slot>
{/* Renders: <a href="/home" class="btn-styles">Home</a> */}
```

Props: `children` (must be a single valid React element), plus any HTML attributes to merge.

### Button

D-pad focusable button with variants. Default variant is `ghost`. Wraps `<Focusable>` internally.

```tsx
import { Check, X } from "lucide-react";

<Button id="ok" variant="primary" icon={Check} onPress={handleOk}>
  OK
</Button>
<Button id="cancel" variant="ghost" icon={X} onPress={handleCancel}>
  Cancel
</Button>
```

The `asChild` prop merges button styles onto a child element (e.g. `<Link>`):

```tsx
<Button id="home" asChild>
  <Link href="/home">Home</Link>
</Button>
```

Props: `id: string` (required), `children`, `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'` (default `'ghost'`), `size?: 'sm' | 'md' | 'lg'`, `icon?: ElementType`, `onPress?: () => void`, `disabled?: boolean`, `fullWidth?: boolean`, `asChild?: boolean`, `group?: string`, `className?`

### Pill

Rounded pill/badge with a subtle gradient tint border.

```tsx
<Pill>Status: Active</Pill>
<Pill className="px-6">Custom</Pill>
```

Props: `children`, `className?`

### LoadingSpinner

CSS-only spinner animation.

```tsx
<LoadingSpinner size={32} />
<LoadingSpinner size={24} color="var(--color-mrbd-accent)" />
```

Props: `size?: number`, `color?: string`, `label?: string`, `className?`

### ScrollArea

A scroll viewport with top/bottom fade gradients that indicate hidden content. Pair with `useScroll()` and optionally `<ScrollBar>`.

```tsx
const scroll = useScroll();

<ScrollArea
  scrollRef={scroll.scrollRef}
  canScrollUp={scroll.canScrollUp}
  canScrollDown={scroll.canScrollDown}
>
  {/* Scrollable content */}
</ScrollArea>
```

Props: `children`, `scrollRef: React.RefObject<HTMLDivElement | null>`, `canScrollUp: boolean`, `canScrollDown: boolean`, `className?`

### ScrollBar

A composable scrollbar indicator. The track is fixed height; the thumb scales proportionally. Fades in/out based on `isScrolling` from `useScroll()`.

```tsx
const scroll = useScroll();

<div className="flex flex-row gap-2">
  <ScrollArea scrollRef={scroll.scrollRef} canScrollUp={scroll.canScrollUp} canScrollDown={scroll.canScrollDown}>
    {items}
  </ScrollArea>
  <ScrollBar
    scrollHeight={scroll.scrollHeight}
    clientHeight={scroll.clientHeight}
    scrollTop={scroll.scrollTop}
    isScrolling={scroll.isScrolling}
  />
</div>
```

Props: `scrollHeight: number`, `clientHeight: number`, `scrollTop: number`, `isScrolling?: boolean`, `className?`

## Hooks

### useDpad()

```tsx
const { activeKey, lastKey } = useDpad({
  onPress: (key) => {},   // 'up' | 'down' | 'left' | 'right' | 'select'
  onRelease: (key) => {},
  disabled: false,
});
```

### useFocusManager()

Must be inside `<DisplayRoot>`.

```tsx
const { focusedId, move, focus } = useFocusManager();
move("down");        // Move focus spatially
focus("my-button");  // Focus by ID
```

### useIsMRBD()

Client-side device detection (checks for "Greatwhite" in user agent). Returns `false` during SSR.

```tsx
const isMRBD = useIsMRBD(); // boolean
```

### useScroll()

Tracks scroll position of a container. Returns scroll metrics and a ref to attach to the scrollable element. Designed to pair with `<ScrollArea>` and `<ScrollBar>`.

```tsx
const scroll = useScroll();
// scroll.scrollRef      — attach to scrollable container
// scroll.scrollTop      — current scroll position
// scroll.scrollHeight   — total scrollable height
// scroll.clientHeight   — visible viewport height
// scroll.canScrollUp    — true when scrolled past top
// scroll.canScrollDown  — true when more content below
// scroll.isScrolling    — true while scroll position is actively changing
```

## Server Detection

```typescript
// Any server runtime
import { isMRBD, isMRBDFromHeaders } from "mrbd-ui-kit/server";
isMRBD(userAgentString);           // boolean
isMRBDFromHeaders(request.headers); // boolean

// Next.js RSC / Server Actions
import { isMRBDServer } from "mrbd-ui-kit/next";
const isMRBD = await isMRBDServer(); // boolean
```

## Theming

The entire color palette is driven by a single CSS variable: `--color-mrbd-tint`. By default it's white (`#ffffff`). Override it to theme your entire app with one line:

```css
/* global.css — after the mrbd-ui-kit imports */
:root {
  --color-mrbd-tint: #14b8a6; /* teal */
}
```

All surface colors, accent, glows, and border tints are derived from this variable via `color-mix()`. Changing `--color-mrbd-tint` automatically updates everything.

## Tailwind Tokens Available After Import

### Colors
`mrbd-tint`, `mrbd-bg`, `mrbd-surface`, `mrbd-surface-hover`, `mrbd-surface-active`, `mrbd-text`, `mrbd-text-dim`, `mrbd-accent`, `mrbd-danger`, `mrbd-success`

### Shadows (Outer Glow)
`mrbd-glow`, `mrbd-glow-accent`, `mrbd-glow-focus`, `mrbd-glow-inner`

### Sizing
`w-mrbd` / `h-mrbd` — 600px (full display)

Use as: `bg-mrbd-surface`, `text-mrbd-text`, `shadow-mrbd-glow`

## Full App Example

```tsx
"use client";

import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import {
  Button,
  DisplayRoot,
  Icon,
  LoadingSpinner,
  Text,
} from "mrbd-ui-kit";

export default function MyMRBDApp() {
  const [loading, setLoading] = useState(false);

  return (
    <DisplayRoot focusOptions={{ initialFocusId: "action-btn" }}>
      <div className="flex flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex flex-row gap-2 items-center">
          <Icon icon={Search} size={20} color="var(--color-mrbd-accent)" />
          <Text size="lg" weight="bold">
            Notifications
          </Text>
        </div>

        {/* Content card */}
        <div className="bg-mrbd-surface rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <Text weight="semibold">New message from Alex</Text>
            <Text size="sm" dim>
              Hey, are you free for lunch?
            </Text>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row gap-3">
          <Button
            id="action-btn"
            variant="primary"
            icon={Check}
            onPress={() => setLoading(true)}
          >
            Accept
          </Button>
          <Button id="decline-btn" icon={X} onPress={() => {}}>
            Decline
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col items-center">
            <LoadingSpinner size={24} />
          </div>
        )}
      </div>
    </DisplayRoot>
  );
}
```

## Testing Your App

1. Desktop browser: Open your app at `localhost:3000`. Use arrow keys for D-pad, Enter for select.
2. On device: Deploy to HTTPS URL → Meta AI app → Devices → Display Glasses → App connections → Web apps → Add URL.
3. Device detection: Override user agent in Chrome DevTools to include "Greatwhite" to test `useIsMRBD()`.
