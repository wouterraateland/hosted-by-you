import { between } from "utils/math";
import cx from "classnames";

import { forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import useClickOutside from "hooks/useClickOutside";
import useCSSTransition from "hooks/useCSSTransition";
import useUpstreamState from "hooks/useUpstreamState";

import Modal from "containers/Modal";

const MARGIN = 8;

const toRect = (el) => {
  const rect = el?.getBoundingClientRect();

  return rect
    ? {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        centerX: rect.x + rect.width / 2,
        centerY: rect.y + rect.height / 2,
      }
    : {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        centerX: 0,
        centerY: 0,
      };
};

export default forwardRef(function FlyOut(
  {
    direction = "vertical",
    persistOnClick,
    originRef,
    isOpen,
    onClose,
    children,
    className,
    disabled,
    ...props
  },
  ref
) {
  const [isVisible, setVisibility] = useUpstreamState(isOpen || false);
  const containerRef = useCSSTransition(isVisible, {
    timeout: 200,
    appear: true,
    ref,
  });
  const itemsRef = useRef(null);

  const render = useCallback(() => {
    const origin = originRef?.current;
    const originRect = toRect(origin);
    const container = containerRef.current;
    const items = itemsRef.current;

    if (
      origin &&
      originRect &&
      container &&
      items &&
      typeof window !== "undefined"
    ) {
      container.style.minWidth = `${origin.offsetWidth}px`;
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const _direction =
        direction === "vertical"
          ? originRect.centerY < wHeight / 2
            ? "bottom"
            : "top"
          : direction === "horizontal"
          ? originRect.centerX < wWidth / 2
            ? "right"
            : "left"
          : direction;

      const cTop =
        _direction === "bottom"
          ? originRect.bottom + MARGIN
          : _direction === "top"
          ? Math.max(MARGIN, originRect.top - (height + MARGIN))
          : between(
              MARGIN,
              wHeight - (height + MARGIN)
            )(originRect.centerY - height / 2);
      const cLeft =
        _direction === "left"
          ? Math.max(MARGIN, originRect.left - (width + MARGIN))
          : _direction === "right"
          ? originRect.right + MARGIN
          : between(
              MARGIN,
              wWidth - (width + MARGIN)
            )(originRect.centerX - width / 2);

      const transformOrigin = {
        top:
          (_direction === "top"
            ? originRect.top
            : _direction === "bottom"
            ? originRect.bottom
            : originRect.centerY) - cTop,
        left:
          (_direction === "left"
            ? originRect.left
            : _direction === "right"
            ? originRect.right
            : originRect.centerX) - cLeft,
      };

      container.style.maxWidth = `${wWidth - 16}px`;
      container.style.top = `${cTop}px`;
      container.style.left = `${cLeft}px`;
      container.style.transformOrigin = `${transformOrigin.left}px ${transformOrigin.top}px`;

      items.style.maxHeight = `${
        (_direction === "top"
          ? originRect.top
          : _direction === "bottom"
          ? wHeight - originRect.bottom
          : wHeight) -
        MARGIN * 2
      }px`;
    }
  }, [originRef, containerRef, direction]);

  useLayoutEffect(() => {
    const show = () => setVisibility(true);

    const origin = originRef?.current;

    if (origin && typeof window !== "undefined") {
      !onClose && origin.addEventListener("click", show);
      window.addEventListener("mousewheel", render);
      window.addEventListener("resize", render);

      return () => {
        !onClose && origin.removeEventListener("click", show);
        window.removeEventListener("mousewheel", render);
        window.removeEventListener("resize", render);
      };
    }
  }, [render, onClose, originRef, setVisibility]);

  useLayoutEffect(() => {
    if (isVisible) {
      render();
    }
  }, [isVisible, children, render]);

  const close = (event) => {
    event && event.stopPropagation();
    onClose ? onClose() : setVisibility(false);
  };

  useClickOutside(
    containerRef,
    isOpen ? onClose || (() => setVisibility(false)) : () => {}
  );

  return (
    <Modal isOpen={isVisible && !disabled} onClose={close}>
      <div
        ref={containerRef}
        {...props}
        className={cx(
          "fixed rounded-md shadow-md bg-white",
          isVisible ? "opacity-100" : "opacity-0",
          className
        )}
      >
        <div
          className="py-2 overflow-y-auto"
          ref={itemsRef}
          onClick={persistOnClick ? (event) => event.stopPropagation() : close}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
});
