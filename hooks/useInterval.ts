import { useEffect, useRef } from 'react';

// A declarative setInterval hook for React.
export function useInterval<T extends Function>(callback: T, delay: number | null) {
  // FIX: The useRef hook requires an initial value. The call `useRef<T>()` is invalid.
  const savedCallback = useRef<T | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
