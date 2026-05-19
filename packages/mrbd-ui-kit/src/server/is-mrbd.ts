const MRBD_UA_TOKEN = "Greatwhite";

/**
 * Check a raw user agent string for MRBD device.
 *
 * @example
 * ```ts
 * // In an API route or server handler
 * import { isMRBD } from 'mrbd-ui-kit/server';
 *
 * const ua = request.headers.get('user-agent') ?? '';
 * if (isMRBD(ua)) {
 *   // Serve MRBD-optimized response
 * }
 * ```
 */
export function isMRBD(userAgent: string): boolean {
	return userAgent.includes(MRBD_UA_TOKEN);
}

/**
 * Check from a Headers object (works in any server runtime).
 *
 * @example
 * ```ts
 * import { isMRBDFromHeaders } from 'mrbd-ui-kit/server';
 *
 * export async function GET(request: Request) {
 *   if (isMRBDFromHeaders(request.headers)) {
 *     return Response.json({ display: 'mrbd' });
 *   }
 * }
 * ```
 */
export function isMRBDFromHeaders(headers: Headers): boolean {
	return isMRBD(headers.get("user-agent") ?? "");
}
