import cx from "classnames";

import React, { forwardRef } from "react";

export default forwardRef(function BaseInput(
  {
    component: Component,
    prefix,
    suffix,
    lead,
    trail,
    label,
    size = "md",
    variant = "bare",
    className,
    ...props
  },
  ref
) {
  return (
    <div
      className={cx(
        "input__container",
        { "input__container--disabled": props.disabled },
        `input__container--${size}`,
        `input__container--${variant}`,
        className
      )}
    >
      {label && (
        <div className="flex items-center space-x-1">
          {lead}
          <p className="input__label text-xs">
            {label}{" "}
            {!props.disabled && props.required && (
              <sup className="input__asterix">*</sup>
            )}
          </p>
          {trail}
        </div>
      )}
      <div
        className={cx("input__inner space-x-2 items-center", {
          "input__inner--filled": props.value,
        })}
      >
        {!label && lead} {prefix}{" "}
        {Component ? (
          <Component ref={ref} {...props} />
        ) : (
          <input ref={ref} className="input" {...props} />
        )}{" "}
        {suffix} {!label && trail}
      </div>
    </div>
  );
});
