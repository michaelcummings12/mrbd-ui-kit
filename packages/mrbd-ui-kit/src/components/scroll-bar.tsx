"use client";

import { cn } from "../lib/cn";

export interface ScrollBarProps {
	/** Total scrollable height of the content (scrollHeight) */
	scrollHeight: number;
	/** Visible viewport height (clientHeight) */
	clientHeight: number;
	/** Current scroll position (scrollTop) */
	scrollTop: number;
	/** Additional classes on the outer track */
	className?: string;
}

/**
 * A composable scrollbar indicator for MRBD scroll areas.
 *
 * The track is fixed at h-28 (112px). The thumb scales proportionally
 * to the ratio of visible content vs total content, with a minimum
 * size so it's always grabbable/visible.
 */
export function ScrollBar({
	scrollHeight,
	clientHeight,
	scrollTop,
	className,
}: ScrollBarProps) {
	// Nothing to scroll — hide entirely
	if (scrollHeight <= clientHeight) return null;

	const trackHeight = 112; // h-28 = 7rem = 112px
	const ratio = clientHeight / scrollHeight;
	const thumbHeight = Math.max(ratio * trackHeight, 20); // min 20px
	const maxScroll = scrollHeight - clientHeight;
	const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
	const thumbOffset = scrollFraction * (trackHeight - thumbHeight);

	return (
		<div
			className={cn("relative w-1.5 h-28 rounded-full bg-mrbd-tint/30 shrink-0", className)}
			aria-hidden="true"
		>
			<div
				className="absolute left-0 w-full rounded-full bg-mrbd-tint transition-transform duration-150 ease-out"
				style={{
					height: `${thumbHeight}px`,
					top: `${thumbOffset}px`,
				}}
			/>
		</div>
	);
}
