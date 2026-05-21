import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CardProps {
	children: ReactNode;
	className?: string;
}

export function Card({ children, className }: CardProps) {
	return <div className={cn("border-mrbd-accent/10 bg-mrbd-accent/20 rounded-3xl border-t-2 border-l-2 p-3", className)}>{children}</div>;
}
