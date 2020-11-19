import React from "react";
import Icon from "../Icon";

export default ({ style, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d="M16 16a6 6 0 100-12 6 6 0 000 12zM4 28c0-5.638 2-7.5 5-8.5 2.5 2 4.638 2.5 7 2.5 2.386 0 4.5-.5 7-2.5 3 1 5 2.886 5 8.5H4z"
      fill={style === "filled" ? undefined : "none"}
    />
  </Icon>
);
