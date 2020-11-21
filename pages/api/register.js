import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function sendAccessCode(to, accessCode) {
  // TODO: implement...
  console.log(to, accessCode);
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, eventId } = req.body;

    const eventsRes = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId);

    if (eventsRes.error) {
      return res.status(500).json(eventsRes.error);
    }

    if (eventsRes.data.length !== 1) {
      return res.status(404).json(new Error("Event not found"));
    }

    const guestsRes = await supabase
      .from("guests")
      .select("*")
      .eq("eventId", eventId)
      .eq("email", email);

    if (guestsRes.error) {
      return res.status(500).json(guestsRes.error);
    }

    if (guestsRes.data.length !== 0) {
      const { id, accessCode, ...guest } = guestsRes.data[0];
      await sendAccessCode(guest.email, accessCode);
      return res.status(200).json(guest);
    }

    const { data, error } = await supabase
      .from("guests")
      .insert([{ eventId, email, accessCode: uuidv4(), status: "registered" }]);

    if (error) {
      return res.status(500).json(error);
    }

    const { id, accessCode, ...guest } = data[0];
    await sendAccessCode(guest.email, accessCode);

    return res.status(200).json(guest);
  }

  return res.status(405).json(new Error("Method not supported"));
};
