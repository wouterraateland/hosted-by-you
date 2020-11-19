import cx from "classnames";

import React from "react";
import Icon from "./Icon";

const Bunq = ({ className, ...props }) => (
  <Icon
    viewBox="0 0 120 120"
    className={cx("rounded-md", className)}
    {...props}
  >
    <path fill="#238647" d="M0 0h20v120H0z" />
    <path fill="#2f9b47" d="M10 0h20v120H10z" />
    <path fill="#62b64f" d="M20 0h20v120H20z" />
    <path fill="#89cc53" d="M30 0h20v120H30z" />
    <path fill="#3db8ad" d="M40 0h20v120H40z" />
    <path fill="#3394d7" d="M50 0h20v120H50z" />
    <path fill="#2872bc" d="M60 0h20v120H60z" />
    <path fill="#1d5c84" d="M70 0h20v120H70z" />
    <path fill="#993233" d="M80 0h20v120H80z" />
    <path fill="#e13030" d="M90 0h20v120H90z" />
    <path fill="#f28825" d="M100 0h20v120h-20z" />
    <path fill="#f5c836" d="M110 0h10v120h-10z" />
  </Icon>
);

export default Bunq;
