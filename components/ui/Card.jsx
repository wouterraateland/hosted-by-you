import cx from "classnames";
import { forwardRef } from "react";

export default forwardRef(function Card(
  { elevation = "sm", className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        "bg-white dark:bg-gray-900 dark:text-white rounded-xl",
        `shadow-${elevation}`,
        className
      )}
      {...props}
    />
  );
});
