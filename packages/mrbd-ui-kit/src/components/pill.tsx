import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface PillProps {
	children: ReactNode;
	className?: string;
}

export function Pill({ children, className }: PillProps) {
	return (
		<span
			className={cn(
				"relative m-auto h-12 rounded-full border-t border-l border-mrbd-tint/10 bg-linear-to-b from-mrbd-tint/20 to-transparent px-4",
				className
			)}>
			{children}
		</span>
	);
}
