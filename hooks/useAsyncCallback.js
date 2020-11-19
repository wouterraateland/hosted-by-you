import { useCallback, useState } from "react";

export default function useAsyncCallback(f, dependencies, delay = 300) {
  const [state, setState] = useState({ isPending: false, showPending: false });

  const callback = useCallback(
    async (...args) => {
      if (typeof f === "function") {
        setState({ isPending: true, showPending: false });
        const t = setTimeout(
          () => setState({ isPending: true, showPending: true }),
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
