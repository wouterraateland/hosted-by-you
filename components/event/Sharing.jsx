import { copyTextToClipboard } from "utils/strings";

import { useCallback, useContext, useEffect, useState } from "react";
import { EventContext, StylingContext } from "contexts";

import Button from "components/ui/Button";
import Card from "components/ui/Card";

const getShareUrl = (event) =>
  typeof window !== "undefined" &&
  `${window.location.origin}/event/${event.id}`;
const getAdminUrl = (event) =>
  typeof window !== "undefined" &&
  `${window.location.origin}/admin/${event.id}?code=${event.adminCode}`;

const getEmbedCode = (event, styling) =>
  typeof window !== "undefined" &&
  `<iframe src="${window.location.origin}/embed/${event.id}?layout=${styling.layout}&colorMode=${styling.colorMode}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="${event.title}" />`;

const selectContents = (event) => event.target.select();

export default function EventSharing() {
  const [copied, setCopied] = useState(null);
  const [event] = useContext(EventContext);
  const [styling] = useContext(StylingContext);

  const [{ error, sent }, setState] = useState({ sent: false });
  const [{ embedCode, shareUrl, adminUrl }, setUrls] = useState({
    embedCode: "",
    shareUrl: "",
    adminUrl: "",
  });

  useEffect(() => {
    setUrls({
      embedCode: getEmbedCode(event, styling),
      shareUrl: getShareUrl(event, styling),
      adminUrl: getAdminUrl(event),
    });
  }, [event, styling]);

  const sendEventDetails = useCallback(
    async (email) => {
      const response = await fetch("/api/sendEventDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          email,
          adminUrl,
        }),
      });
      if (response.ok) {
        setState({ sent: true });
      } else {
        setState({ error: await response.text() });
      }
    },
    [event.id, embedCode, shareUrl, adminUrl]
  );

  return (
    <Card id="share">
      {event.id ? (
        <>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <textarea
                className="w-full px-2 py-1 rounded-md border border-gray-300 bg-gray-50 resize-none"
                value={embedCode}
                onFocus={selectContents}
                readOnly
              />
              <Button
                className="w-full px-2 py-1 text-center rounded-md bg-blue-600 hover:bg-blue-700 border border-blue-900 text-white"
                onClick={async () => {
                  await copyTextToClipboard(embedCode);
                  setCopied("embedCode");
                }}
              >
                {copied === "embedCode"
                  ? "Embed code copied!"
                  : "Copy embed code"}
              </Button>
            </div>
            <label className="block">
              <span>Share url (also works on Medium)</span>
              <input
                className="w-full px-2 py-1 rounded-md border border-gray-300 bg-gray-50"
                value={shareUrl}
                onFocus={selectContents}
                readOnly
              />
            </label>
          </div>
          <div className="p-4 space-y-4 bg-blue-50 rounded-b-xl">
            <label className="block">
              <span>Admin url (share only with your co-hosts)</span>
              <span className="block text-sm text-gray-500">
                Use to change your event at any time later
              </span>
              <input
                className="w-full px-2 py-1 rounded-md border border-gray-300 bg-white"
                value={adminUrl}
                onFocus={selectContents}
                readOnly
              />
            </label>
            {sent ? (
              <p className="text-blue-600">
                Succes! The URLs are sent to your email.
              </p>
            ) : (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  await sendEventDetails(event.target.email.value);
                }}
              >
                <p>
                  <span role="img" aria-label="Tip">
                    💡
                  </span>{" "}
                  We can send the admin URL to your email so you don&apos;t lose
                  it:
                </p>
                <div className="flex items-center space-x-4">
                  <input
                    className="flex-grow w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
                    name="email"
                    placeholder="your@email.com"
                  />
                  <Button className="text-center px-4 py-2 rounded-md border bg-blue-600 hover:bg-blue-700 border-blue-900 text-white font-bold whitespace-nowrap">
                    Send admin URLs
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-red-500">
                    {JSON.stringify(error)}
                  </p>
                )}
              </form>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          You need to save before you can share
        </p>
      )}
    </Card>
  );
}
