import Head from "next/head";

export default function EventSEO(event) {
  return (
    <Head>
      <title>{event.title} | Hosted by You</title>
      <meta
        name="description"
        content={event.description || "Hosted via Hosted by You"}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
