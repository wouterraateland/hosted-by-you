import {
  setMinutes,
  setHours,
  addHours,
  isSameDay,
  formatDuration,
  intervalToDuration,
} from "date-fns";

import { useContext } from "react";
import { EventContext } from "contexts";

import DatePicker from "react-datepicker";

export default function EndsAtInput() {
  const [event, setEvent] = useContext(EventContext);

  const duration = event.endsAt
    ? intervalToDuration({
        start: event.occursAt,
        end: event.endsAt,
      })
    : null;

  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={!!event.endsAt}
          onChange={(event) =>
            setEvent((prev) => ({
              ...prev,
              endsAt: event.target.checked ? addHours(prev.occursAt, 1) : null,
            }))
          }
        />
        <span>Specify end time</span>
      </label>
      {event.endsAt && (
        <label className="block">
          <span className="text-sm font-bold text-gray-500">
            Ends at - Event lasts{" "}
            {formatDuration(duration, {
              format: ["days", "hours", "minutes"],
            })}
          </span>
          <DatePicker
            className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
            selected={event.endsAt}
            onChange={(endsAt) =>
              setEvent((prev) => ({
                ...prev,
                endsAt: endsAt < prev.occursAt ? prev.occursAt : endsAt,
              }))
            }
            showTimeSelect
            timeIntervals={15}
            minDate={event.occursAt}
            minTime={
              isSameDay(event.occursAt, event.endsAt) ? event.occursAt : null
            }
            maxTime={
              isSameDay(event.occursAt, event.endsAt)
                ? setHours(setMinutes(new Date(), 45), 23)
                : null
            }
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
        </label>
      )}
    </div>
  );
}
