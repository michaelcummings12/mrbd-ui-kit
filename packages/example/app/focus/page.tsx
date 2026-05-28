"use client";

import { Button, Card, Text, usePreferredFocus } from "mrbd-ui-kit";
import { useState } from "react";
import { PageHeader } from "../../components/page-header";

export default function FocusPage() {
	const [selectedItem, setSelectedItem] = useState("item-5");
	const [lastFocused, setLastFocused] = useState<string | null>(null);

	// Focus the selected item on mount
	usePreferredFocus(selectedItem);

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<PageHeader title="Focus" />

			<Text size="sm" className="text-gray-400">
				Select an item — it becomes the preferred focus target
			</Text>

			{/* Focusable grid */}
			<div className="grid grid-cols-3 gap-3">
				{Array.from({ length: 9 }, (_, i) => {
					const id = `item-${i + 1}`;
					const isSelected = id === selectedItem;
					return (
						<Button
							key={id}
							id={id}
							variant={isSelected ? "primary" : "secondary"}
							className="w-full"
							onFocus={() => setLastFocused(id)}
							onSelect={() => setSelectedItem(id)}>
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
						Preferred
					</Text>
					<Text size="sm" weight="semibold" className="text-mrbd-accent">
						{selectedItem}
					</Text>
				</div>
			</Card>
		</div>
	);
}
