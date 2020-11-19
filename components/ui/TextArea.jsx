import cx from "classnames";

import { forwardRef, useLayoutEffect, useRef } from "react";

const refreshEl = (el) => el.offsetHeight;

export default forwardRef(function TextArea(
  { className, rows, ...props },
  ref
) {
  const textAreaRef = useRef(null);
  useLayoutEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      const fontSize = parseFloat(
        window.getComputedStyle(textArea, null).getPropertyValue("font-size")
      );

      refreshEl(textArea);
      textArea.style.height = `${
        Math.max((rows || 1) * fontSize, textArea.scrollHeight) + 1
      }px`;
    }
  }, [ref, rows, props.value]);

  return (
    <textarea
      ref={(c) => {
        textAreaRef.current = c;
        if (ref) {
          ref.current = c;
        }
      }}
      className={cx("resize-none", className)}
      {...props}
    />
  );
});
