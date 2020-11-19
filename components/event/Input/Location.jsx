import { isURL } from "utils/strings";

import { useContext } from "react";
import { EventContext } from "contexts";

export default function LocationInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <div>
      <label className="block">
        <span className="text-sm font-bold text-gray-500">
          Location (optional)
        </span>
        <input
          className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
          placeholder="Address or URL"
          value={event.location}
          onChange={(event) =>
            setEvent((prev) => ({
              ...prev,
              location: event.target.value,
              locationOnline: isURL(event.target.value),
            }))
          }
        />
      </label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={event.locationOnline}
            onChange={(event) =>
              setEvent((prev) => ({
                ...prev,
                locationOnline: event.target.checked,
              }))
            }
          />
          <span>Online</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={!event.locationOnline}
            onChange={(event) =>
              setEvent((prev) => ({
                ...prev,
                locationOnline: !event.target.checked,
              }))
            }
          />
          <span>Physical location</span>
        </label>
      </div>
    </div>
  );
}
