import * as _ from "utils";
import cx from "classnames";

import { useCallback, useEffect, useState } from "react";
import useCSSTransition from "hooks/useCSSTransition";

import Portal from "containers/Portal";

const MARGIN = 8;

export default function ToolTip({
  originRef,
  direction = "vertical",
  maxWidth = Infinity,
  className,
  children,
}) {
  const [isVisible, setVisibility] = useState(false);
  const toolTipRef = useCSSTransition(isVisible, {
    timeout: 200,
    appear: true,
  });

  const setPosition = useCallback(() => {
    const rect = originRef.current?.getClientRects()[0];
    const toolTip = toolTipRef.current;

    if (rect && toolTip && typeof window !== "undefined") {
      const position = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };

      toolTip.style.maxWidth = `${Math.min(
        maxWidth,
        window.innerWidth - 2 * MARGIN
      )}px`;

      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const width = toolTip.offsetWidth;
      const height = toolTip.offsetHeight;

      const _direction =
        direction === "vertical"
          ? position.y < wHeight / 2
            ? "bottom"
            : "top"
          : direction === "horizontal"
          ? position.x < wWidth / 2
            ? "right"
            : "left"
          : direction;

      toolTip.style.left = `${
        _direction === "left"
          ? position.x - (width + MARGIN)
          : _direction === "right"
          ? position.x + MARGIN
          : _.between(MARGIN, wWidth - (width + MARGIN))(position.x - width / 2)
      }px`;
      toolTip.style.top = `${
        _direction === "bottom"
          ? position.y + MARGIN
          : _direction === "top"
          ? position.y - (height + MARGIN)
          : _.between(
              MARGIN,
              wHeight - (height + MARGIN)
            )(position.y - height / 2)
      }px`;
    }
  }, [originRef, direction, maxWidth, toolTipRef]);

  useEffect(() => {
    const origin = originRef.current;

    if (origin && typeof window !== "undefined") {
      const show = () => {
        setPosition();
        window.addEventListener("mousewheel", setPosition);
        window.addEventListener("mousemove", setPosition);
        setVisibility(true);
      };

      const hide = () => {
        window.removeEventListener("mousewheel", setPosition);
        window.removeEventListener("mousemove", setPosition);
        setVisibility(false);
      };

      origin.addEventListener("mouseenter", show);
      origin.addEventListener("mouseleave", hide);

      return () => {
        origin.removeEventListener("mouseenter", show);
        origin.removeEventListener("mouseleave", hide);
        window.removeEventListener("mousewheel", setPosition);
        window.removeEventListener("mousemove", setPosition);
      };
    }
  }, [originRef, setPosition]);

  return (
    <Portal>
      <span
        ref={toolTipRef}
        className={cx(
          "fixed pointer-events-none z-50 block py-2 px-4 rounded-md text-xs text-left bg-black shift-up",
          className
        )}
      >
        {children}
      </span>
    </Portal>
  );
}
