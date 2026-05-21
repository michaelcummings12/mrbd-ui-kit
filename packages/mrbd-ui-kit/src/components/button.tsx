import type { ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Focusable } from "./focusable";
import { Icon } from "./icon";
import { Slot } from "./slot";

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
	/** Called on select (Enter key) */
	onClick?: () => void;
	/** Called when this element receives focus */
	onFocus?: () => void;
	/** Called when this element loses focus */
	onBlur?: () => void;
	/** Called when select (Enter) is pressed while focused (alias for onClick) */
	onSelect?: () => void;
	className?: string;
	/**
	 * Merge button styles onto the child element instead of rendering a <button>.
	 * Useful for `<Link>`, `<a>`, or any other element that should act as the
	 * interactive target while still participating in the MRBD focus engine.
	 *
	 * The child must be a single valid React element.
	 *
	 * @example
	 * <Button id="home" asChild>
	 *   <Link href="/home">Home</Link>
	 * </Button>
	 */
	asChild?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary: "bg-mrbd-accent text-black",
	secondary: "bg-mrbd-surface text-mrbd-text border border-mrbd-tint/10 hover:bg-mrbd-surface-hover active:bg-mrbd-surface-active",
	ghost: "border-l-2 border-t-2 border-mrbd-tint/10 hover:border-mrbd-tint/40 group-focus:border-mrbd-tint/40 bg-mrbd-tint/20 text-mrbd-text",
	danger: "bg-mrbd-danger text-black"
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
	sm: "h-12 px-4 text-sm rounded-3xl gap-1.5",
	md: "h-24 px-4 text-base rounded-4xl gap-2",
	lg: "h-28 px-6 text-base rounded-4xl gap-2"
};

const ICON_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
	sm: "size-5",
	md: "size-6",
	lg: "size-7"
};

export function Button({
	children,
	variant = "ghost",
	size = "md",
	id,
	icon,
	disabled,
	onClick,
	onFocus,
	onBlur,
	onSelect,
	className,
	asChild = false
}: ButtonProps) {
	const resolvedClass = cn(
		"inline-flex items-center justify-center font-semibold transition-all group-focus:scale-103 hover:scale-103 focus:outline-none",
		VARIANT_CLASSES[variant],
		SIZE_CLASSES[size],
		"hover:shadow-mrbd-glow-inner group-focus:shadow-mrbd-glow-inner",
		disabled && "pointer-events-none opacity-40",
		className
	);

	return (
		<Focusable id={id} onSelect={onSelect ?? onClick} onFocus={onFocus} onBlur={onBlur} disabled={disabled} className="group">
			{asChild ? (
				// Slot merges resolvedClass onto the single child element (e.g. <Link>).
				// Must be exactly one child — no icon expression here.
				<Slot className={resolvedClass}>{children}</Slot>
			) : (
				<button className={resolvedClass} onClick={onSelect ?? onClick}>
					{icon && <Icon icon={icon} className={ICON_CLASSES[size]} />}
					{children}
				</button>
			)}
		</Focusable>
	);
}
