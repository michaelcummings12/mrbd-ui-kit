import { headers } from 'next/headers';

const MRBD_UA_TOKEN = 'Greatwhite';

/**
 * Detect MRBD device in React Server Components and Server Actions.
 * Uses Next.js `headers()` to read the user agent.
 *
 * @example
 * ```tsx
 * // In a React Server Component
 * import { isMRBDServer } from 'mrbd-ui-kit/next';
 *
 * export default async function Page() {
 *   const isMRBD = await isMRBDServer();
 *
 *   if (isMRBD) {
 *     return <MRBDLayout />;
 *   }
 *   return <StandardLayout />;
 * }
 * ```
 */
export async function isMRBDServer(): Promise<boolean> {
  const h = await headers();
  return (h.get('user-agent') ?? '').includes(MRBD_UA_TOKEN);
}
