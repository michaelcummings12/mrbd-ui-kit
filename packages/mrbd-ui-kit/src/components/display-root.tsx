import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { createFocusEngine, type DpadDirection, type FocusEngine, type FocusEngineOptions } from "../focus/engine";
import { cn } from "../lib/cn";

export interface DisplayRootProps {
	children: ReactNode;
	className?: string;
	/** Focus engine configuration */
	focusOptions?: FocusEngineOptions;
	/** Called when D-pad select (Enter) is pressed on a focused element */
	onSelect?: (focusedId: string) => void;
}

interface FocusContextValue {
	engine: FocusEngine;
}

const FocusContext = createContext<FocusContextValue | null>(null);

export function useFocusContext(): FocusContextValue {
	const ctx = useContext(FocusContext);
	if (!ctx) {
		throw new Error("useFocusContext must be used within a <DisplayRoot>. " + "Wrap your MRBD app in <DisplayRoot> to enable focus management.");
	}
	return ctx;
}

const ARROW_TO_DIRECTION: Record<string, DpadDirection> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right"
};

export function DisplayRoot({ children, className, focusOptions, onSelect }: DisplayRootProps) {
	const engineRef = useRef<FocusEngine | null>(null);

	// Create engine once, stable across re-renders
	if (!engineRef.current) {
		engineRef.current = createFocusEngine(focusOptions);
	}

	const rootRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const engine = engineRef.current;
			if (!engine) return;

			const direction = ARROW_TO_DIRECTION[e.key];
			if (direction) {
				e.preventDefault();
				engine.move(direction);
				return;
			}

			if (e.key === "Enter") {
				e.preventDefault();
				const focusedId = engine.getCurrentId();
				if (focusedId && onSelect) {
					onSelect(focusedId);
				}
			}
		},
		[onSelect]
	);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		root.addEventListener("keydown", handleKeyDown);
		return () => {
			root.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	// Cleanup engine on unmount
	useEffect(() => {
		return () => {
			engineRef.current?.destroy();
		};
	}, []);

	const contextValue: FocusContextValue = { engine: engineRef.current };

	return (
		<FocusContext.Provider value={contextValue}>
			<div ref={rootRef} className={cn("relative m-auto size-150 overflow-hidden bg-black p-2", className)} tabIndex={-1}>
				{children}
			</div>
		</FocusContext.Provider>
	);
}
