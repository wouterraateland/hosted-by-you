import { useCallback, useLayoutEffect, useRef } from "react";

export default function useIsMounted() {
  const mountedRef = useRef(true);
  useLayoutEffect(() => () => (mountedRef.current = false), []);
  return useCallback(() => mountedRef.current, []);
}
