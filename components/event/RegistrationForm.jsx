import { normalizeEventDates } from "utils/events";
import cx from "classnames";

import { useCallback, useContext, useState } from "react";
import { EventContext } from "contexts";
import { useRouter } from "next/router";

import Check from "components/icons/Check";
import Button from "components/ui/Button";

export default function RegistrationForm() {
  const {
    query: { eventId },
  } = useRouter();

  const [event, setEvent] = useContext(EventContext);
  const [error, setError] = useState(null);

  const capacityReached = event.capacity && event.guestCount >= event.capacity;
  const disabled = event.myParticipation || capacityReached;

  const participate = useCallback(
    async (email) => {
      const response = await fetch(`/api/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const event = await response.json();
        setEvent(normalizeEventDates(event));
        setError(null);
      } else {
        setError(await response.text());
      }
    },
    [eventId]
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        participate(event.target.email.value);
      }}
    >
      <div className="flex flex-wrap items-center space-y-2 md:space-x-4 md:space-y-0 md:flex-nowrap">
        <input
          required
          className={cx(
            "min-w-0 border border-gray-300 rounded-md flex-grow px-4 py-2",
            disabled ? "bg-gray-100" : "bg-white"
          )}
          name="email"
          type="email"
          placeholder="your@email.com"
          value={
            event.myParticipation ? event.myParticipation.email : undefined
          }
          disabled={disabled}
        />
        <Button
          className={cx(
            "w-full md:w-auto rounded-md px-4 py-2 flex items-center justify-center space-x-2 focus:ring-2 focus:outline-none font-bold border",
            disabled
              ? "bg-blue-300 border-blue-400 text-white dark:bg-yellow-800 dark:border-yellow-600 dark:text-gray-900 cursor-default"
              : "bg-blue-600 hover:bg-blue-700 border border-blue-900 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:border-yellow-300 dark:text-gray-900"
          )}
          disabled={disabled}
        >
          {event.myParticipation && (
            <Check className="w-4 h-4 stroke-current stroke-3" />
          )}
          <span>
            {event.myParticipation
              ? "Registered"
              : capacityReached
              ? "No spots left"
              : "Register"}
          </span>
        </Button>
      </div>
      {error && <p className="text-red-500 text-xs">{JSON.stringify(error)}</p>}
    </form>
  );
}
