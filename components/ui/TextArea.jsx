import cx from "classnames";

import { forwardRef, useEffect, useRef } from "react";

const refreshEl = (el) => el.offsetHeight;

export default forwardRef(function Textarea(
  { className, rows, extraHeight, ...props },
  ref
) {
  const textAreaRef = useRef(null);
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      const fontSize = parseFloat(
        window.getComputedStyle(textArea, null).getPropertyValue("font-size")
      );

      refreshEl(textArea);
      textArea.style.height = `${
        Math.max((rows || 1) * fontSize, textArea.scrollHeight) + extraHeight
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
