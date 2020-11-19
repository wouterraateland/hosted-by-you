import uuid from "uuid/v4";

import useLocallyStoredState from "./useLocallyStoredState";

export default function useDeviceToken() {
  return useLocallyStoredState("___deviceToken___", uuid(), {
    parse: (x) => x,
    stringify: (x) => x,
  });
}
