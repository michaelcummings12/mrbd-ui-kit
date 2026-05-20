import type { ReactNode } from "react";

export interface TextProps {
	children: ReactNode;
	/** @default 'md' */
	size?: "sm" | "md" | "lg";
	/** @default 'medium'. Minimum 500 weight — thin fonts are illegible on additive displays. */
	weight?: "medium" | "semibold" | "bold";
	/** Adds outer glow for emphasis. @default false */
	glow?: boolean;
	/** Use dimmed color. @default false */
	dim?: boolean;
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

export function Text({ children, size = "md", weight = "medium", glow = false, dim = false, as: Tag = "span", className }: TextProps) {
	const classes = [
		SIZE_CLASSES[size],
		WEIGHT_CLASSES[weight],
		dim ? "text-mrbd-text-dim" : "text-mrbd-text",
		glow ? "shadow-mrbd-glow" : "",
		className ?? ""
	]
		.filter(Boolean)
		.join(" ");

	return <Tag className={classes}>{children}</Tag>;
}
