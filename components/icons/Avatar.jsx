import React from "react";

import Icon from "./Icon";

export default function Avatar(props) {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <path
        d="M24 33c9 0 14 1 19 6v9H5v-9c5-5 10-6 19-6zm0-23c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"
        stroke="none"
      />
    </Icon>
  );
}
