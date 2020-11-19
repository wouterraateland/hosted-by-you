import { useEffect, useState } from "react";

export default function useUpstreamState(upstreamState) {
  const [state, setState] = useState(upstreamState);
  useEffect(() => setState(upstreamState), [upstreamState]);

  return [state, setState];
}
