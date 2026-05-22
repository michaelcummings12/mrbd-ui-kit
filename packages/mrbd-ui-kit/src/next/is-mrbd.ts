import { headers } from "next/headers";

const MRBD_UA_TOKEN = "Greatwhite";

/**
 * Detect MRBD device in React Server Components and Server Actions.
 * Uses Next.js `headers()` to read the user agent.
 *
 * @example
 * ```tsx
 * // In a React Server Component
 * import { isMrbdServer } from 'mrbd-ui-kit/next';
 *
 * export default async function Page() {
 *   const isMrbd = await isMrbdServer();
 *
 *   if (isMrbd) {
 *     return <MRBDLayout />;
 *   }
 *   return <StandardLayout />;
 * }
 * ```
 */
export async function isMrbdServer(): Promise<boolean> {
	const h = await headers();
	return (h.get("user-agent") ?? "").includes(MRBD_UA_TOKEN);
}
