import { useCallback, useContext, useState } from "react";
import { EventContext } from "contexts";

import Card from "components/ui/Card";

import CapacityInput from "./Capacity";
import DescriptionInput from "./Description";
import EndsAtInput from "./EndsAt";
import HostInput from "./Host";
import EventImageInput from "./Image";
import LocationInput from "./Location";
import OccursAtInput from "./OccursAt";
import SecurityInput from "./Security";
import TitleInput from "./Title";
import Submit from "./Submit";

export default function EventInput() {
  const [event, setEvent] = useContext(EventContext);
  const [error, setError] = useState(null);

  const createEvent = useCallback(async () => {
    const response = await fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(event),
    });
    if (response.ok) {
      const createdEvent = await response.json();
      setEvent({
        ...createdEvent,
        occursAt: createdEvent.occursAt
          ? new Date(createdEvent.occursAt)
          : null,
        endsAt: createdEvent.endsAt ? new Date(createdEvent.endsAt) : null,
        createdAt: createdEvent.createdAt
          ? new Date(createdEvent.createdAt)
          : null,
        updatedAt: createdEvent.updatedAt
          ? new Date(createdEvent.updatedAt)
          : null,
      });
    } else {
      setError(await response.text());
    }
  }, [event, setEvent]);

  return error ? (
    <Card className="p-8 space-y-4 bg-red-600 text-white text-center">
      <h2>Oh no, something went wrong</h2>
      <p className="text-red-100">Reload the page to retry</p>
    </Card>
  ) : (
    <Card>
      <form
        className="p-4 space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          createEvent();
        }}
      >
        <EventImageInput />
        <HostInput />
        <TitleInput />
        <OccursAtInput />
        <EndsAtInput />
        <LocationInput />
        <DescriptionInput />
        <CapacityInput />
        <SecurityInput />
        <Submit />
      </form>
    </Card>
  );
}
