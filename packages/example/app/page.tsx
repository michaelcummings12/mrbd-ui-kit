"use client";

import { Eye, Link as LinkIcon, Paintbrush, Pointer, TextCursor } from "lucide-react";
import { Button, Icon, Pill, ScrollArea, ScrollBar, Text, useScroll } from "mrbd-ui-kit";
import Link from "next/link";

export default function HomeTab() {
	const scroll = useScroll();
	return (
		<div className="flex h-full flex-col gap-4">
			<Pill>
				<div className="flex h-full flex-row items-center justify-center gap-2">
					<div className="size-3 rounded-full bg-white" />
					<div className="size-3 rounded-full bg-white/50" />
					<div className="size-3 rounded-full bg-white/50" />
				</div>
			</Pill>
			<div className="flex flex-col items-center gap-2">
				<Text size="lg" weight="bold">
					mrbd-ui-kit
				</Text>
				<Text size="sm" dim>
					The easiest way to build an app for Meta Ray-Ban Display
				</Text>
			</div>
			<div className="flex min-h-0 flex-1 flex-row gap-2">
				<ScrollArea scrollRef={scroll.scrollRef} canScrollUp={scroll.canScrollUp} canScrollDown={scroll.canScrollDown}>
					<div className="flex flex-col gap-4">
						<Button id="buttons" className="w-full" size="lg" asChild>
							<Link href="/buttons">
								<div className="flex w-full flex-row items-center gap-4">
									<div className="flex size-14 items-center justify-center rounded-full bg-black/50">
										<Icon icon={Pointer} size={28} color="white" />
									</div>
									<div className="flex flex-col items-start">
										<Text weight="semibold">Buttons</Text>
									</div>
								</div>
							</Link>
						</Button>
						<Button id="focus" className="w-full" size="lg" asChild>
							<Link href="/focus">
								<div className="flex w-full flex-row items-center gap-4">
									<div className="flex size-14 items-center justify-center rounded-full bg-black/50">
										<Icon icon={Eye} size={28} color="white" />
									</div>
									<div className="flex flex-col items-start">
										<Text weight="semibold">Focus</Text>
									</div>
								</div>
							</Link>
						</Button>
						<Button id="navigation" className="w-full" size="lg" asChild>
							<Link href="/navigation">
								<div className="flex w-full flex-row items-center gap-4">
									<div className="flex size-14 items-center justify-center rounded-full bg-black/50">
										<Icon icon={LinkIcon} size={28} color="white" />
									</div>
									<div className="flex flex-col items-start">
										<Text weight="semibold">Navigation</Text>
									</div>
								</div>
							</Link>
						</Button>
						<Button id="typography" className="w-full" size="lg" asChild>
							<Link href="/typography">
								<div className="flex w-full flex-row items-center gap-4">
									<div className="flex size-14 items-center justify-center rounded-full bg-black/50">
										<Icon icon={TextCursor} size={28} color="white" />
									</div>
									<div className="flex flex-col items-start">
										<Text weight="semibold">Typography</Text>
									</div>
								</div>
							</Link>
						</Button>
						<Button id="themes" className="w-full" size="lg" asChild>
							<Link href="/themes">
								<div className="flex w-full flex-row items-center gap-4">
									<div className="flex size-14 items-center justify-center rounded-full bg-black/50">
										<Icon icon={Paintbrush} size={28} color="white" />
									</div>
									<div className="flex flex-col items-start">
										<Text weight="semibold">Themes</Text>
									</div>
								</div>
							</Link>
						</Button>
					</div>
				</ScrollArea>
				<ScrollBar scrollHeight={scroll.scrollHeight} clientHeight={scroll.clientHeight} scrollTop={scroll.scrollTop} />
			</div>
		</div>
	);
}
