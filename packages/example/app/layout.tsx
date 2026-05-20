import { DisplayRoot } from "mrbd-ui-kit";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-nunito"
});

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
		<html lang="en" className={`h-full bg-zinc-800 ${nunito.variable}`}>
			<body className="flex h-full items-center">
				<DisplayRoot>{children}</DisplayRoot>
			</body>
		</html>
	);
}
