import cx from "classnames";

import { useContext } from "react";
import { EventContext } from "contexts";

import Card from "components/ui/Card";

import EventInfo from "./Info";
import RegistrationForm from "./RegistrationForm";

export default function EventView() {
  const [event] = useContext(EventContext);

  return (
    <div className="mx-auto w-full items-center -space-y-12">
      {event.image && (
        <div className="relative w-full pb-2/3">
          <img
            className="absolute w-full h-full object-cover rounded-xl shadow-sm bg-gray-200"
            src={event.image}
            alt={event.title}
          />
        </div>
      )}
      <Card
        elevation="md"
        className={cx("relative min-w-0 flex-grow overflow-hidden", {
          "sm:mx-4": event.image,
        })}
      >
        <EventInfo event={event} />
        <RegistrationForm event={event} />
      </Card>
    </div>
  );
}
