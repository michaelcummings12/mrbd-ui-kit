import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface TextProps {
	children: ReactNode;
	/** @default 'md' */
	size?: "sm" | "md" | "lg";
	/** @default 'medium'. Minimum 500 weight — thin fonts are illegible on additive displays. */
	weight?: "medium" | "semibold" | "bold";
	/** HTML element to render as. @default 'span' */
	as?: "p" | "span" | "h1" | "h2" | "h3" | "label";
	className?: string;
}

const SIZE_CLASSES: Record<NonNullable<TextProps["size"]>, string> = {
	sm: "text-xl",
	md: "text-2xl",
	lg: "text-3xl"
};

const WEIGHT_CLASSES: Record<NonNullable<TextProps["weight"]>, string> = {
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold"
};

export function Text({ children, size = "md", weight = "medium", as: Tag = "span", className }: TextProps) {
	const classes = cn(
		SIZE_CLASSES[size],
		WEIGHT_CLASSES[weight],
		"text-mrbd-text",
		className
	);

	return <Tag className={classes}>{children}</Tag>;
}
