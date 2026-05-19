import type { ElementType, ReactNode } from "react";

export interface IconProps {
	/** The icon component to render (e.g., from lucide-react) */
	icon?: ElementType;
	/** Custom SVG children (used if icon component is not provided) */
	children?: ReactNode;
	/** Size in px. @default 24 */
	size?: number;
	/** @default 'currentColor' */
	color?: string;
	className?: string;
}

export function Icon({ icon: IconComp, children, size = 24, color = "currentColor", className }: IconProps) {
	if (IconComp) {
		return <IconComp size={size} color={color} className={className} aria-hidden="true" />;
	}

	if (children) {
		return (
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke={color}
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
