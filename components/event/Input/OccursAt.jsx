import { intervalToDuration, add, sub } from "date-fns";

import { useContext } from "react";
import { EventContext } from "contexts";

import DatePicker from "react-datepicker";

export default function OccursAtInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-500">Starts at</span>
      <DatePicker
        className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
        selected={event.occursAt}
        onChange={(occursAt) =>
          setEvent((prev) => ({
            ...prev,
            occursAt,
            endsAt: prev.endsAt
              ? occursAt > prev.occursAt
                ? add(
                    prev.endsAt,
                    intervalToDuration({
                      start: prev.occursAt,
                      end: occursAt,
                    })
                  )
                : sub(
                    prev.endsAt,
                    intervalToDuration({
                      start: prev.occursAt,
                      end: occursAt,
                    })
                  )
              : null,
          }))
        }
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy hh:mm aa"
      />
    </label>
  );
}
