const MRBD_UA_TOKEN = "Greatwhite";

/**
 * Check a raw user agent string for MRBD device.
 *
 * @example
 * ```ts
 * // In an API route or server handler
 * import { isMrbd } from 'mrbd-ui-kit/server';
 *
 * const ua = request.headers.get('user-agent') ?? '';
 * if (isMrbd(ua)) {
 *   // Serve MRBD-optimized response
 * }
 * ```
 */
export function isMrbd(userAgent: string): boolean {
	return userAgent.includes(MRBD_UA_TOKEN);
}

/**
 * Check from a Headers object (works in any server runtime).
 *
 * @example
 * ```ts
 * import { isMrbdFromHeaders } from 'mrbd-ui-kit/server';
 *
 * export async function GET(request: Request) {
 *   if (isMrbdFromHeaders(request.headers)) {
 *     return Response.json({ display: 'mrbd' });
 *   }
 * }
 * ```
 */
export function isMrbdFromHeaders(headers: Headers): boolean {
	return isMrbd(headers.get("user-agent") ?? "");
}
