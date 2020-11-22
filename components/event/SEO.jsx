import Head from "next/head";

export default function EventSEO({ event }) {
  return (
    <Head>
      <title>{event.title} | Hosted by You</title>
      <meta
        name="description"
        content={event.description || "Hosted via Hosted by You"}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={`${event.title} | Hosted by You`} />
      <meta
        property="og:description"
        content={event.description || "Hosted via Hosted by You"}
      />
      <meta
        property="og:url"
        content={`https://hostedbyyou.com/event/${event.id}`}
      />
      <meta
        property="og:image"
        content={`https://hostedbyyou.com/eventImage/${event.id}`}
      />
    </Head>
  );
}
