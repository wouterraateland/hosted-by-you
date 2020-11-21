import { normalizeEventDates, normalizeEventStyling } from "utils/events";
import cx from "classnames";
import { createClient } from "@supabase/supabase-js";

import { EventContext, StylingContext } from "contexts";
import { useRouter } from "next/router";

import Link from "next/link";

import Card from "components/ui/Card";
import EventSEO from "components/event/SEO";
import EventPreview from "components/event/Preview";
import Logo from "components/landing/Logo";
import { useState } from "react";

export default function Event({ error, event }) {
  const { query } = useRouter();
  const eventState = useState(normalizeEventDates(event));
  const stylingState = useState(
    normalizeEventStyling({ ...query, layout: "vertical" })
  );

  const [{ colorMode }] = stylingState;

  return error ? (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex-grow max-w-2xl p-8 space-y-4 bg-red-600 text-white">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </pre>
      </Card>
    </div>
  ) : (
    <div
      className={cx(
        "space-y-8 min-h-screen pb-4 sm:p-4",
        colorMode === "dark" ? "dark bg-gray-800" : "bg-gray-100"
      )}
    >
      <EventSEO event={eventState[0]} />
      <main className="mx-auto max-w-2xl">
        <EventContext.Provider value={eventState}>
          <StylingContext.Provider value={stylingState}>
            <EventPreview />
          </StylingContext.Provider>
        </EventContext.Provider>
      </main>
      <footer className="text-center space-y-2">
        <p className="text-gray-500 text-sm">This event is hosted via:</p>
        <Link href="/">
          <a className="inline-block">
            <Logo />
          </a>
        </Link>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, params } = context;

  const supabase = createClient(
    process.env.SUPABASE_API_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from("events")
    .select("*, guests (id, email, accessCode, status)")
    .eq("id", params.eventId);

  if (error) {
    if (error.code === "22P02") {
      return { notFound: true };
    }
    return { props: { error } };
  }

  if (data.length !== 1) {
    return { notFound: true };
  }

  const { adminCode, guests, ...event } = data[0];
  const myParticipation =
    guests.find((guest) => guest.accessCode === query.accessCode) || null;

  return {
    props: {
      event: {
        ...event,
        location:
          !event.registrationRequired ||
          !event.locationOnline ||
          myParticipation
            ? event.location
            : null,
        guestCount: guests.length,
        myParticipation,
      },
    },
  };
}
