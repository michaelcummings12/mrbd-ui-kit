"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

const MANAGERS = ["npm", "pnpm", "yarn"] as const;
type PackageManager = (typeof MANAGERS)[number];

const COMMANDS: Record<PackageManager, string> = {
	npm: "npm install mrbd-ui-kit",
	pnpm: "pnpm add mrbd-ui-kit",
	yarn: "yarn add mrbd-ui-kit"
};

/**
 * Install command switcher with npm/pnpm/yarn tabs and a copy button.
 */
export function InstallCommand() {
	const [manager, setManager] = useState<PackageManager>("npm");
	const [copied, setCopied] = useState(false);

	async function copy() {
		await navigator.clipboard.writeText(COMMANDS[manager]);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/8 bg-white/4">
			{/* Tabs */}
			<div className="flex border-b border-white/6">
				{MANAGERS.map((m) => (
					<button
						key={m}
						onClick={() => setManager(m)}
						className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
							m === manager ? "bg-white/8 text-zinc-50" : "text-zinc-500 hover:text-zinc-300"
						}`}>
						{m}
					</button>
				))}
			</div>

			{/* Command + copy */}
			<div className="flex items-center gap-2 px-4 py-2.5">
				<code className="flex-1 font-mono text-[0.8125rem] text-zinc-300">{COMMANDS[manager]}</code>
				<button
					onClick={copy}
					className="flex size-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/8 hover:text-zinc-200"
					aria-label="Copy to clipboard">
					{copied ? <Check className="size-3.5 text-green-400" /> : <Clipboard className="size-3.5" />}
				</button>
			</div>
		</div>
	);
}
