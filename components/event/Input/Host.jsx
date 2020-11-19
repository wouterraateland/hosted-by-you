import { useContext } from "react";
import { EventContext } from "contexts";

export default function HostInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-500">Event host</span>
      <input
        className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
        placeholder="Your, or your organization's name"
        value={event.host}
        onChange={(event) =>
          setEvent((prev) => ({ ...prev, host: event.target.value }))
        }
        required
      />
    </label>
  );
}
