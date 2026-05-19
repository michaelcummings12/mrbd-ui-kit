import { DisplayRoot } from "mrbd-ui-kit";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Example App",
	description: "Example app built with mrbd-ui-kit for Meta Ray-Ban Display"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full bg-black">
			<body className="flex h-full items-center">
				<DisplayRoot>{children}</DisplayRoot>
			</body>
		</html>
	);
}
