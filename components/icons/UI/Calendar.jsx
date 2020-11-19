import React from "react";
import Icon from "../Icon";

export default ({ direction, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path d="M4 6h24v22H4V6zm5 11h3v2H9v-2zm-5-5h24M9 6V2m14 4V2" fill="none" />
  </Icon>
);
