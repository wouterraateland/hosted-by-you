import { useContext } from "react";
import { EventContext } from "contexts";

export default function TitleInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-500">Event title</span>
      <input
        className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-2 text-2xl"
        placeholder="Event title"
        value={event.title}
        onChange={(event) =>
          setEvent((prev) => ({ ...prev, title: event.target.value }))
        }
        required
      />
    </label>
  );
}
