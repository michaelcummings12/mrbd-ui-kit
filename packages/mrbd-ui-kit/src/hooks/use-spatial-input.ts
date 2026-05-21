import { useCallback, useEffect, useRef, useState } from "react";

export type SpatialInputKey = "up" | "down" | "left" | "right" | "select";

export interface SpatialInputState {
	/** The key currently being held, or null */
	activeKey: SpatialInputKey | null;
	/** Last key that was pressed (persists after release) */
	lastKey: SpatialInputKey | null;
}

export interface UseSpatialInputOptions {
	/** Called on any spatial input key press */
	onPress?: (key: SpatialInputKey) => void;
	/** Called on key release */
	onRelease?: (key: SpatialInputKey) => void;
	/** Disable the hook */
	disabled?: boolean;
}

const KEY_MAP: Record<string, SpatialInputKey> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	Enter: "select"
};

export function useSpatialInput(options: UseSpatialInputOptions = {}): SpatialInputState {
	const { disabled = false } = options;
	const [state, setState] = useState<SpatialInputState>({
		activeKey: null,
		lastKey: null
	});

	// Use ref for callbacks to avoid re-attaching listeners on every render
	const callbacksRef = useRef(options);
	callbacksRef.current = options;

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		const key = KEY_MAP[e.key];
		if (!key) return;

		e.preventDefault();
		setState((prev) => ({ activeKey: key, lastKey: key }));
		callbacksRef.current.onPress?.(key);
	}, []);

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		const key = KEY_MAP[e.key];
		if (!key) return;

		setState((prev) => ({ ...prev, activeKey: null }));
		callbacksRef.current.onRelease?.(key);
	}, []);

	useEffect(() => {
		if (disabled) return;

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [disabled, handleKeyDown, handleKeyUp]);

	return state;
}
