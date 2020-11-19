import cx from "classnames";

export default function Card({ elevation = "sm", className, ...props }) {
  return (
    <div
      className={cx(
        "bg-white dark:bg-gray-900 dark:text-white rounded-xl",
        `shadow-${elevation}`,
        className
      )}
      {...props}
    />
  );
}
