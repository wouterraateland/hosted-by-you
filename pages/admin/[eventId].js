import { normalizeEventDates } from "utils/events";
import { initialStyling } from "data";

import { createClient } from "@supabase/supabase-js";

import { useState } from "react";
import { EventContext, StylingContext } from "contexts";

import Link from "next/link";
import Card from "components/ui/Card";
import EventSEO from "components/event/SEO";
import EventEditor from "components/event/Editor";
import GuestManagement from "components/event/GuestManagement";
import Logo from "components/landing/Logo";

export default function EventAdmin({ error, event }) {
  const eventState = useState(normalizeEventDates(event));
  const stylingState = useState(initialStyling);

  return error ? (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex-grow max-w-xl p-8 space-y-4 bg-red-600 text-white">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </pre>
      </Card>
    </div>
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <EventSEO event={eventState[0]} />
      <header className="p-4 space-y-8 bg-gradient-to-br from-blue-200 to-transparent">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="inline-block">
              <Logo />
            </a>
          </Link>
          <a
            className="text-blue-600 hover:text-blue-700 font-bold"
            href="mailto:wouterraateland@gmail.com"
          >
            Questions &amp; Feedback
          </a>
        </div>
      </header>
      <main className="p-4 space-y-4">
        <EventContext.Provider value={eventState}>
          <StylingContext.Provider value={stylingState}>
            <GuestManagement />
            <EventEditor />
          </StylingContext.Provider>
        </EventContext.Provider>
      </main>
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

  const { guests, ...event } = data[0];

  if (event.adminCode !== query.adminCode) {
    return { props: { error: "Invalid adminCode" } };
  }

  return {
    props: {
      event: {
        ...event,
        guests: guests,
        guestCount: guests.length,
      },
    },
  };
}
