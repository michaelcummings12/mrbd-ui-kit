import type { ElementType, ReactNode } from "react";

export interface IconProps {
	/** The icon component to render (e.g., from lucide-react) */
	icon?: ElementType;
	/** Custom SVG children (used if icon component is not provided) */
	children?: ReactNode;
	className?: string;
}

export function Icon({ icon: IconComp, children, className }: IconProps) {
	if (IconComp) {
		return <IconComp className={className} aria-hidden="true" />;
	}

	if (children) {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className={className}
				aria-hidden="true">
				{children}
			</svg>
		);
	}

	return null;
}
