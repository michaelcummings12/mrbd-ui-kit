"use client";

import { Check, X } from "lucide-react";
import { Button, Icon, LoadingIndicator, Text } from "mrbd-ui-kit";

export default function HomeTab() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Text size="lg" weight="bold">
					mrbd-ui-kit
				</Text>
				<Text size="xs" dim>
					The easiest way to build an app for Meta Ray-Ban Display
				</Text>
			</div>
			<Button id={"card"} className="w-full">
				<div className="flex flex-row items-center gap-2">
					<div className="bg-mrbd-accent/20 flex h-8 w-8 items-center justify-center rounded-full">
						<Icon icon={Check} size={16} color="var(--color-mrbd-accent)" />
					</div>
					<div className="flex flex-col">
						<Text weight="semibold">New message from Alex</Text>
						<Text size="sm" dim>
							Hey, are you free for lunch?
						</Text>
					</div>
				</div>
			</Button>

			<div className="flex w-full flex-row gap-3">
				<Button id="accept-btn" variant="primary" icon={Check} className="w-full">
					Accept
				</Button>
				<Button id="decline-btn" variant="ghost" icon={X} className="w-full">
					Decline
				</Button>
			</div>

			<div className="flex flex-col items-center">
				<LoadingIndicator variant="spinner" size={24} />
			</div>
		</div>
	);
}
