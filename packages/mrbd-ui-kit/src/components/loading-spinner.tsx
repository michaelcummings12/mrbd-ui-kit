import { cn } from "../lib/cn";

export interface LoadingSpinnerProps {
	/** Accessible label. @default 'Loading' */
	label?: string;
	className?: string;
}

export function LoadingSpinner({ label = "Loading", className }: LoadingSpinnerProps) {
	return (
		<svg role="status" aria-label={label} viewBox="0 0 100 100" fill="none" className={cn("text-mrbd-accent size-8 animate-spin", className)}>
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
