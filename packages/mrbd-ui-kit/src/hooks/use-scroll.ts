"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ScrollState {
	/** Current scroll position from top */
	scrollTop: number;
	/** Total scrollable height of the content */
	scrollHeight: number;
	/** Visible viewport height */
	clientHeight: number;
	/** true when scrolled past the top (content above is hidden) */
	canScrollUp: boolean;
	/** true when there is content below the visible area */
	canScrollDown: boolean;
	/** true while the user is actively scrolling (scrollTop is changing) */
	isScrolling: boolean;
}

export interface UseScrollReturn extends ScrollState {
	/** Attach this ref to the scrollable container */
	scrollRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Tracks scroll position of a container element.
 *
 * Returns scroll metrics (`scrollTop`, `scrollHeight`, `clientHeight`)
 * plus convenience booleans (`canScrollUp`, `canScrollDown`).
 *
 * Designed to pair with `<ScrollArea>` and `<ScrollBar>`:
 *
 * ```tsx
 * const scroll = useScroll();
 *
 * <ScrollArea scrollRef={scroll.scrollRef} canScrollUp={scroll.canScrollUp} canScrollDown={scroll.canScrollDown}>
 *   {items}
 * </ScrollArea>
 * <ScrollBar scrollHeight={scroll.scrollHeight} clientHeight={scroll.clientHeight} scrollTop={scroll.scrollTop} />
 * ```
 */
export function useScroll(): UseScrollReturn {
	const scrollRef = useRef<HTMLDivElement>(null);

	const [state, setState] = useState<ScrollState>({
		scrollTop: 0,
		scrollHeight: 0,
		clientHeight: 0,
		canScrollUp: false,
		canScrollDown: false,
		isScrolling: false
	});

	// Track previous scrollTop so we only set isScrolling when position actually changes
	const prevScrollTopRef = useRef<number>(0);
	const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isScrollingRef = useRef<boolean>(false);

	const update = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;

		const { scrollTop, scrollHeight, clientHeight } = el;
		const positionChanged = Math.abs(scrollTop - prevScrollTopRef.current) > 0;
		prevScrollTopRef.current = scrollTop;

		if (positionChanged && !isScrollingRef.current) {
			isScrollingRef.current = true;
		}

		if (positionChanged) {
			// Reset idle timer on every position change
			if (idleTimerRef.current !== null) clearTimeout(idleTimerRef.current);
			idleTimerRef.current = setTimeout(() => {
				isScrollingRef.current = false;
				setState((prev) => ({ ...prev, isScrolling: false }));
				idleTimerRef.current = null;
			}, 1000);
		}

		setState({
			scrollTop,
			scrollHeight,
			clientHeight,
			canScrollUp: scrollTop > 1,
			canScrollDown: scrollTop + clientHeight < scrollHeight - 1,
			isScrolling: positionChanged ? true : isScrollingRef.current
		});
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		// Initial measurement
		update();

		// Track scroll events
		el.addEventListener("scroll", update, { passive: true });

		// Track content size changes (dynamic lists, images loading, etc.)
		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(el);
		// Also observe direct children for content size changes
		for (const child of Array.from(el.children)) {
			resizeObserver.observe(child);
		}

		return () => {
			el.removeEventListener("scroll", update);
			resizeObserver.disconnect();
			if (idleTimerRef.current !== null) clearTimeout(idleTimerRef.current);
		};
	}, [update]);

	return {
		scrollRef,
		...state
	};
}
