import { useEffect, useState } from 'react';

const MRBD_UA_TOKEN = 'Greatwhite';

/**
 * Client-side hook to detect if the current device is a Meta Ray-Ban Display.
 * Checks `navigator.userAgent` for the "Greatwhite" token.
 *
 * Returns `false` during SSR. Updates on mount client-side.
 *
 * @example
 * ```tsx
 * const isMRBD = useIsMRBD();
 *
 * if (isMRBD) {
 *   // Render MRBD-optimized UI
 * } else {
 *   // Render standard web UI
 * }
 * ```
 */
export function useIsMRBD(): boolean {
  const [isMRBD, setIsMRBD] = useState(false);

  useEffect(() => {
    setIsMRBD(navigator.userAgent.includes(MRBD_UA_TOKEN));
  }, []);

  return isMRBD;
}
