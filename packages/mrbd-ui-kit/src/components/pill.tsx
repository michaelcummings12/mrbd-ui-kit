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
				className,
				"relative m-auto rounded-full border-t border-l border-white/10 bg-linear-to-b from-white/20 to-transparent p-3",
				className
			)}>
			{children}
		</span>
	);
}
