# mrbd-ui-kit

React component library for [Meta Ray-Ban Display](https://www.meta.com/smart-glasses/) web apps. Opinionated defaults for the 600×600 additive display. Fully customizable.

## Install

```bash
npm install mrbd-ui-kit
```

## Setup

Add the MRBD theme and base styles to your app's global CSS:

```css
/* global.css */
@import "tailwindcss";
@import "mrbd-ui-kit/css/theme";
@import "mrbd-ui-kit/css/base";
```

The theme provides Tailwind v4 tokens via `@theme` — colors, fonts, shadows, and sizing designed specifically for additive displays.

## Quick Start

```tsx
import { DisplayRoot, Button, NavigationBar, Text } from 'mrbd-ui-kit';
import { useIsMRBD } from 'mrbd-ui-kit';

export default function App() {
  return (
    <DisplayRoot>
      <div className="flex flex-col gap-4 p-6">
        <Text size="xl" weight="bold">Hello, Display</Text>
        <Text dim>Glanceable UI for your glasses.</Text>

        <Button id="action-btn" variant="primary" onPress={() => console.log('pressed!')}>
          Get Started
        </Button>
      </div>

      <NavigationBar
        items={[
          { id: 'home', label: 'Home', icon: 'home' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'settings', label: 'Settings', icon: 'settings' },
        ]}
        activeId="home"
        onSelect={(id) => console.log('tab:', id)}
      />
    </DisplayRoot>
  );
}
```

## Display Constraints

The Meta Ray-Ban Display is fundamentally different from phones and monitors. These constraints are baked into every component:

| Constraint | Value | What mrbd-ui-kit does |
|---|---|---|
| Resolution | 600 × 600 px | `<DisplayRoot>` sets the viewport |
| Display type | Additive (LCoS) | Black = transparent. No pure `#FFF` in the palette — prevents ghosting |
| Input | D-pad / Neural Band | Spatial focus engine handles arrow-key navigation automatically |
| Typography | Bold sans-serif | `<Text>` enforces minimum `font-weight: 500` |
| Shadows | Never drop-shadow | All shadows are outer glows (drop shadows look like dirt on the lens) |
| Layout | Monocular, right eye | F-pattern, right-anchored layouts recommended |

## Components

### Primitives

#### `<DisplayRoot>`

Required root wrapper. Sets up the 600×600 viewport, focus engine context, and keyboard event handling.

```tsx
<DisplayRoot
  focusOptions={{ wrap: true, initialFocusId: 'first-btn' }}
  onSelect={(focusedId) => console.log('selected:', focusedId)}
>
  {children}
</DisplayRoot>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `focusOptions` | `FocusEngineOptions` | `{ wrap: true }` | Configure focus wrapping, initial focus |
| `onSelect` | `(id: string) => void` | — | Called on Enter/select while an element is focused |
| `className` | `string` | — | Additional classes for the root div |

#### `<Text>`

Display-optimized typography with enforced minimum font weight.

```tsx
<Text size="lg" weight="bold" glow>Important Message</Text>
<Text size="sm" dim>Secondary info</Text>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Font size |
| `weight` | `'medium' \| 'semibold' \| 'bold'` | `'medium'` | Font weight (min 500) |
| `glow` | `boolean` | `false` | Add outer glow for emphasis |
| `dim` | `boolean` | `false` | Use dimmed text color |
| `as` | `'p' \| 'span' \| 'h1' \| 'h2' \| 'h3' \| 'label'` | `'span'` | HTML element |


#### `<Icon>`

SVG icon with 14 built-in icons. Supports custom SVG children.

```tsx
<Icon name="home" size={24} />
<Icon name="bell" size={20} color="var(--color-mrbd-accent)" />
```

Built-in icons: `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `check`, `x`, `home`, `settings`, `bell`, `search`, `play`, `pause`, `skip-forward`, `skip-back`

#### `<Focusable>`

Makes any child D-pad focusable. Registers with the spatial focus engine.

```tsx
<Focusable id="my-item" onSelect={() => handleSelect()} onFocus={() => handleFocus()}>
  <div>Custom focusable content</div>
</Focusable>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | **required** | Unique ID for focus registration |
| `group` | `string` | — | Scope focus navigation to this group |
| `onSelect` | `() => void` | — | Called on Enter key |
| `onFocus` | `() => void` | — | Called when focused |
| `onBlur` | `() => void` | — | Called when focus leaves |
| `disabled` | `boolean` | `false` | Remove from focus order |

### Composites

#### `<Button>`

D-pad focusable button with variants.

```tsx
<Button id="confirm" variant="primary" icon="check" onPress={handleConfirm}>
  Confirm
</Button>
<Button id="cancel" variant="ghost" onPress={handleCancel}>
  Cancel
</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `id` | `string` | **required** | Focus engine ID |
| `icon` | `BuiltInIcon` | — | Icon before label |
| `onPress` | `() => void` | — | Called on D-pad select |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Full width |

#### `<NavigationBar>`

Bottom-anchored tab bar with D-pad left/right navigation.

```tsx
<NavigationBar
  items={[
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ]}
  activeId={activeTab}
  onSelect={setActiveTab}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `NavItem[]` | **required** | Tab definitions |
| `activeId` | `string` | **required** | Currently active tab ID |
| `onSelect` | `(id: string) => void` | **required** | Tab selection handler |

#### `<LoadingIndicator>`

Lightweight loading animation with three variants.

```tsx
<LoadingIndicator variant="spinner" size={32} />
<LoadingIndicator variant="dots" size={24} />
<LoadingIndicator variant="pulse" size={16} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'spinner' \| 'dots' \| 'pulse'` | `'spinner'` | Animation style |
| `size` | `number` | `32` | Size in pixels |
| `color` | `string` | Theme text color | CSS color value |
| `label` | `string` | `'Loading'` | Accessible label |

## Hooks

### `useDpad()`

Subscribe to D-pad input events.

```tsx
const { activeKey, lastKey } = useDpad({
  onPress: (key) => console.log('pressed:', key),
  onRelease: (key) => console.log('released:', key),
});
```

### `useFocusManager()`

Programmatic focus control. Must be used inside `<DisplayRoot>`.

```tsx
const { focusedId, move, focus } = useFocusManager();

// Move focus programmatically
move('down');

// Focus a specific element
focus('my-button');
```

### `useIsMRBD()`

Client-side detection of Meta Ray-Ban Display via user agent.

```tsx
const isMRBD = useIsMRBD();

if (isMRBD) {
  return <MRBDApp />;
}
return <StandardWebApp />;
```

## Server-Side Detection

### Generic server (any runtime)

```tsx
import { isMRBD, isMRBDFromHeaders } from 'mrbd-ui-kit/server';

// Check a raw user agent string
isMRBD(userAgentString); // boolean

// Check from a Headers object
isMRBDFromHeaders(request.headers); // boolean
```

### Next.js (React Server Components)

```tsx
import { isMRBDServer } from 'mrbd-ui-kit/next';

export default async function Page() {
  const isMRBD = await isMRBDServer();

  if (isMRBD) {
    return <MRBDLayout />;
  }
  return <StandardLayout />;
}
```

## Tailwind Theme Tokens

When you import `mrbd-ui-kit/css/theme`, these Tailwind utilities become available:

### Colors
- `bg-mrbd-bg` — Transparent (black on additive display)
- `bg-mrbd-surface` — Subtle surface (white at 6% opacity)
- `bg-mrbd-surface-hover` — Hover state surface
- `bg-mrbd-surface-active` — Active/pressed surface
- `text-mrbd-text` — Primary text (white at 92% — not pure white)
- `text-mrbd-text-dim` — Secondary/dimmed text
- `bg-mrbd-accent` — Accent blue
- `bg-mrbd-danger` — Danger red
- `bg-mrbd-success` — Success green

### Shadows (Outer Glow)
- `shadow-mrbd-glow` — Subtle white glow
- `shadow-mrbd-glow-accent` — Blue accent glow
- `shadow-mrbd-glow-focus` — Focus ring glow

### Typography
- `font-mrbd` — Inter/Roboto font stack

### Sizing
- `w-mrbd` / `h-mrbd` — 600px (full display)

## Design Guidelines

1. **Never use pure white (`#FFFFFF`)** — It causes ghosting on additive displays. Use `text-mrbd-text` (92% opacity white) instead.
2. **Never use drop shadows** — They look like dirt on the lens. Use outer glows (`shadow-mrbd-glow-*`).
3. **Keep it glanceable** — Users scan in under 2 seconds. Prioritize hierarchy and brevity.
4. **Right-anchor important content** — The display is monocular (right eye). Use F-pattern layouts.
5. **Use bold fonts** — Minimum `font-weight: 500`. Thin fonts are illegible on the display.
6. **Minimize re-renders** — Battery-constrained device. Keep components lightweight.

## License

MIT
