import { isJust } from "utils/functions";

import { useContext } from "react";
import { EventContext } from "contexts";

export default function CapacityInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isJust(event.capacity)}
          onChange={(event) =>
            setEvent((prev) => ({
              ...prev,
              capacity: event.target.checked ? 10 : null,
            }))
          }
        />
        <span>Limit guest amount</span>
      </label>
      {isJust(event.capacity) && (
        <label className="block">
          <span className="text-sm font-bold text-gray-500">Capacity</span>
          <input
            type="number"
            min={0}
            className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
            value={event.capacity}
            onChange={(event) =>
              setEvent((prev) => ({
                ...prev,
                capacity:
                  !event.target.value || isNaN(event.target.value)
                    ? prev.capacity
                    : parseInt(event.target.value, 10),
              }))
            }
          />
        </label>
      )}
    </div>
  );
}
