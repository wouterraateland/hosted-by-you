import EventInput from "./Input";
import EventPreview from "./Preview";
import EventStyling from "./Styling";
import EventSharing from "./Sharing";

export default function EventEditor() {
  return (
    <div className="md:flex md:space-x-8 space-y-8 md:space-y-0 items-start">
      <div className="md:w-1/2 space-y-8 sticky top-4">
        <div className="space-y-2">
          <h2 className="flex items-center space-x-2 text-xl font-bold">
            <span>✍️</span>
            <span>Details</span>
          </h2>
          <EventInput />
        </div>
      </div>
      <div className="md:w-1/2 space-y-8 sticky top-4">
        <div className="space-y-2">
          <h2 className="flex items-center space-x-2 text-xl font-bold">
            <span>👁</span>
            <span>Preview</span>
          </h2>
          <EventPreview readOnly />
        </div>
        <div className="space-y-2">
          <h2 className="flex items-center space-x-2 text-xl font-bold">
            <span>✨</span>
            <span>Style</span>
          </h2>
          <EventStyling />
        </div>
        <div className="space-y-2">
          <h2 className="flex items-center space-x-2 text-xl font-bold">
            <span>🔗</span>
            <span>Share</span>
          </h2>
          <EventSharing />
        </div>
      </div>
    </div>
  );
}
