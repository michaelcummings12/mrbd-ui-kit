"use client";

import { cn } from "../lib/cn";

export interface ScrollBarProps {
	/** Total scrollable height of the content (scrollHeight) */
	scrollHeight: number;
	/** Visible viewport height (clientHeight) */
	clientHeight: number;
	/** Current scroll position (scrollTop) */
	scrollTop: number;
	/**
	 * Whether the user is actively scrolling and the position is changing.
	 * When false the bar fades out. Comes from `useScroll().isScrolling`.
	 */
	isScrolling?: boolean;
	/** Additional classes on the outer track */
	className?: string;
}

/**
 * A composable scrollbar indicator for MRBD scroll areas.
 *
 * The track is fixed at h-28 (112px). The thumb scales proportionally
 * to the ratio of visible content vs total content, with a minimum
 * size so it's always grabbable/visible.
 *
 * Pass `isScrolling` from `useScroll()` to get automatic fade-in/out —
 * the bar only appears while the scroll position is actively changing.
 */
export function ScrollBar({ scrollHeight, clientHeight, scrollTop, isScrolling = false, className }: ScrollBarProps) {
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
			className={cn(
				"bg-mrbd-accent/30 relative h-28 w-2 shrink-0 self-center rounded-full transition-opacity duration-300 ease-in-out",
				isScrolling ? "opacity-100" : "opacity-0",
				className
			)}
			aria-hidden="true">
			<div
				className="bg-mrbd-accent absolute left-0 w-full rounded-full transition-transform duration-150 ease-out"
				style={{
					height: `${thumbHeight}px`,
					top: `${thumbOffset}px`
				}}
			/>
		</div>
	);
}
