import cx from "classnames";

export default function Icon({ className, ...props }) {
  return (
    <svg className={cx("flex-shrink-0 stroke-round", className)} {...props} />
  );
}
