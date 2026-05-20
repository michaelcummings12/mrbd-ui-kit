"use client";

import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";
import { use } from "react";
import { Button, Icon, Text } from "mrbd-ui-kit";

const DETAIL_CONTENT: Record<string, { title: string; description: string }> = {
	buttons: {
		title: "Buttons",
		description: "Ghost, primary, secondary and danger variants. All D-pad focusable via the MRBD focus engine."
	},
	navigation: {
		title: "Navigation",
		description: "NavigationBar anchored to the bottom. D-pad left/right moves between tabs. Use asChild to link tabs to routes."
	},
	typography: {
		title: "Typography",
		description: "The <Text> component enforces minimum font weights and display-safe color tokens to stay legible on the additive lens."
	}
};

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const content = DETAIL_CONTENT[id] ?? {
		title: id,
		description: "No additional information available for this section."
	};

	return (
		<div className="flex h-full flex-col gap-6 p-2">
			{/* Back button */}
			<Button id="back" size="sm" variant="secondary" asChild>
				<NextLink href="/">
					<Icon icon={ArrowLeft} size={16} />
					Back
				</NextLink>
			</Button>

			{/* Detail content */}
			<div className="flex flex-col gap-3">
				<Text size="lg" weight="bold">
					{content.title}
				</Text>
				<Text size="sm" dim>
					{content.description}
				</Text>
			</div>
		</div>
	);
}
