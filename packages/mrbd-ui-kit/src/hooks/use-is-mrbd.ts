import { useEffect, useState } from "react";

const MRBD_UA_TOKEN = "Greatwhite";

/**
 * Client-side hook to detect if the current device is a Meta Ray-Ban Display.
 * Checks `navigator.userAgent` for the "Greatwhite" token.
 *
 * Returns `false` during SSR. Updates on mount client-side.
 *
 * @example
 * ```tsx
 * const isMrbd = useIsMrbd();
 *
 * if (isMrbd) {
 *   // Render MRBD-optimized UI
 * } else {
 *   // Render standard web UI
 * }
 * ```
 */
export function useIsMrbd(): boolean {
	const [isMrbd, setIsMrbd] = useState(false);

	useEffect(() => {
		setIsMrbd(navigator.userAgent.includes(MRBD_UA_TOKEN));
	}, []);

	return isMrbd;
}
