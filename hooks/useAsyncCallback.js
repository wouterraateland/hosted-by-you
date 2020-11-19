import { useCallback, useState } from "react";
import useIsMounted from "hooks/useIsMounted";

export default function useAsyncCallback(f, dependencies, delay = 300) {
  const [state, setState] = useState({ isPending: false, showPending: false });
  const isMounted = useIsMounted();

  const callback = useCallback(
    async (...args) => {
      if (typeof f === "function") {
        setState({ isPending: true, showPending: false });
        const t = setTimeout(
          () => isMounted() && setState({ isPending: true, showPending: true }),
          delay
        );
        await f(...args);
        clearTimeout(t);
        setState({ isPending: false, showPending: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  return [state, callback];
}
