// Endpoint implementing the https://oembed.com/ spec

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async (req, res) => {
  const { query } = req;

  if (query.format && query.format !== "json") {
    return res.status(400).text(`Format ${query.format} not supported`);
  }

  const url = new URL(query.url);
  const pathParts = url.pathname.split("/").filter((part) => part.length > 1);

  const eventId = pathParts[pathParts.length - 1];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  if (error) {
    return res.status(500).json(error);
  }

  if (data.length !== 1) {
    return res.status(404).json(new Error("Event not found"));
  }

  const event = data[0];

  const width = query.maxwidth || 640;
  const height = query.maxheight || Math.floor((width * 2) / 3);
  const layout = "automatic";
  const colorMode = "light";

  return res.status(200).json({
    version: "1.0",
    type: "rich",
    title: event.title,
    author_name: event.host,
    provider_name: "Hosted by You",
    provider_url: "https://hostedbyyou.com",
    cache_age: 60,
    html: `<iframe src="https://www.hostedbyyou.com/embed/${event.id}?layout=${layout}&colorMode=${colorMode}" width="${width}" height="${height}" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="width: ${width}px; height: ${height}px; border: 0; border-radius: 4px; overflow: hidden;" allowfullscreen></iframe><p style="margin-top:4px"><a href="https://www.hostedbyyou.com/event/${event.id}" title="${event.title}" target="_blank">Visit event page</a></p>`,
    width,
    height,
    // thumbnail_url: "",
    // thumbnail_width: "",
    // thumbnail_height: "",
  });
};
