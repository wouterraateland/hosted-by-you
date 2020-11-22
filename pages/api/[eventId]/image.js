import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async (req, res) => {
  const { eventId } = req.query;

  const { data, error } = await supabase
    .from("events")
    .select("image")
    .eq("id", eventId);

  if (error) {
    return res.status(500).json(error);
  }

  if (data.length !== 1) {
    return res.status(404).json(new Error("Event not found"));
  }

  const { image } = data[0];

  if (image.startsWith("data:")) {
    const iColon = image.indexOf(":");
    const iSemi = image.indexOf(";");
    const iComma = image.indexOf(",");
    const contentType = image.substring(iColon + 1, iSemi);
    const encoding = image.substring(iSemi + 1, iComma);
    const data = image.substring(iComma + 1);
    const imageBuffer = Buffer.from(data, encoding);

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": imageBuffer.length,
    });
    res.end(imageBuffer);
  } else {
    return res.status(200).send(image);
  }
};
