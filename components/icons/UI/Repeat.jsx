import React from "react";
import Icon from "../Icon";

export default ({ direction, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d="M24 12l4-4-4-4m4 4H9a2 2 0 00-2 2v7h0m-3 7h19a2 2 0 002-2v-7h0M8 28l-4-4 4-4"
      fill="none"
    />
  </Icon>
);
