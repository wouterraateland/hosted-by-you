import { useContext } from "react";
import { EventContext, StylingContext } from "contexts";

import Card from "components/ui/Card";

export default function EventStyling() {
  const [event] = useContext(EventContext);
  const [styling, setStyling] = useContext(StylingContext);
  return (
    <Card className="flex flex-wrap items-center py-2">
      <div className="px-4 py-2 space-y-1">
        <p className="text-gray-500 font-bold text-sm">Color Scheme</p>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="colorMode"
              checked={styling.colorMode === "light"}
              onChange={(event) =>
                event.target.checked &&
                setStyling((styling) => ({
                  ...styling,
                  colorMode: "light",
                }))
              }
            />
            <span>Light</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="colorMode"
              checked={styling.colorMode === "dark"}
              onChange={(event) =>
                event.target.checked &&
                setStyling((styling) => ({ ...styling, colorMode: "dark" }))
              }
            />
            <span>Dark</span>
          </label>
        </div>
      </div>
      <div className="px-4 py-2 space-y-1">
        <p className="text-gray-500 font-bold text-sm">Layout</p>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="layout"
              checked={styling.layout === "automatic"}
              onChange={(event) =>
                event.target.checked &&
                setStyling((styling) => ({
                  ...styling,
                  layout: "automatic",
                }))
              }
              disabled={!event.image}
            />
            <span>Auto</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="layout"
              checked={styling.layout === "vertical"}
              onChange={(event) =>
                event.target.checked &&
                setStyling((styling) => ({
                  ...styling,
                  layout: "vertical",
                }))
              }
              disabled={!event.image}
            />
            <span>Vertical</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="layout"
              checked={styling.layout === "horizontal"}
              onChange={(event) =>
                event.target.checked &&
                setStyling((styling) => ({ ...styling, layout: "horizontal" }))
              }
              disabled={!event.image}
            />
            <span>Horizontal</span>
          </label>
        </div>
      </div>
    </Card>
  );
}
