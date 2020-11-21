import { isJust } from "utils/functions";
import { cleanUrl, formatLargeNumber } from "utils/strings";
import cx from "classnames";
import { format, isToday, isPast } from "date-fns";

import { useContext, useEffect, useRef, useState } from "react";
import { EventContext, StylingContext } from "contexts";

// import Share from "components/icons/Share";
import Calendar from "components/icons/Calendar";
import Location from "components/icons/Location";
import Group from "components/icons/Group";
// import Button from "components/ui/Button";
import Card from "components/ui/Card";

import RegistrationForm from "./RegistrationForm";

export default function EventPreview({ readOnly }) {
  const [event] = useContext(EventContext);
  const [{ layout, colorMode }] = useContext(StylingContext);
  const [actualLayout, setActualLayout] = useState(
    layout === "automatic" ? null : layout
  );
  const containerRef = useRef(null);

  const spotsLeft = Math.max(0, event.capacity - (event.guestCount || 0));

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const resetLayout = () =>
        setActualLayout(
          layout === "automatic"
            ? container.offsetWidth > 640
              ? "horizontal"
              : "vertical"
            : layout
        );

      resetLayout();
      const resizeObserver = new ResizeObserver(resetLayout);
      resizeObserver.observe(container);
      return () => resizeObserver.unobserve(container);
    }
  }, [layout]);

  return (
    <div
      ref={containerRef}
      className={cx(
        "mx-auto w-full",
        { "opacity-0": !actualLayout },
        { dark: colorMode === "dark" },
        { "pointer-events-none": readOnly },
        actualLayout === "horizontal"
          ? "flex -space-x-12"
          : "items-center -space-y-12"
      )}
    >
      {event.image && (
        <div
          className={cx(
            "relative",
            actualLayout === "horizontal" ? "pr-64" : "w-full pb-2/3"
          )}
        >
          <img
            className="absolute w-full h-full object-cover rounded-xl shadow-sm bg-gray-200"
            src={event.image}
            alt={event.title}
          />
        </div>
      )}
      <Card
        elevation="md"
        className={cx(
          "relative min-w-0 flex-grow overflow-hidden",
          event.image
            ? actualLayout === "horizontal"
              ? "my-4"
              : "sm:mx-4"
            : ""
        )}
      >
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-bold">
                  {event.host || <em className="text-gray-400">Event host</em>}{" "}
                  {isPast(event.occursAt) ? "invited" : "invites"} you
                </p>
                <h1 className="font-bold text-2xl">
                  {event.title || (
                    <em className="text-gray-400">Event title</em>
                  )}
                </h1>
              </div>
              {/* <Button
                type="button"
                className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white px-2 py-1 flex items-center space-x-2 focus:ring-2 focus:outline-none font-bold"
              >
                <Share className="w-4 h-4 stroke-current stroke-3" />
                <span>Share</span>
              </Button> */}
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

        <div className="p-4 space-y-2 bg-blue-50 dark:bg-blue-900">
          {event.myParticipation ? (
            <div>
              <p className="text-xl font-bold text-blue-900 dark:text-white">
                Hurray!
              </p>
              <p className="text-sm text-blue-500 dark:text-blue-200">
                You&apos;ve succesfully registered for this event. Check your
                inbox for a personal link to manage your registration.
              </p>
            </div>
          ) : (
            <p className="text-blue-500 dark:text-blue-200">
              {isPast(event.occursAt) ? (
                "This event has already occured. You can still register."
              ) : event.registrationRequired ? (
                event.locationOnline ? (
                  "Register to see the event details"
                ) : (
                  "Register to join the event"
                )
              ) : (
                <span>
                  Register to let{" "}
                  {event.host || <em className="text-blue-300">Event host</em>}{" "}
                  know that you are joining
                </span>
              )}
            </p>
          )}
          <RegistrationForm />
        </div>
      </Card>
    </div>
  );
}
