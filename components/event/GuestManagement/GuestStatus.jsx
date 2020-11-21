import cx from "classnames";

function statusToColor(status) {
  switch (status) {
    case "registered":
      return "green";
    case "canceled":
      return "gray";
    case "rejected":
      return "red";
    case "interested":
      return "blue";
    case "awaiting approval":
      return "purple";
    default:
      return "gray";
  }
}

export default function GuestStatus({ status = "registered" }) {
  const color = statusToColor(status);
  return (
    <span
      className={cx(
        "inline-block rounded-full px-2",
        `bg-${color}-100 text-${color}-700`
      )}
    >
      {status}
    </span>
  );
}
