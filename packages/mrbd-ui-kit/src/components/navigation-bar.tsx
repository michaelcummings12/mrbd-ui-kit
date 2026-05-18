import { Focusable } from './focusable';
import { Icon, type BuiltInIcon } from './icon';
import { Text } from './text';

export interface NavItem {
  id: string;
  label: string;
  icon: BuiltInIcon;
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
      className={`absolute bottom-0 left-0 right-0 flex items-center justify-around bg-mrbd-surface border-t border-white/5 h-16 ${className ?? ''}`.trim()}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Focusable
            key={item.id}
            id={item.id}
            group="mrbd-nav"
            onSelect={() => onSelect(item.id)}
          >
            <div className="flex flex-col items-center justify-center gap-1 px-3 py-2 relative">
              <Icon
                name={item.icon}
                size={20}
                color={isActive ? 'var(--color-mrbd-accent)' : 'var(--color-mrbd-text-dim)'}
              />
              <Text size="xs" weight="semibold" dim={!isActive}>
                {item.label}
              </Text>
              {/* Active indicator — accent underline */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-mrbd-accent rounded-full" />
              )}
            </div>
          </Focusable>
        );
      })}
    </nav>
  );
}
