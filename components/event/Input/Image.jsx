import { useContext } from "react";
import { EventContext } from "contexts";

import ImageInput from "components/ui/ImageInput";

export default function EventImageInput() {
  const [event, setEvent] = useContext(EventContext);

  return (
    <div className="block space-y-2">
      <span className="text-sm font-bold text-gray-500">Cover image</span>
      <ImageInput
        className="w-24 h-16 rounded-md flex items-center justify-center border border-gray-300 bg-gray-50"
        value={event.image}
        onChange={(image) => setEvent((prev) => ({ ...prev, image }))}
        onDelete={() => setEvent((prev) => ({ ...prev, image: null }))}
      />
    </div>
  );
}
