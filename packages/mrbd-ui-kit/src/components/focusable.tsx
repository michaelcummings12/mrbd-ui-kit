import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { useFocusContext } from "./display-root";

export interface FocusableProps {
	children: ReactNode;
	/** Unique ID for focus engine registration. Required. */
	id: string;
	/** Focus group for scoped navigation */
	group?: string;
	/** Called when this element receives focus */
	onFocus?: () => void;
	/** Called when this element loses focus */
	onBlur?: () => void;
	/** Called when select (Enter) is pressed while focused */
	onSelect?: () => void;
	/** @default false */
	disabled?: boolean;
	className?: string;
}

export function Focusable({ children, id, group, onFocus, onBlur, onSelect, disabled = false, className }: FocusableProps) {
	const { engine } = useFocusContext();
	const elementRef = useRef<HTMLDivElement>(null);
	const callbacksRef = useRef({ onFocus, onBlur, onSelect });

	// Keep callbacks ref current without re-subscribing
	callbacksRef.current = { onFocus, onBlur, onSelect };

	// Register/unregister with focus engine
	useEffect(() => {
		if (disabled || !elementRef.current) return;

		engine.register({ id, element: elementRef.current, group });
		return () => {
			engine.unregister(id);
		};
	}, [engine, id, group, disabled]);

	// Subscribe to focus changes for callbacks
	useEffect(() => {
		if (disabled) return;

		let wasFocused = false;

		const unsubscribe = engine.subscribe((focusedId) => {
			const isFocused = focusedId === id;
			if (isFocused && !wasFocused) {
				callbacksRef.current.onFocus?.();
			}
			if (!isFocused && wasFocused) {
				callbacksRef.current.onBlur?.();
			}
			wasFocused = isFocused;
		});

		return unsubscribe;
	}, [engine, id, disabled]);

	// Handle Enter key for onSelect
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !disabled) {
				e.preventDefault();
				e.stopPropagation();
				callbacksRef.current.onSelect?.();
				// Click the first child element (or the wrapper itself as fallback).
				const target = (elementRef.current?.firstElementChild ?? elementRef.current) as HTMLElement | null;
				target?.click();
			}
		},
		[disabled]
	);

	return (
		<div
			ref={elementRef}
			id={id}
			tabIndex={disabled ? -1 : 0}
			className={cn("focus:outline-none focus-visible:outline-none", className)}
			onKeyDown={handleKeyDown}
			aria-disabled={disabled || undefined}>
			{children}
		</div>
	);
}
