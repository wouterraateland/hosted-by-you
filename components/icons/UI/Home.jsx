import React from "react";
import Icon from "../Icon";

export default ({ style, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d="M10 27H3V15L15 3l12 12v12h-7v-5a5 5 0 00-10 0v5z"
      fill={style === "filled" ? undefined : "none"}
    />
  </Icon>
);
