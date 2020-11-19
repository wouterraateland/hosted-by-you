import { useCallback, useEffect, useRef } from "react";

export default function useIdle(fn, delay) {
  const touchedRef = useRef(false);

  useEffect(() => {
    if (touchedRef.current) {
      const t = setTimeout(fn, delay);
      return () => clearTimeout(t);
    }
  }, [fn, delay]);

  const touch = useCallback(() => {
    touchedRef.current = true;
  }, []);

  return touch;
}
