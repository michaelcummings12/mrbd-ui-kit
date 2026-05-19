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
- Use `Inter` or `Roboto` fonts (loaded via `mrbd-ui-kit/css/base`)
- Keep layouts right-anchored or F-pattern (display is in the right lens)
- Make all interactive elements D-pad focusable via `<Focusable>` or composite components
- Give every `<Focusable>`, `<Button>`, and `<NavigationBar>` item a unique `id`
- Keep content glanceable — users scan in <2 seconds

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

Both CSS imports are required. `theme` provides Tailwind v4 tokens. `base` provides the root container styles, focus rings, and animation keyframes.

## Architecture

### Import Map

```typescript
// Components + client hooks (has "use client" banner)
import {
  DisplayRoot,
  Text,
  Icon,
  Focusable,
  Button,
  NavigationBar,
  LoadingIndicator,
} from "mrbd-ui-kit";
import { useDpad, useFocusManager, useIsMRBD } from "mrbd-ui-kit";

// Server-side device detection (no "use client")
import { isMRBD, isMRBDFromHeaders } from "mrbd-ui-kit/server";

// Next.js RSC device detection (uses next/headers)
import { isMRBDServer } from "mrbd-ui-kit/next";
```

### Component Hierarchy

Every MRBD app must follow this structure:

```tsx
<DisplayRoot>
  {" "}
  {/* REQUIRED — sets up 600x600 viewport + focus engine */}
  {/* Your content */}
  <NavigationBar /> {/* Optional — anchored to bottom */}
</DisplayRoot>
```

## Component Reference

### DisplayRoot

Root wrapper. Required. Sets up viewport, focus context, keyboard handling.

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

Props: `size?: 'xs'|'sm'|'md'|'lg'|'xl'|'2xl'`, `weight?: 'medium'|'semibold'|'bold'`, `glow?: boolean`, `dim?: boolean`, `as?: 'p'|'span'|'h1'|'h2'|'h3'|'label'`


### Icon

SVG icons. 14 built-in: `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `check`, `x`, `home`, `settings`, `bell`, `search`, `play`, `pause`, `skip-forward`, `skip-back`.

```tsx
<Icon name="home" size={24} color="var(--color-mrbd-accent)" />
```

Props: `name?: BuiltInIcon`, `children?: ReactNode` (custom SVG), `size?: number`, `color?: string`

### Focusable

Makes children D-pad navigable. Every `id` must be unique.

```tsx
<Focusable id="item-1" onSelect={handleSelect} group="list">
  <div>content</div>
</Focusable>
```

Props: `id: string` (required), `group?: string`, `onSelect?: () => void`, `onFocus?: () => void`, `onBlur?: () => void`, `disabled?: boolean`

### Button

Focusable button with variants.

```tsx
<Button id="ok" variant="primary" icon="check" onPress={handleOk}>
  OK
</Button>
```

Props: `id: string` (required), `variant?: 'primary'|'secondary'|'ghost'|'danger'`, `size?: 'sm'|'md'|'lg'`, `icon?: BuiltInIcon`, `onPress?: () => void`, `disabled?: boolean`, `fullWidth?: boolean`, `group?: string`

### NavigationBar

Bottom tab bar. D-pad left/right navigates between tabs.

```tsx
<NavigationBar
  items={[
    { id: "home", label: "Home", icon: "home" },
    { id: "settings", label: "Settings", icon: "settings" },
  ]}
  activeId="home"
  onSelect={(id) => setTab(id)}
/>
```

Props: `items: NavItem[]`, `activeId: string`, `onSelect: (id: string) => void`
NavItem: `{ id: string, label: string, icon: BuiltInIcon }`

### LoadingIndicator

CSS-only loading animation.

```tsx
<LoadingIndicator variant="spinner" size={32} />
```

Props: `variant?: 'spinner'|'dots'|'pulse'`, `size?: number`, `color?: string`, `label?: string`

## Hooks

### useDpad()

```tsx
const { activeKey, lastKey } = useDpad({
  onPress: (key) => {}, // 'up'|'down'|'left'|'right'|'select'
  onRelease: (key) => {},
  disabled: false,
});
```

### useFocusManager()

Must be inside `<DisplayRoot>`.

```tsx
const { focusedId, move, focus } = useFocusManager();
move("down"); // Move focus spatially
focus("my-button"); // Focus by ID
```

### useIsMRBD()

Client-side device detection (checks for "Greatwhite" in user agent).

```tsx
const isMRBD = useIsMRBD(); // boolean, false during SSR
```

## Server Detection

```typescript
// Any server runtime
import { isMRBD, isMRBDFromHeaders } from "mrbd-ui-kit/server";
isMRBD(userAgentString); // boolean
isMRBDFromHeaders(request.headers); // boolean

// Next.js RSC / Server Actions
import { isMRBDServer } from "mrbd-ui-kit/next";
const isMRBD = await isMRBDServer(); // boolean
```

## Tailwind Tokens Available After Import

Colors: `mrbd-bg`, `mrbd-surface`, `mrbd-surface-hover`, `mrbd-surface-active`, `mrbd-text`, `mrbd-text-dim`, `mrbd-accent`, `mrbd-danger`, `mrbd-success`
Shadows: `mrbd-glow`, `mrbd-glow-accent`, `mrbd-glow-focus`
Font: `mrbd`
Sizing: `mrbd` (600px for width/height)

Use as: `bg-mrbd-surface`, `text-mrbd-text`, `shadow-mrbd-glow`, `font-mrbd`, `w-mrbd`, `h-mrbd`

## Full App Example

```tsx
"use client";

import { useState } from "react";
import {
  DisplayRoot,
  Text,
  Button,
  NavigationBar,
  LoadingIndicator,
  Icon,
} from "mrbd-ui-kit";

export default function MyMRBDApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);

  return (
    <DisplayRoot focusOptions={{ initialFocusId: "action-btn" }}>
      <div className="flex flex-col gap-4 p-6 pb-20">
        {/* Header */}
        <div className="flex flex-row gap-2 items-center">
          <Icon name="bell" size={20} color="var(--color-mrbd-accent)" />
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
            icon="check"
            onPress={() => setLoading(true)}
          >
            Accept
          </Button>
          <Button id="decline-btn" variant="ghost" icon="x" onPress={() => {}}>
            Decline
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col items-center">
            <LoadingIndicator variant="dots" size={24} />
          </div>
        )}
      </div>

      <NavigationBar
        items={[
          { id: "home", label: "Home", icon: "home" },
          { id: "search", label: "Search", icon: "search" },
          { id: "settings", label: "Settings", icon: "settings" },
        ]}
        activeId={activeTab}
        onSelect={setActiveTab}
      />
    </DisplayRoot>
  );
}
```

## Testing Your App

1. Desktop browser: Open your app at `localhost:3000`. Use arrow keys for D-pad, Enter for select.
2. On device: Deploy to HTTPS URL → Meta AI app → Devices → Display Glasses → App connections → Web apps → Add URL.
3. Device detection: Override user agent in Chrome DevTools to include "Greatwhite" to test `useIsMRBD()`.
