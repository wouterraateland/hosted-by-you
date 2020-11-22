import cx from "classnames";

import { useContext, useEffect, useRef, useState } from "react";
import { EventContext, StylingContext } from "contexts";

import Card from "components/ui/Card";

import EventInfo from "./Info";
import RegistrationForm from "./RegistrationForm";

export default function EventEmbed({ readOnly, maxHeight }) {
  const [event] = useContext(EventContext);
  const [{ layout, colorMode }] = useContext(StylingContext);
  const [actualLayout, setActualLayout] = useState(
    layout === "automatic" ? null : layout
  );
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (container && content) {
      let t = null;
      const resetLayout = () => {
        const actualMaxHeight =
          window === window.parent
            ? window.innerHeight
            : maxHeight >= 100
            ? maxHeight
            : Infinity;
        setActualLayout(
          layout === "automatic"
            ? container.offsetWidth > 640
              ? "horizontal"
              : actualMaxHeight <
                content.offsetHeight + (container.offsetWidth * 2) / 3
              ? "small"
              : "vertical"
            : layout === "vertical"
            ? actualMaxHeight <
              content.offsetHeight + (container.offsetWidth * 2) / 3
              ? "small"
              : layout
            : layout
        );
        clearTimeout(t);
        t = setTimeout(() => {
          window.parent.postMessage(
            JSON.stringify({
              src: window.location.toString(),
              context: "iframe.resize",
              height: Math.min(actualMaxHeight, container.offsetHeight),
            }),
            "*"
          );
        });
      };

      resetLayout();
      const resizeObserver = new ResizeObserver(resetLayout);
      resizeObserver.observe(container);
      window.addEventListener("resize", resetLayout);
      return () => {
        resizeObserver.unobserve(container);
        return window.removeEventListener("resize", resetLayout);
      };
    }
  }, [layout, maxHeight]);

  return (
    <div className={cx({ dark: colorMode === "dark" })}>
      <Card
        ref={containerRef}
        elevation=""
        className={cx(
          { "pointer-events-none": readOnly },
          { "opacity-0": !actualLayout },
          { flex: actualLayout === "horizontal" },
          "border relative mx-auto w-full min-w-0 flex-grow overflow-hidden"
        )}
      >
        {event.image && actualLayout !== "small" && (
          <div
            className={cx(
              "relative",
              actualLayout === "horizontal" ? "pr-64" : "w-full pb-2/3"
            )}
          >
            <img
              className="absolute w-full h-full object-cover shadow-sm bg-gray-200"
              src={event.image}
              alt={event.title}
            />
          </div>
        )}
        <div ref={contentRef} className="w-full">
          <EventInfo event={event} embedded />
          <RegistrationForm event={event} />
        </div>
      </Card>
    </div>
  );
}
