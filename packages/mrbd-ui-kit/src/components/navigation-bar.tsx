import type { ElementType } from "react";
import { Focusable } from "./focusable";
import { Icon } from "./icon";
import { Text } from "./text";

export interface NavItem {
	id: string;
	label: string;
	icon: ElementType;
}

export interface NavigationBarProps {
	items: NavItem[];
	/** Currently active item ID */
	activeId: string;
	/** Called when a tab is selected via D-pad */
	onSelect: (id: string) => void;
	className?: string;
}

export function NavigationBar({ items, activeId, onSelect, className }: NavigationBarProps) {
	return (
		<nav
			className={`bg-mrbd-surface absolute right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t border-white/5 ${className ?? ""}`.trim()}>
			{items.map((item) => {
				const isActive = item.id === activeId;

				return (
					<Focusable key={item.id} id={item.id} group="mrbd-nav" onSelect={() => onSelect(item.id)}>
						<div className="relative flex flex-col items-center justify-center gap-1 px-3 py-2">
							<Icon icon={item.icon} size={20} color={isActive ? "var(--color-mrbd-accent)" : "var(--color-mrbd-text-dim)"} />
							<Text size="xs" weight="semibold" dim={!isActive}>
								{item.label}
							</Text>
							{/* Active indicator — accent underline */}
							{isActive && <div className="bg-mrbd-accent absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full" />}
						</div>
					</Focusable>
				);
			})}
		</nav>
	);
}
