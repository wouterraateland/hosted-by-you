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

  const width = query.maxwidth || 800;
  const height =
    query.maxheight || (width > 640 ? Math.floor(width / 2) : width);
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
    html: `<iframe src="https://www.hostedbyyou.com/embed/${
      event.id
    }?layout=${layout}&colorMode=${colorMode}&maxHeight=${
      query.maxheight || 0
    }" frameborder="0" marginwidth="0" marginheight="0" style="width: 100%; border: 0; border-radius: 12px; overflow: auto;" allowfullscreen />`,
    width,
    height,
    // thumbnail_url: "",
    // thumbnail_width: "",
    // thumbnail_height: "",
  });
};
