import type { Metadata } from "next";
import "./globals.css";
import { DisplayRoot } from "mrbd-ui-kit";

export const metadata: Metadata = {
  title: "Example App",
  description: "Example app built with mrbd-ui-kit for Meta Ray-Ban Display",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black h-full">
      <body className="h-full flex items-center">
        <DisplayRoot>{children}</DisplayRoot>
      </body>
    </html>
  );
}
