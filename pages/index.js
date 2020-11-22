import NewEventProvider from "containers/NewEventProvider";

import Head from "next/head";
import Logo from "components/landing/Logo";
import Benefits from "components/landing/Benefits";

import EventEditor from "components/event/Editor";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Hosted by You</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 space-y-8 bg-gradient-to-br from-blue-200 to-transparent">
        <div className="flex items-center justify-between">
          <Logo />
          <a
            className="text-blue-600 hover:text-blue-700 font-bold"
            href="mailto:wouterraateland@gmail.com"
          >
            Questions &amp; Feedback
          </a>
        </div>
        <Benefits />
      </header>
      <main className="p-4">
        <NewEventProvider>
          <EventEditor />
        </NewEventProvider>
      </main>
    </div>
  );
}
