import cx from "classnames";

import { useContext } from "react";
import { EventContext } from "contexts";
import Button from "components/ui/Button";

export default function SubmitEvent({ saved, touched }) {
  const [event] = useContext(EventContext);

  const missingData = [
    !event.title ? "Event title is required" : null,
    !event.host ? "Event host is required" : null,
  ].filter(Boolean);

  const disabled = saved || missingData.length > 0;

  return (
    <div className="space-y-4">
      <Button
        className={cx(
          "w-full px-8 py-4 rounded-md border font-bold text-white",
          disabled
            ? "bg-blue-300 border-blue-400 cursor-default"
            : "bg-blue-600 hover:bg-blue-700 border border-blue-900"
        )}
        disabled={disabled}
      >
        {saved ? "Save successful!" : "Save your event"}
      </Button>
      {missingData.length > 0 ? (
        <p className="text-sm text-red-500 text-center">
          {missingData.join(" • ")}
        </p>
      ) : (
        touched &&
        event.id && (
          <p className="text-sm text-yellow-500 text-center">
            Event has changed. Save to publish.
          </p>
        )
      )}
    </div>
  );
}
