import React from "react";
import Icon from "../Icon";

export default ({ state = "open", ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d={
        state === "open"
          ? "M2 16c5.333-5.333 10-8 14-8s8.667 2.667 14 8c-5.333 5.333-10 8-14 8s-8.667-2.667-14-8zm14 3a5 5 0 100-10 5 5 0 000 10z"
          : "M2 16c5.333 2.667 10 4 14 4s8.667-1.333 14-4m-14 4v6.5m-8-8L5.5 25M24 18.5l2.5 6.5"
      }
      fill="none"
    />
  </Icon>
);
