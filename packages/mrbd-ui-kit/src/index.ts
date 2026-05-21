// Components — Primitives
export { DisplayRoot } from "./components/display-root";
export { Focusable } from "./components/focusable";
export { Icon } from "./components/icon";
export { Text } from "./components/text";

// Components — Composites
export { Button } from "./components/button";
export { LoadingSpinner } from "./components/loading-indicator";
export { Pill } from "./components/pill";
export { ScrollArea } from "./components/scroll-area";
export { ScrollBar } from "./components/scroll-bar";
export { ScrollContainer } from "./components/scroll-container";

// Hooks
export { useSpatialInput } from "./hooks/use-spatial-input";
export { useFocusManager } from "./hooks/use-focus-manager";
export { useIsMRBD } from "./hooks/use-is-mrbd";
export { useScroll } from "./hooks/use-scroll";

// Types — Components
export type { ButtonProps } from "./components/button";
export type { DisplayRootProps } from "./components/display-root";
export type { FocusableProps } from "./components/focusable";
export type { IconProps } from "./components/icon";
export type { LoadingSpinnerProps } from "./components/loading-indicator";
export type { PillProps } from "./components/pill";
export type { ScrollAreaProps } from "./components/scroll-area";
export type { ScrollBarProps } from "./components/scroll-bar";
export type { ScrollContainerProps } from "./components/scroll-container";
export type { TextProps } from "./components/text";

// Types — Hooks
export type { SpatialInputKey, SpatialInputState, UseSpatialInputOptions } from "./hooks/use-spatial-input";
export type { FocusManager } from "./hooks/use-focus-manager";
export type { ScrollState, UseScrollReturn } from "./hooks/use-scroll";

// Types — Focus Engine
export type { SpatialDirection, FocusEngineOptions } from "./focus/engine";
