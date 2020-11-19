import { storageResourceCache } from "resources";

import useResource from "./useResource";
import { useMemo } from "react";

export default function useLocallyStoredState(key, initialValue, options) {
  const resource = useMemo(
    () => storageResourceCache.get({ key, initialValue, options }),
    [key, initialValue, options]
  );
  const state = useResource(resource);
  const setState = (v) => resource.setState(v);

  return [state, setState];
}
