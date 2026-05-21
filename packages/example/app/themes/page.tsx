"use client";

import { Button, Text } from "mrbd-ui-kit";
import { useState } from "react";
import { PageHeader } from "../components/page-header";

const TINTS = [
	{ label: "Default", value: "#dbeafe" },
	{ label: "Teal", value: "#14b8a6" },
	{ label: "Rose", value: "#f43f5e" },
	{ label: "Amber", value: "#f59e0b" },
	{ label: "Violet", value: "#8b5cf6" },
	{ label: "Lime", value: "#84cc16" }
];

export default function ThemesPage() {
	const [activeTint, setActiveTint] = useState(TINTS[0].value);

	function applyTint(value: string) {
		setActiveTint(value);
		document.documentElement.style.setProperty("--color-mrbd-tint", value);
	}

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<PageHeader title="Themes" />

			<Text size="sm" dim>
				Select a color to preview the tint system
			</Text>

			{/* Color swatches */}
			<div className="grid grid-cols-3 gap-2">
				{TINTS.map((tint) => (
					<Button onClick={() => applyTint(tint.value)} id={`tint-color-${tint.label}`} className="w-full flex-col items-center justify-center gap-1">
						<div className="flex flex-row items-center gap-1.5">
							<div className="size-5 rounded-full border border-white/20" style={{ backgroundColor: tint.value }} />
						</div>
						<Text size="sm">{tint.label}</Text>
					</Button>
				))}
			</div>

			{/* Preview */}
			<div className="flex w-full flex-col gap-2">
				<Text size="sm" dim>
					Preview
				</Text>
				<div className="grid grid-cols-2 gap-4">
					<Button id="preview-primary" variant="primary" size="md" className="w-full">
						Primary
					</Button>
					<Button id="preview-secondary" variant="secondary" size="md" className="w-full">
						Secondary
					</Button>
				</div>
			</div>
		</div>
	);
}
