"use client";

import { Button, Text } from "mrbd-ui-kit";
import { useState } from "react";
import { PageHeader } from "../../components/page-header";

export default function FocusPage() {
	const [lastFocused, setLastFocused] = useState<string | null>(null);
	const [lastSelected, setLastSelected] = useState<string | null>(null);

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<PageHeader title="Focus & Navigation" />

			<Text size="sm" dim>
				Explore the focusable grid below
			</Text>

			{/* Focusable grid */}
			<div className="grid grid-cols-3 gap-3">
				{Array.from({ length: 6 }, (_, i) => {
					const id = `item-${i + 1}`;
					return (
						<Button key={id} id={id} className="w-full" onFocus={() => setLastFocused(id)} onSelect={() => setLastSelected(id)}>
							<Text size="sm" weight="semibold">
								{i + 1}
							</Text>
						</Button>
					);
				})}
			</div>

			{/* Status */}
			<div className="bg-mrbd-surface mt-auto rounded-xl p-3">
				<div className="flex flex-row justify-between">
					<Text size="sm" dim>
						Focused
					</Text>
					<Text size="sm" weight="semibold">
						{lastFocused ?? "—"}
					</Text>
				</div>
				<div className="flex flex-row justify-between">
					<Text size="sm" dim>
						Selected
					</Text>
					<Text size="sm" weight="semibold">
						{lastSelected ?? "—"}
					</Text>
				</div>
			</div>
		</div>
	);
}
