import "./Toggle.scss";
import cx from "classnames";

import React from "react";

const Toggle = ({ className, ...props }) => (
  <div
    className={cx(
      "toggle__container",
      { "toggle__container--checked": props.checked },
      { "toggle__container--disabled": props.disabled },
      className
    )}
  >
    <input className="toggle__input" {...props} />
  </div>
);

export default Toggle;
