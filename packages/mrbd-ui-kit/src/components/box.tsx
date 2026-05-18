import type { ElementType, ReactNode } from 'react';

export interface BoxProps {
  children?: ReactNode;
  /** HTML element to render as. @default 'div' */
  as?: ElementType;
  /** Apply surface background. @default false */
  surface?: boolean;
  /** Padding (Tailwind spacing units). Applies p-{value}. */
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Horizontal padding. Applies px-{value}. */
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Vertical padding. Applies py-{value}. */
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Border radius. @default 'none' */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const ROUNDED_CLASSES: Record<NonNullable<BoxProps['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export function Box({
  children,
  as: Tag = 'div',
  surface = false,
  p,
  px,
  py,
  rounded = 'none',
  className,
}: BoxProps) {
  const classes = [
    surface ? 'bg-mrbd-surface' : '',
    p !== undefined ? `p-${p}` : '',
    px !== undefined ? `px-${px}` : '',
    py !== undefined ? `py-${py}` : '',
    ROUNDED_CLASSES[rounded],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
