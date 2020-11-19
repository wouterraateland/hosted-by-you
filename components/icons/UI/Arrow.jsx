import React from "react";
import Icon from "../Icon";

const getTransform = direction => {
  switch (direction) {
    case "left":
      return `rotate(180deg)`;
    case "up":
      return `rotate(-90deg)`;
    case "down":
      return `rotate(90deg)`;
    default:
      return null;
  }
};

export default ({ direction, ...props }) => (
  <Icon
    viewBox="0 0 32 32"
    style={{ transform: getTransform(direction) }}
    {...props}
  >
    <path d="M4 16h24M16 4l12 12-12 12" fill="none" />
  </Icon>
);
