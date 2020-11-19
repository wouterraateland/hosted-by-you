import React from "react";
import Icon from "../Icon";

export default ({ isLocked = false, ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d={
        isLocked
          ? "M21 15v-3a5 5 0 00-10 0v4m5 4v6m10-10H6v14h20V16z"
          : "M21 10V7a5 5 0 00-10 0v9m5 4v6m10-10H6v14h20V16z"
      }
      fill="none"
    />
  </Icon>
);
