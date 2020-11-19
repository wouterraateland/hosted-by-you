import { cleanUrl } from "utils/strings";
import cx from "classnames";
import { format, isToday } from "date-fns";

import { useContext } from "react";
import { EventContext, StylingContext } from "contexts";

import * as Icons from "components/icons";
import Button from "components/ui/Button";
import Card from "components/ui/Card";

export default function EventPreview() {
  const [event] = useContext(EventContext);
  const [{ layout, colorMode }] = useContext(StylingContext);

  return (
    <div
      className={cx(
        layout === "horizontal" ? "flex -space-x-12" : "-space-y-12",
        { dark: colorMode === "dark" }
      )}
    >
      <div
        className={cx(
          "relative bg-gray-200 overflow-hidden rounded-xl shadow-sm",
          layout === "horizontal" ? "pr-48" : "pb-2/3"
        )}
      >
        {event.image && (
          <img
            className="absolute w-full h-full object-cover"
            src={event.image}
            alt={event.title}
          />
        )}
      </div>
      <Card
        elevation="md"
        className={cx(
          "relative min-w-0 flex-grow overflow-hidden",
          layout === "horizontal" ? "my-4" : "mx-4"
        )}
      >
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 uppercase text-sm font-bold">
                  <span>{event.host}</span> invites you
                </p>
                <h1 className="font-bold text-2xl">{event.title}</h1>
              </div>
              <Button className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white px-4 py-2 flex items-center space-x-2 focus:ring-2 focus:outline-none font-bold">
                <Icons.Share className="w-4 h-4 stroke-current stroke-3" />
                <span>Share</span>
              </Button>
            </div>
            <div className="flex flex-wrap -mx-2">
              <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-red-400">
                <Icons.Calendar className="w-4 h-4 stroke-current stroke-3" />
                <span>
                  {isToday(event.occursAt)
                    ? `Today ${format(event.occursAt, "hh:mm a")}`
                    : format(event.occursAt, "MMMM dd, hh:mm a")}{" "}
                  {event.endsAt && `- ${format(event.endsAt, "hh:mm a")}`}
                </span>
              </p>
              <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-gray-500">
                <Icons.Location className="w-4 h-4 stroke-current stroke-3" />
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
                    event.location
                  )}
                </span>
              </p>
              <p className="mx-2 my-1 flex items-center space-x-2 text-sm text-gray-500">
                <Icons.Group className="w-4 h-4 stroke-current stroke-3" />
                <span>
                  {event.participants} join{" "}
                  {event.capacity &&
                    ` • ${event.capacity - event.participants} spots left`}
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-500">{event.description}</p>
        </div>

        <div className="p-4 space-y-2 bg-blue-50 dark:bg-blue-900">
          <p className="text-blue-500 dark:text-blue-200">
            {event.registrationRequired
              ? event.locationOnline
                ? "Register to see the event details"
                : "Register to join the event"
              : `Register to let ${event.host} know that you are joining`}
          </p>
          <div className="flex items-center space-x-4">
            <input
              className="min-w-0 bg-white border border-gray-300 rounded-md flex-grow px-4 py-2"
              name="email"
              type="email"
              placeholder="your@email.com"
            />
            <Button className="rounded-md bg-blue-600 hover:bg-blue-700 border border-blue-900 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:border-yellow-300 dark:text-gray-900 px-4 py-2 flex items-center space-x-2 focus:ring-2 focus:outline-none font-bold">
              <Icons.Check className="w-4 h-4 stroke-current stroke-3" />
              <span>Register</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
