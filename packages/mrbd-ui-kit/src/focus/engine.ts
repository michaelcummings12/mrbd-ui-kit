export type SpatialDirection = "up" | "down" | "left" | "right";

export interface FocusableEntry {
	id: string;
	element: HTMLElement;
	group?: string;
}

export interface FocusEngineOptions {
	/** Wrap focus at boundaries. @default true */
	wrap?: boolean;
	/** ID to focus on mount */
	initialFocusId?: string;
}

export interface FocusEngine {
	register: (entry: FocusableEntry) => void;
	unregister: (id: string) => void;
	move: (direction: SpatialDirection) => void;
	focusById: (id: string) => void;
	getCurrentId: () => string | null;
	subscribe: (listener: (id: string | null) => void) => () => void;
	destroy: () => void;
}

interface Rect {
	top: number;
	bottom: number;
	left: number;
	right: number;
	centerX: number;
	centerY: number;
}

function getRect(el: HTMLElement): Rect {
	const r = el.getBoundingClientRect();
	return {
		top: r.top,
		bottom: r.bottom,
		left: r.left,
		right: r.right,
		centerX: r.left + r.width / 2,
		centerY: r.top + r.height / 2
	};
}

/**
 * Filter candidates that are in the given direction relative to the current rect.
 * For "right": candidates whose left edge is at or beyond current right edge.
 * Small tolerance (1px) to avoid self-matching.
 */
function filterByDirection(
	direction: SpatialDirection,
	current: Rect,
	candidates: Array<{ id: string; rect: Rect }>
): Array<{ id: string; rect: Rect }> {
	switch (direction) {
		case "up":
			return candidates.filter((c) => c.rect.centerY < current.centerY - 1);
		case "down":
			return candidates.filter((c) => c.rect.centerY > current.centerY + 1);
		case "left":
			return candidates.filter((c) => c.rect.centerX < current.centerX - 1);
		case "right":
			return candidates.filter((c) => c.rect.centerX > current.centerX + 1);
	}
}

/**
 * Score a candidate by distance + off-axis penalty.
 * Lower score = better match.
 *
 * For vertical movement (up/down): primary axis is Y, penalty axis is X.
 * For horizontal movement (left/right): primary axis is X, penalty axis is Y.
 *
 * The penalty ensures elements roughly aligned on the movement axis are preferred
 * over elements that are closer but far off to the side.
 */
function scoreCandidate(direction: SpatialDirection, current: Rect, candidate: Rect): number {
	const dx = candidate.centerX - current.centerX;
	const dy = candidate.centerY - current.centerY;

	const isVertical = direction === "up" || direction === "down";
	const primaryDist = isVertical ? Math.abs(dy) : Math.abs(dx);
	const offAxisDist = isVertical ? Math.abs(dx) : Math.abs(dy);

	// Off-axis penalty: elements far off the movement axis are penalized
	const OFF_AXIS_WEIGHT = 2.5;
	return primaryDist + offAxisDist * OFF_AXIS_WEIGHT;
}

/**
 * For wrap-around: find the element on the opposite edge.
 * e.g., if moving "right" with no candidates, wrap to the leftmost element.
 */
function getWrapTarget(direction: SpatialDirection, entries: Array<{ id: string; rect: Rect }>): string | null {
	if (entries.length === 0) return null;

	let best = entries[0];
	for (const entry of entries) {
		switch (direction) {
			case "up":
				if (entry.rect.centerY > best.rect.centerY) best = entry;
				break;
			case "down":
				if (entry.rect.centerY < best.rect.centerY) best = entry;
				break;
			case "left":
				if (entry.rect.centerX > best.rect.centerX) best = entry;
				break;
			case "right":
				if (entry.rect.centerX < best.rect.centerX) best = entry;
				break;
		}
	}
	return best.id;
}

const SCROLL_MARGIN = 12;

/**
 * Find the nearest scrollable ancestor and scroll just enough to keep
 * `element` fully visible, with SCROLL_MARGIN clearance on top/bottom.
 * Unlike native scrollIntoView, this only scrolls the nearest scroll
 * container (not the root viewport) and respects gradient overlays.
 */
function scrollIntoScrollContainer(element: HTMLElement) {
	const container = findScrollParent(element);
	if (!container) return;

	const elRect = element.getBoundingClientRect();
	const ctRect = container.getBoundingClientRect();

	// How far off the element is from the visible area (with margin)
	const offTop = elRect.top - ctRect.top - SCROLL_MARGIN;
	const offBottom = elRect.bottom - ctRect.bottom + SCROLL_MARGIN;

	if (offTop < 0) {
		// Element is above visible area — scroll up
		container.scrollBy({ top: offTop, behavior: "smooth" });
	} else if (offBottom > 0) {
		// Element is below visible area — scroll down
		container.scrollBy({ top: offBottom, behavior: "smooth" });
	}
}

/** Walk up the DOM to find the first ancestor with overflow scroll/auto. */
function findScrollParent(el: HTMLElement): HTMLElement | null {
	let current = el.parentElement;
	while (current) {
		const style = getComputedStyle(current);
		if (/(auto|scroll)/.test(style.overflowY)) {
			return current;
		}
		current = current.parentElement;
	}
	return null;
}

/**
 * Check whether candidates have meaningful spatial spread along the
 * movement axis.  For horizontal movement (left/right), we check if
 * candidate centerX values differ by more than a threshold.  For
 * vertical (up/down), we check centerY.
 *
 * This prevents wrap-around when all elements sit in a single column
 * (left/right wrap) or a single row (up/down wrap).
 */
