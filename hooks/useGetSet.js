import { useCallback, useRef } from "react";

export default function useGetSet(initialValue) {
  const ref = useRef(initialValue);
  const get = useCallback(() => ref.current, []);
  const set = useCallback((value) => {
    if (typeof value === "function") {
      ref.current = value(ref.current);
    } else {
      ref.current = value;
    }
    return ref.current;
  }, []);

  return [get, set];
}
