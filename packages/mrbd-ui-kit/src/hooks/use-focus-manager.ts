import { useCallback, useEffect, useState } from "react";
import { useFocusContext } from "../components/display-root";
import type { SpatialDirection } from "../focus/engine";

export interface FocusManager {
	/** Move focus in a direction */
	move: (direction: SpatialDirection) => void;
	/** Focus a specific element by ID */
	focus: (id: string) => void;
	/** Currently focused element ID, or null */
	focusedId: string | null;
}

export function useFocusManager(): FocusManager {
	const { engine } = useFocusContext();
	const [focusedId, setFocusedId] = useState<string | null>(engine.getCurrentId());

	useEffect(() => {
		const unsubscribe = engine.subscribe((id) => {
			setFocusedId(id);
		});
		return unsubscribe;
	}, [engine]);

	const move = useCallback(
		(direction: SpatialDirection) => {
			engine.move(direction);
		},
		[engine]
	);

	const focus = useCallback(
		(id: string) => {
			engine.focusById(id);
		},
		[engine]
	);

	return { move, focus, focusedId };
}
