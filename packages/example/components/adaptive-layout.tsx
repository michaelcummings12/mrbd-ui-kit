import { DisplayRoot } from "mrbd-ui-kit";
import { isMRBDServer } from "mrbd-ui-kit/next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { DesktopShell } from "./desktop-shell";

interface AdaptiveLayoutProps {
	children: ReactNode;
	readmeContent: string;
}

/**
 * Server component that decides the layout at request time:
 * - MRBD hardware → bare DisplayRoot
 * - Iframe embed (desktop preview) → bare DisplayRoot
 * - Desktop browser → full marketing shell with iframe preview
 *
 * Iframe detection uses the standard `Sec-Fetch-Dest` header that
 * browsers send automatically for iframe sub-resource requests.
 */
export async function AdaptiveLayout({ children, readmeContent }: AdaptiveLayoutProps) {
	const isMRBD = await isMRBDServer();
	const h = await headers();
	const isIframeEmbed = h.get("sec-fetch-dest") === "iframe";

	// MRBD hardware or embedded in the desktop iframe preview
	if (isMRBD || isIframeEmbed) {
		return <DisplayRoot>{children}</DisplayRoot>;
	}

	// Desktop browser — show the marketing shell (iframe preview is inside)
	return <DesktopShell readmeContent={readmeContent} />;
}
