import { isJust } from "utils/functions";
import { cleanUrl, formatLargeNumber } from "utils/strings";
import { format, isToday, isPast } from "date-fns";

import Calendar from "components/icons/Calendar";
import Group from "components/icons/Group";
import Location from "components/icons/Location";
import OutboundLink from "components/icons/OutboundLink";

export default function EventInfo({ event, embedded }) {
  const spotsLeft = Math.max(0, event.capacity - (event.guestCount || 0));

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-bold">
              {event.host || <em className="text-gray-400">Event host</em>}{" "}
              {isPast(event.occursAt) ? "invited" : "invites"} you
            </p>
            <h1 className="font-bold text-2xl">
              {event.title || <em className="text-gray-400">Event title</em>}
            </h1>
          </div>
          {embedded && (
            <a
              href={`https://hostedbyyou.com/event/${event.id}`}
              target="_blank"
              rel="noreferrer noopener"
              className="block p-2 rounded-full focus:ring-2 focus:outline-none hover:bg-blue-50 text-blue-600 dark:hover:bg-blue-900 dark:text-white"
            >
              <OutboundLink className="w-4 h-4 stroke-current stroke-3" />
            </a>
          )}
        </div>
        <div className="flex flex-wrap -mx-2">
          <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-red-400">
            <Calendar className="w-4 h-4 stroke-current stroke-3" />
            <span>
              {isToday(event.occursAt)
                ? `Today ${format(event.occursAt, "hh:mm a")}`
                : format(event.occursAt, "MMMM dd, hh:mm a")}{" "}
              {event.endsAt && `- ${format(event.endsAt, "hh:mm a")}`}
            </span>
          </p>
          {event.location && (
            <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-gray-500">
              <Location className="w-4 h-4 stroke-current stroke-3" />
              <span>
                {event.locationOnline ? (
                  event.registrationRequired ? (
                    "Online"
                  ) : (
                    <a
                      className="text-blue-600"
                      href={event.location}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {cleanUrl(event.location, false)}
                    </a>
                  )
                ) : (
                  <a
                    href={`https://maps.google.com?q=${event.location
                      .split(" ")
                      .join("+")}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {event.location}
                  </a>
                )}
              </span>
            </p>
          )}
          <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-gray-500">
            <Group className="w-4 h-4 stroke-current stroke-3" />
            <span>
              {formatLargeNumber(event.guestCount || 0)}{" "}
              {event.guestCount === 1 ? "joins" : "join"}{" "}
              {isJust(event.capacity) &&
                ` • ${formatLargeNumber(spotsLeft)} ${
                  spotsLeft === 1 ? "spot" : "spots"
                } left`}
            </span>
          </p>
        </div>
      </div>
      {event.description && (
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {event.description}
        </p>
      )}
    </div>
  );
}
