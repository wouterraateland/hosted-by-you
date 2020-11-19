import NewEventProvider from "containers/NewEventProvider";

import Head from "next/head";
import * as Icons from "components/icons";
import Benefits from "components/landing/Benefits";
import EventInput from "components/event/Input";
import EventStyling from "components/event/Styling";
import EventPreview from "components/event/Preview";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Event Embed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 space-y-4">
        <h1 className="font-black text-4xl flex items-end justify-center space-x-4">
          <Icons.Calendar className="w-10 h-10 text-blue-600 stroke-current stroke-3" />
          <span>EventEmbed</span>
        </h1>
        <Benefits />
        <NewEventProvider>
          <div className="md:flex space-x-4">
            <div className="md:w-1/2 space-y-4">
              <h2 className="flex items-center space-x-2 text-xl font-bold">
                <span>✍️</span>
                <span>Edit your event</span>
              </h2>
              <EventInput />
              <h2 className="flex items-center space-x-2 text-xl font-bold">
                <span>✨</span>
                <span>Styling</span>
              </h2>
              <EventStyling />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="flex items-center space-x-2 text-xl font-bold">
                <span>👁</span>
                <span>Preview</span>
              </h2>
              <EventPreview />
            </div>
          </div>
        </NewEventProvider>
      </main>
    </div>
  );
}
