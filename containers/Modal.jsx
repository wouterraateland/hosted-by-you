import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, isOpen, onClose }) {
  const [container, setContainer] = useState(null);

  useLayoutEffect(() => {
    if (!container) {
      const container = document.createElement("div");
      container.className = "fixed inset-0 z-50";
      setContainer(container);
    }
  }, [container]);

  useLayoutEffect(() => {
    if (container && typeof onClose === "function") {
      const tryClose = (event) => {
        if (event.target === event.currentTarget) {
          onClose(event);
        }
      };
      container.addEventListener("click", tryClose);
      return () => {
        container.removeEventListener("click", tryClose);
      };
    }
  }, [container, onClose]);

  useLayoutEffect(() => {
    if (container) {
      if (isOpen) {
        document.body.appendChild(container);
      }
      container.classList.toggle("pointer-events-none", !isOpen);
    }
  }, [container, isOpen]);

  useLayoutEffect(() => {
    if (container) {
      return () => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };
    }
  }, [container]);

  return container ? createPortal(children, container) : null;
}
