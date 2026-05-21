"use client";

import { Button, ScrollArea, ScrollBar, Text, useScroll } from "mrbd-ui-kit";
import { PageHeader } from "../../components/page-header";

const ITEMS = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

export default function ScrollPage() {
	// useScroll() is needed here only to power the live metrics panel below.
	// In a normal app, just use <ScrollContainer> and you don't need useScroll() at all.
	const scroll = useScroll();

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<PageHeader title="Scrolling" />

			<Text size="sm" dim>
				Use arrow keys to move between items. Scroll the list to see the fade gradients and scrollbar animate.
			</Text>

			<div className="flex min-h-0 flex-1 flex-row gap-2">
				<ScrollArea scrollRef={scroll.scrollRef} canScrollUp={scroll.canScrollUp} canScrollDown={scroll.canScrollDown}>
					<div className="flex flex-col gap-2">
						{ITEMS.map((item) => (
							<Button key={item} id={`scrollable-button-${item}`} className="w-full">
								<Text size="sm" weight="semibold">
									{item}
								</Text>
							</Button>
						))}
					</div>
				</ScrollArea>
				<ScrollBar scrollHeight={scroll.scrollHeight} clientHeight={scroll.clientHeight} scrollTop={scroll.scrollTop} isScrolling={scroll.isScrolling} />
			</div>

			{/* Live scroll metrics — demonstrates what useScroll() exposes */}
			<div className="bg-mrbd-surface flex flex-col gap-1 rounded-xl p-3">
				{[
					{ label: "scrollTop", value: `${Math.round(scroll.scrollTop)}px` },
					{ label: "canScrollDown", value: String(scroll.canScrollDown) },
					{ label: "isScrolling", value: String(scroll.isScrolling) }
				].map(({ label, value }) => (
					<div key={label} className="flex flex-row justify-between">
						<Text size="sm" dim>
							{label}
						</Text>
						<Text size="sm" weight="semibold">
							{value}
						</Text>
					</div>
				))}
			</div>
		</div>
	);
}