const SPREAD_THRESHOLD = 10; // px — elements within this distance are considered aligned

function hasSpatialSpread(direction: SpatialDirection, candidates: Array<{ id: string; rect: Rect }>): boolean {
	if (candidates.length < 2) return false;

	const isHorizontal = direction === "left" || direction === "right";
	const values = candidates.map((c) => (isHorizontal ? c.rect.centerX : c.rect.centerY));
	const min = Math.min(...values);
	const max = Math.max(...values);

	return max - min > SPREAD_THRESHOLD;
}

export function createFocusEngine(options: FocusEngineOptions = {}): FocusEngine {
	const { wrap = true, initialFocusId } = options;

	const entries = new Map<string, FocusableEntry>();
	let currentId: string | null = initialFocusId ?? null;
	const listeners = new Set<(id: string | null) => void>();
	let pendingInitialFocus = false;

	function getStorageKey(): string {
		try {
			return `mrbd-focus:${window.location.pathname}`;
		} catch {
			return "mrbd-focus:default";
		}
	}

	function getSavedFocusId(): string | null {
		try {
			return sessionStorage.getItem(getStorageKey());
		} catch {
			return null;
		}
	}

	function saveFocusId(id: string) {
		try {
			sessionStorage.setItem(getStorageKey(), id);
		} catch {
			// sessionStorage may be unavailable
		}
	}

	function notify() {
		for (const listener of listeners) {
			listener(currentId);
		}
	}

	function applyFocus(id: string | null, { persist = true } = {}) {
		// Remove data-focused from previous
		if (currentId) {
			const prev = entries.get(currentId);
			if (prev?.element) {
				prev.element.setAttribute("data-focused", "false");
				prev.element.blur();
			}
		}

		currentId = id;

		// Apply data-focused to new
		if (currentId) {
			const next = entries.get(currentId);
			if (next?.element) {
				next.element.setAttribute("data-focused", "true");
				next.element.focus({ preventScroll: true });
				scrollIntoScrollContainer(next.element);
			}

			// Persist for route-based focus restoration (skip during
			// unregister cascades so intermediate IDs don't overwrite
			// the user's intended focus target)
			if (persist) saveFocusId(currentId);
		}

		notify();
	}

	function register(entry: FocusableEntry) {
		entries.set(entry.id, entry);

		// If this is the initial focus target, focus immediately
		if (entry.id === initialFocusId) {
			requestAnimationFrame(() => applyFocus(entry.id));
			return;
		}

		// When nothing is focused, batch the initial focus decision in a single
		// rAF so all elements can register first. This lets us check for a
		// saved focus ID (from a previous visit to this route) before falling
		// back to the first registered element.
		if (currentId === null && !pendingInitialFocus) {
			pendingInitialFocus = true;
			requestAnimationFrame(() => {
				pendingInitialFocus = false;

				// Priority: saved focus > first entry
				const savedId = getSavedFocusId();
				if (savedId && entries.has(savedId)) {
					applyFocus(savedId);
				} else {
					const first = entries.keys().next().value;
					if (first) applyFocus(first);
				}
			});
		}
	}

	function unregister(id: string) {
		entries.delete(id);
		if (currentId === id) {
			// Focus first remaining entry, or null.
			// Don't persist — this is a teardown cascade, not user intent.
			const first = entries.keys().next().value;
			applyFocus(first ?? null, { persist: false });
		}
	}

	function move(direction: SpatialDirection) {
		if (entries.size === 0) return;

		// If nothing focused, focus the first entry
		if (currentId === null) {
			const first = entries.keys().next().value;
			if (first) applyFocus(first);
			return;
		}

		const currentEntry = entries.get(currentId);
		if (!currentEntry) return;

		const currentRect = getRect(currentEntry.element);

		// Build candidate list (excluding current, same group if grouped)
		const candidates: Array<{ id: string; rect: Rect }> = [];
		for (const [id, entry] of entries) {
			if (id === currentId) continue;
			// If current has a group, only consider same group
			if (currentEntry.group && entry.group !== currentEntry.group) continue;
			candidates.push({ id, rect: getRect(entry.element) });
		}

		// Filter to candidates in the correct direction
		const directional = filterByDirection(direction, currentRect, candidates);

		if (directional.length > 0) {
			// Score and pick the best
			let bestId = directional[0].id;
			let bestScore = scoreCandidate(direction, currentRect, directional[0].rect);

			for (let i = 1; i < directional.length; i++) {
				const score = scoreCandidate(direction, currentRect, directional[i].rect);
				if (score < bestScore) {
					bestScore = score;
					bestId = directional[i].id;
				}
			}

			applyFocus(bestId);
		} else if (wrap && hasSpatialSpread(direction, candidates)) {
			// No candidates in direction — wrap to opposite edge, but only
			// if elements are actually spread along the movement axis.
			// This prevents left/right from wrapping in a purely vertical
			// layout (and vice-versa).
			const allWithRects = candidates.map((c) => ({ id: c.id, rect: c.rect }));
			const wrapId = getWrapTarget(direction, allWithRects);
			if (wrapId) applyFocus(wrapId);
		}
	}

	function focusById(id: string) {
		if (entries.has(id)) {
			applyFocus(id);
		}
	}

	function getCurrentId() {
		return currentId;
	}

	function subscribe(listener: (id: string | null) => void) {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}

	function destroy() {
		entries.clear();
		listeners.clear();
		currentId = null;
	}

	return {
		register,
		unregister,
		move,
		focusById,
		getCurrentId,
		subscribe,
		destroy
	};
}
