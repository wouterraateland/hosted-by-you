import React from "react";
import Icon from "../Icon";

export default ({ direction = "vertical", ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      d={
        direction === "vertical"
          ? "M16 8a2 2 0 100-4 2 2 0 000 4zm0 20a2 2 0 100-4 2 2 0 000 4zm0-10a2 2 0 100-4 2 2 0 000 4z"
          : "M6 18a2 2 0 100-4 2 2 0 000 4zm20 0a2 2 0 100-4 2 2 0 000 4zm-10 0a2 2 0 100-4 2 2 0 000 4z"
      }
      fill="none"
    />
  </Icon>
);
