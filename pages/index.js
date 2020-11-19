import NewEventProvider from "containers/NewEventProvider";

import Head from "next/head";
import Logo from "components/landing/Logo";
import Benefits from "components/landing/Benefits";

import EventInput from "components/event/Input";
import EventPreview from "components/event/Preview";
import EventStyling from "components/event/Styling";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>EventEmbed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 space-y-8 bg-gradient-to-br from-blue-200 to-transparent">
        <Logo />
        <Benefits />
      </header>
      <main className="p-4">
        <NewEventProvider>
          <div className="md:flex md:space-x-8 space-y-8 md:space-y-0 items-start">
            <div className="md:w-1/2 space-y-8">
              <div className="space-y-2">
                <h2 className="flex items-center space-x-2 text-xl font-bold">
                  <span>✍️</span>
                  <span>Setup</span>
                </h2>
                <EventInput />
              </div>
            </div>
            <div className="md:w-1/2 space-y-8 sticky top-4">
              <div className="space-y-2">
                <h2 className="flex items-center space-x-2 text-xl font-bold">
                  <span>👁</span>
                  <span>Preview</span>
                </h2>
                <EventPreview />
              </div>
              <div className="space-y-2">
                <h2 className="flex items-center space-x-2 text-xl font-bold">
                  <span>✨</span>
                  <span>Style</span>
                </h2>
                <EventStyling />
              </div>
            </div>
          </div>
        </NewEventProvider>
      </main>
    </div>
  );
}
