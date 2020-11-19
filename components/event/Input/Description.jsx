import { useContext } from "react";
import { EventContext } from "contexts";

import Textarea from "components/ui/Textarea";

export default function DescriptionInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-500">
        Description (optional)
      </span>
      <Textarea
        className="block w-full border-b border-gray-300 focus:border-blue-600 focus:outline-none py-1"
        placeholder="Describe the timeline, activities etc."
        value={event.description}
        onChange={(event) =>
          setEvent((prev) => ({ ...prev, description: event.target.value }))
        }
      />
    </label>
  );
}
