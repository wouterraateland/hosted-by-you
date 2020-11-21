import { useContext } from "react";
import { EventContext } from "contexts";

import Card from "components/ui/Card";
import Guest from "./Guest";

export default function GuestManagement() {
  const [event] = useContext(EventContext);

  return (
    <div className="space-y-2">
      <h2 className="flex items-center space-x-2 text-xl font-bold">
        <span>😄</span>
        <span>Guests</span>
      </h2>
      <Card className="overflow-hidden">
        {event.guests.length > 0 ? (
          <table className="w-full">
            <thead className="sticky text-left">
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">AccessCode</th>
            </thead>
            <tbody>
              {event.guests.map((guest, i) => (
                <Guest key={guest.id} even={i % 2 === 0} guest={guest} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-8 text-gray-500">
            No one has registered for your event yet.{" "}
            <a href="#sharing">Share or embed your event</a> to get the
            registrations going.
          </p>
        )}
      </Card>
    </div>
  );
}
