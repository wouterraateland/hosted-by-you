import React from "react";
import Icon from "../Icon";

export default ({ direction, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d="M3 6h20m4 21l-5-14h-1l-5 14m2-5h7M18 6c0 3.333-4.333 9-13 17m3-13c.667 3.333 3 6.333 7 9M13 6V3"
      fill="none"
    />
  </Icon>
);
