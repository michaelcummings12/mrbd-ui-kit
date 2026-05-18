import type { ReactNode } from 'react';

export interface StackProps {
  children: ReactNode;
  /** @default 'vertical' */
  direction?: 'vertical' | 'horizontal';
  /** Gap in Tailwind spacing units. @default 2 */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** @default 'stretch' */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** @default 'start' */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

const ALIGN_CLASSES: Record<NonNullable<StackProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const JUSTIFY_CLASSES: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export function Stack({
  children,
  direction = 'vertical',
  gap = 2,
  align = 'stretch',
  justify = 'start',
  className,
}: StackProps) {
  const classes = [
    'flex',
    direction === 'vertical' ? 'flex-col' : 'flex-row',
    `gap-${gap}`,
    ALIGN_CLASSES[align],
    JUSTIFY_CLASSES[justify],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
