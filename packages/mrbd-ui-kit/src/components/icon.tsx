import type { ReactNode } from 'react';

export type BuiltInIcon =
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'check'
  | 'x'
  | 'home'
  | 'settings'
  | 'bell'
  | 'search'
  | 'play'
  | 'pause'
  | 'skip-forward'
  | 'skip-back';

export interface IconProps {
  /** Named built-in icon */
  name?: BuiltInIcon;
  /** Custom SVG children (used when name is not provided) */
  children?: ReactNode;
  /** Size in px. @default 24 */
  size?: number;
  /** @default 'currentColor' */
  color?: string;
  className?: string;
}

/**
 * SVG path data for built-in icons.
 * All paths are designed for a 24x24 viewBox.
 * Stroke-based icons use strokeWidth=2, strokeLinecap=round, strokeLinejoin=round.
 */
const ICON_PATHS: Record<BuiltInIcon, string> = {
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  bell: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  play: 'M5 3l14 9-14 9V3z',
  pause: 'M6 4h4v16H6zM14 4h4v16h-4z',
  'skip-forward': 'M5 4l10 8-10 8V4zM19 5v14',
  'skip-back': 'M19 20L9 12l10-8v16zM5 19V5',
};

export function Icon({ name, children, size = 24, color = 'currentColor', className }: IconProps) {
  if (children) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {children}
      </svg>
    );
  }

  if (!name) return null;

  const pathData = ICON_PATHS[name];
  if (!pathData) return null;

  // Determine if path should be filled (play, pause) or stroked
  const fillIcons: BuiltInIcon[] = ['play', 'pause'];
  const isFilled = fillIcons.includes(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? color : 'none'}
      stroke={isFilled ? 'none' : color}
      strokeWidth={isFilled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={pathData} />
    </svg>
  );
}
