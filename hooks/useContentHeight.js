import { useEffect, useRef } from "react";

export default function useContentHeight(calc) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      const { top, bottom } = Array.from(container.children).reduce(
        ({ top, bottom }, child) => ({
          top: Math.min(top, child.offsetTop),
          bottom: Math.max(bottom, child.offsetTop + child.offsetHeight),
        }),
        { top: Infinity, bottom: -Infinity }
      );

      container.style.height = `${calc(bottom - top)}px`;
    }
  });

  return ref;
}
