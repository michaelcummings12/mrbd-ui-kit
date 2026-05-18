import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MRBD Example App",
  description: "Example app built with mrbd-ui-kit for Meta Ray-Ban Display",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
