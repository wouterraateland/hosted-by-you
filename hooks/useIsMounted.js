import { useCallback, useEffect, useRef } from "react";

export default function useIsMounted() {
  const mountedRef = useRef(true);
  useEffect(() => () => (mountedRef.current = false), []);
  return useCallback(() => mountedRef.current, []);
}
