import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function sendAccessCode(event, to, accessCode) {
  const textLines = [
    "Hi there,",
    "",
    `Your registration for "${event.title}" is confirmed.`,
    `To manage your registration, go to https://hostedbyyou.com/event/${event.id}?accessCode=${accessCode}`,
    "",
    `Event details for "${event.title}":`,
    `Host: ${event.host}`,
    `Date: ${format(new Date(event.occursAt), "MMMM dd, hh:mm a")}${
      event.endsAt ? ` - ${format(new Date(event.endsAt), "hh:mm a")}` : ""
    }`,
    `Location: ${event.location}${event.locationOnline ? " (online)" : ""}`,
    "",
    "Enjoy the event!",
    "— Hosted by You",
    "",
    "PS. Want to host an event yourself? Check out https://hostedbyyou.com",
  ];

  const htmlLines = [
    `<p>Hi there,</p>`,
    `<p>Your registration for <strong>${event.title}</strong> is confirmed.<br />`,
    `To manage your registration, go to <a href="https://hostedbyyou.com/event/${event.id}?accessCode=${accessCode}">https://hostedbyyou.com/event/${event.id}?accessCode=${accessCode}</a></p>`,
    `<p>Event details for <strong>${event.title}</strong>:<br />`,
    `Host: ${event.host}<br />`,
    `Date: ${format(new Date(event.occursAt), "MMMM dd, hh:mm a")}${
      event.endsAt ? ` - ${format(new Date(event.endsAt), "hh:mm a")}` : ""
    }<br />`,
    `Location: ${event.location}${event.locationOnline ? " (online)" : ""}</p>`,
    `<p>Enjoy the event!<br />`,
    `— Hosted by You</p>`,
    `<p>PS. Want to host an event yourself? Check out <a href="https://hostedbyyou.com">hostedbyyou.com</a></p>`,
  ];

  await sgMail.send({
    to,
    from: {
      email: "invite@hostedbyyou.com",
      name: `Hosted by You`,
    },
    subject: `Registration for ${event.title} confirmed`,
    text: textLines.join("\n"),
    html: htmlLines.join(""),
  });
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { eventId } = req.query;
    const { email } = req.body;

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
    const { adminCode, ...event } = eventsRes.data[0];

    const guestsRes = await supabase
      .from("guests")
      .select("*")
      .eq("eventId", eventId)
      .eq("email", email);

    if (guestsRes.error) {
      return res.status(500).json(guestsRes.error);
    }

    if (guestsRes.data.length !== 0) {
      const { id, accessCode, ...myParticipation } = guestsRes.data[0];
      await sendAccessCode(event, myParticipation.email, accessCode);
      return res
        .status(200)
        .json({ ...event, guestCount: guests.length, myParticipation });
    }

    const { data: guests, error } = await supabase
      .from("guests")
      .insert([{ eventId, email, accessCode: uuidv4(), status: "registered" }]);

    if (error) {
      return res.status(500).json(error);
    }

    const { id, accessCode, ...myParticipation } = guests[0];
    await sendAccessCode(event, myParticipation.email, accessCode);

    return res
      .status(200)
      .json({ ...event, guestCount: guests.length + 1, myParticipation });
  }

  return res.status(405).json(new Error("Method not supported"));
};
