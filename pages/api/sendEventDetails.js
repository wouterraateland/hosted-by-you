import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function sendAdminUrl(event, to, adminUrl) {
  const textLines = [
    `Hi ${event.host},`,
    "",
    `Here is your admin url for ${event.title}:`,
    adminUrl,
    "Anyone with this url can manage your event. Only share it with co-hosts!",
    "",
    `Event details:`,
    `Title: ${event.title}`,
    `Host: ${event.host}`,
    `Date: ${format(new Date(event.occursAt), "MMMM dd, hh:mm a")}${
      event.endsAt && ` - ${format(new Date(event.endsAt), "hh:mm a")}`
    }`,
    `Location: ${event.location}${event.locationOnline ? " (online)" : ""}`,
    "",
    "Thank your for hosting with us. Enjoy your event!",
    "— Hosted by You",
    "",
    "PS. Any questions or feedback? Reach out to me at wouterraateland@gmail.com",
  ];

  await sgMail.send({
    to,
    from: {
      email: "invite@hostedbyyou.com",
      name: `Hosted by You`,
    },
    subject: `Admin URL for ${event.title}`,
    text: textLines.join("\n"),
  });
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, eventId, adminUrl } = req.body;

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId);

    if (error) {
      return res.status(500).json(error);
    }

    if (events.length !== 1) {
      return res.status(404).json(new Error("Event not found"));
    }

    await sendAdminUrl(events[0], email, adminUrl);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json(new Error("Method not supported"));
};
