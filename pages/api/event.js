import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function createEvent(req, res) {
  const rawEvent = {
    ...req.body,
    id: uuidv4(),
    adminCode: uuidv4(),
  };
  const { data, error } = await supabase.from("events").insert([rawEvent]);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data[0]);
}

async function updateEvent(req, res) {
  const { id, createdAt, updatedAt, adminCode, ...rawEvent } = req.body;
  const selectResponse = await supabase.from("events").select("*").eq("id", id);

  if (selectResponse.error) {
    return res.status(500).json(selectResponse.error);
  }

  if (selectResponse.data.length !== 1) {
    return res.status(404).json(new Error("Event not found"));
  }
  const upstreamEvent = selectResponse.data[0];

  if (upstreamEvent.adminCode !== adminCode) {
    return res
      .status(401)
      .json(new Error("Wrong admin code, not permitted to edit"));
  }

  const { data, error } = await supabase
    .from("events")
    .update([rawEvent])
    .eq("id", id);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data[0]);
}

async function viewEvent(req, res) {
  const { data, error } = await supabase
    .from("events")
    .select("*, guest (id)")
    .eq("id", req.query.eventId);

  if (error) {
    return res.status(500).json(error);
  }

  if (data.length !== 1) {
    return res.status(404).json(new Error("Event not found"));
  }

  const { adminCode, guests, ...event } = data[0];

  return res.status(200).json({ ...event, guests: guests.length });
}

export default async (req, res) => {
  if (req.method === "POST") {
    if (req.body.id) {
      return await updateEvent(req, res);
    } else {
      return await createEvent(req, res);
    }
  } else if (req.method === "GET") {
    return await viewEvent(req, res);
  }

  return res.status(405).json(new Error("Method not supported"));
};
