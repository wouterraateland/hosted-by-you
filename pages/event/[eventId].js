import { createClient } from "@supabase/supabase-js";

import { EventContext, StylingContext } from "contexts";

import Link from "next/link";

import Card from "components/ui/Card";
import EventPreview from "components/event/Preview";
import Logo from "components/landing/Logo";

const normalizeEventDates = (event) => ({
  ...event,
  occursAt: event.occursAt ? new Date(event.occursAt) : null,
  endsAt: event.endsAt ? new Date(event.endsAt) : null,
  createdAt: event.createdAt ? new Date(event.createdAt) : null,
  updatedAt: event.updatedAt ? new Date(event.updatedAt) : null,
});

const normalizeEventStyling = (styling) => ({
  colorMode: "light",
  ...styling,
  layout: "vertical",
});

export default function Event({ error, eventId, event, ...props }) {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center bg-gray-100 min-h-screen">
      <main className="max-w-xl">
        {error ? (
          <Card className="p-8 bg-red-600 text-white">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </pre>
          </Card>
        ) : (
          <EventContext.Provider value={[normalizeEventDates(event)]}>
            <StylingContext.Provider
              value={[normalizeEventStyling({ ...props })]}
            >
              <EventPreview />
            </StylingContext.Provider>
          </EventContext.Provider>
        )}
      </main>
      <footer className="text-center space-y-2">
        <p className="text-gray-500 text-sm">This event is hosted via:</p>
        <Link href="/">
          <a className="block">
            <Logo />
          </a>
        </Link>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const supabase = createClient(
    process.env.SUPABASE_API_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from("events")
    .select("*, guests (id, email, accessCode)")
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

  return {
    props: {
      event: {
        ...event,
        guests: guests.length,
        myParticipation:
          guests.find((guest) => guest.accessCode === params.accessCode) ||
          null,
      },
      ...params,
    },
  };
}
