import { defineConfig } from "tsup";

export default defineConfig([
	// Client-side bundle (components + hooks)
	{
		entry: {
			index: "src/index.ts"
		},
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: true,
		external: ["react", "react-dom", "next", "next/headers"],
		banner: {
			js: "'use client';"
		}
	},
	// Server-side bundles (no 'use client' banner)
	{
		entry: {
			"server/is-mrbd": "src/server/is-mrbd.ts",
			"next/is-mrbd": "src/next/is-mrbd.ts"
		},
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: false, // Don't clean — first config already did
		external: ["react", "react-dom", "next", "next/headers"]
	}
]);
