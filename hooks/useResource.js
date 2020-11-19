import { useEffect, useState } from "react";

export default function useResource(resource) {
  const [, forceUpdate] = useState();

  useEffect(() => resource.subscribe({ onNext: forceUpdate }), [resource]);

  return resource.read();
}
