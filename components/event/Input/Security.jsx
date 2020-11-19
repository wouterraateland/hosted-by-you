import { useContext } from "react";
import { EventContext } from "contexts";

export default function SecurityInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={event.registrationRequired}
          onChange={(event) =>
            setEvent((prev) => ({
              ...prev,
              registrationRequired: event.target.checked,
            }))
          }
        />
        <span>Require registration</span>
      </label>
    </div>
  );
}
