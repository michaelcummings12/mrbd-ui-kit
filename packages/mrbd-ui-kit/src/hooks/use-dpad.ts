import { useCallback, useEffect, useRef, useState } from 'react';

export type DpadKey = 'up' | 'down' | 'left' | 'right' | 'select';

export interface DpadState {
  /** The key currently being held, or null */
  activeKey: DpadKey | null;
  /** Last key that was pressed (persists after release) */
  lastKey: DpadKey | null;
}

export interface UseDpadOptions {
  /** Called on any D-pad key press */
  onPress?: (key: DpadKey) => void;
  /** Called on key release */
  onRelease?: (key: DpadKey) => void;
  /** Disable the hook */
  disabled?: boolean;
}

const KEY_MAP: Record<string, DpadKey> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'select',
};

export function useDpad(options: UseDpadOptions = {}): DpadState {
  const { disabled = false } = options;
  const [state, setState] = useState<DpadState>({
    activeKey: null,
    lastKey: null,
  });

  // Use ref for callbacks to avoid re-attaching listeners on every render
  const callbacksRef = useRef(options);
  callbacksRef.current = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const dpadKey = KEY_MAP[e.key];
      if (!dpadKey) return;

      e.preventDefault();
      setState((prev) => ({ activeKey: dpadKey, lastKey: dpadKey }));
      callbacksRef.current.onPress?.(dpadKey);
    },
    [],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const dpadKey = KEY_MAP[e.key];
      if (!dpadKey) return;

      setState((prev) => ({ ...prev, activeKey: null }));
      callbacksRef.current.onRelease?.(dpadKey);
    },
    [],
  );

  useEffect(() => {
    if (disabled) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [disabled, handleKeyDown, handleKeyUp]);

  return state;
}
