import type { ReactNode } from 'react';
import { Focusable } from './focusable';
import { Icon, type BuiltInIcon } from './icon';

export interface ButtonProps {
  children: ReactNode;
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Required — used for focus engine registration */
  id: string;
  /** Icon to render before children */
  icon?: BuiltInIcon;
  /** @default false */
  disabled?: boolean;
  /** Called on D-pad select (Enter key) */
  onPress?: () => void;
  /** Full width. @default false */
  fullWidth?: boolean;
  /** Focus group for scoped navigation */
  group?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-mrbd-accent text-black font-bold hover:brightness-110 active:brightness-90',
  secondary:
    'bg-mrbd-surface text-mrbd-text border border-white/10 hover:bg-mrbd-surface-hover active:bg-mrbd-surface-active',
  ghost:
    'bg-transparent text-mrbd-text hover:bg-mrbd-surface active:bg-mrbd-surface-hover',
  danger:
    'bg-mrbd-danger text-black font-bold hover:brightness-110 active:brightness-90',
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  md: 'h-10 px-4 text-base rounded-lg gap-2',
  lg: 'h-12 px-6 text-lg rounded-lg gap-2.5',
};

const ICON_SIZE: Record<NonNullable<ButtonProps['size']>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  id,
  icon,
  disabled = false,
  onPress,
  fullWidth = false,
  group,
  className,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-mrbd font-semibold transition-all duration-150',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-40 pointer-events-none' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Focusable id={id} onSelect={onPress} disabled={disabled} group={group}>
      <div className={classes}>
        {icon && <Icon name={icon} size={ICON_SIZE[size]} />}
        {children}
      </div>
    </Focusable>
  );
}
