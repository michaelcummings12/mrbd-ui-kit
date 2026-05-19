import type { ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Focusable } from "./focusable";
import { Icon } from "./icon";

export interface ButtonProps {
	children: ReactNode;
	/** @default 'primary' */
	variant?: "primary" | "secondary" | "ghost" | "danger";
	/** @default 'md' */
	size?: "sm" | "md" | "lg";
	/** Required — used for focus engine registration */
	id: string;
	/** Icon to render before children */
	icon?: ElementType;
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

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary: "bg-mrbd-accent text-black font-bold hover:brightness-110 active:brightness-90",
	secondary: "bg-mrbd-surface text-mrbd-text border border-white/10 hover:bg-mrbd-surface-hover active:bg-mrbd-surface-active",
	ghost: "bg-white/5 text-mrbd-text active:bg-white/10",
	danger: "bg-mrbd-danger text-black font-bold hover:brightness-110 active:brightness-90"
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
	sm: "h-20 px-3 text-sm rounded-3xl gap-1.5",
	md: "h-24 px-4 text-base rounded-4xl gap-2",
	lg: "h-28 px-6 text-lg rounded-4xl gap-2.5"
};

const ICON_SIZE: Record<NonNullable<ButtonProps["size"]>, number> = {
	sm: 20,
	md: 24,
	lg: 28
};

export function Button({ children, variant = "ghost", size = "md", id, icon, disabled, onPress, group, className }: ButtonProps) {
	const classes = [];

	return (
		<Focusable id={id} onSelect={onPress} disabled={disabled} group={group} className="group">
			<button
				className={cn(
					"font-mrbd inline-flex items-center justify-center font-semibold transition-all duration-150 group-focus:scale-105 hover:scale-105 focus:outline-none",
					VARIANT_CLASSES[variant],
					SIZE_CLASSES[size],
					"hover:shadow-mrbd-glow-inner group-focus:shadow-mrbd-glow-inner",
					disabled && "pointer-events-none opacity-40",
					className
				)}>
				{icon && <Icon icon={icon} size={ICON_SIZE[size]} />}
				{children}
			</button>
		</Focusable>
	);
}
