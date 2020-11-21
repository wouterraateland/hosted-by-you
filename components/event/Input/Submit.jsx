import cx from "classnames";

import { useContext, useEffect, useState } from "react";
import { EventContext } from "contexts";
import Button from "components/ui/Button";

export default function SubmitEvent() {
  const [hasChanged, touch] = useState(null);
  const [event] = useContext(EventContext);

  useEffect(() => {
    touch((state) => (state === null ? false : true));
  }, [event]);

  const missingData = [
    !event.title ? "Event title is required" : null,
    !event.host ? "Event host is required" : null,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <Button
        className={cx(
          "w-full px-8 py-4 rounded-md border font-bold text-white",
          missingData.length > 0
            ? "bg-blue-300 border-blue-400 cursor-default"
            : "bg-blue-600 hover:bg-blue-700 border border-blue-900"
        )}
        disabled={missingData.length > 0}
      >
        Save your event
      </Button>
      {missingData.length > 0 ? (
        <p className="text-sm text-red-500 text-center">
          {missingData.join(" • ")}
        </p>
      ) : (
        hasChanged && (
          <p className="text-sm text-yellow-500 text-center">
            Event has changed, save again.
          </p>
        )
      )}
    </div>
  );
}
