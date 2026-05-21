import { cn } from "../lib/cn";

export interface LoadingSpinnerProps {
	/** Size in px. @default 32 */
	size?: number;
	/** Tailwind color class or CSS color. @default 'var(--color-mrbd-text)' */
	color?: string;
	/** Accessible label. @default 'Loading' */
	label?: string;
	className?: string;
}

export function LoadingSpinner({
	size = 32,
	color = "var(--color-mrbd-text)",
	label = "Loading",
	className
}: LoadingSpinnerProps) {
	return (
		<svg
			role="status"
			aria-label={label}
			viewBox="0 0 100 100"
			fill="none"
			width={size}
			height={size}
			className={cn("animate-spin", className)}
			style={{ color }}
		>
			<circle
				cx="50"
				cy="50"
				r="33"
				stroke="currentColor"
				strokeWidth="8"
				strokeLinecap="round"
				transform="rotate(-90 50 50)"
				strokeDasharray="52 155"
				strokeDashoffset="0"
				className="spinner-dash"
			/>
		</svg>
	);
}
