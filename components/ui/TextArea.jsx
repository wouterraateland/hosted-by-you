import cx from "classnames";

import React, { forwardRef, useLayoutEffect, useRef } from "react";

import BaseInput from "./BaseInput";

const TextAreaImpl = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cx("input resize-none", className)}
    {...props}
  />
));

const refreshEl = (el) => el.offsetHeight;

export default forwardRef(function TextArea(props, ref) {
  const textAreaRef = useRef(null);
  useLayoutEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      const fontSize = parseFloat(
        window.getComputedStyle(textArea, null).getPropertyValue("font-size")
      );

      refreshEl(textArea);
      textArea.style.height = `${Math.max(
        (props.rows || 1) * fontSize,
        textArea.scrollHeight
      )}px`;
    }
  }, [ref, props.rows, props.value]);

  return (
    <BaseInput
      ref={(c) => {
        textAreaRef.current = c;
        if (ref) {
          ref.current = c;
        }
      }}
      component={TextAreaImpl}
      {...props}
    />
  );
});
