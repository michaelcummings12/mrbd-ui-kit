"use client";

import { ArrowLeft } from "lucide-react";
import { Button, Icon, Text } from "mrbd-ui-kit";
import Link from "next/link";

interface PageHeaderProps {
	title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
	return (
		<div className="flex flex-row items-center gap-3">
			<Button id="back" size="sm" variant="secondary" asChild>
				<Link href="/">
					<Icon icon={ArrowLeft} size={16} />
				</Link>
			</Button>
			<Text size="lg" weight="bold">
				{title}
			</Text>
		</div>
	);
}
