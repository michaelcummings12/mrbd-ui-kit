"use client";

import { Button, Card, Text } from "mrbd-ui-kit";
import { useState } from "react";
import { PageHeader } from "../../components/page-header";

export default function FocusPage() {
	const [lastFocused, setLastFocused] = useState<string | null>(null);
	const [lastSelected, setLastSelected] = useState<string | null>(null);

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<PageHeader title="Focus & Navigation" />

			<Text size="sm" className="text-gray-400">
				Explore the focusable grid below
			</Text>

			{/* Focusable grid */}
			<div className="grid grid-cols-3 gap-3">
				{Array.from({ length: 9 }, (_, i) => {
					const id = `item-${i + 1}`;
					return (
						<Button key={id} id={id} variant="secondary" className="w-full" onFocus={() => setLastFocused(id)} onSelect={() => setLastSelected(id)}>
							<Text size="sm" weight="semibold">
								{i + 1}
							</Text>
						</Button>
					);
				})}
			</div>

			{/* Status */}
			<Card className="mt-auto">
				<div className="flex flex-row justify-between">
					<Text size="sm" className="text-gray-400">
						Focused
					</Text>
					<Text size="sm" weight="semibold">
						{lastFocused ?? "—"}
					</Text>
				</div>
				<div className="flex flex-row justify-between">
					<Text size="sm" className="text-gray-400">
						Selected
					</Text>
					<Text size="sm" weight="semibold">
						{lastSelected ?? "—"}
					</Text>
				</div>
			</Card>
		</div>
	);
}
