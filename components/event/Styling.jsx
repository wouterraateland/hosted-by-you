import cx from "classnames";

import { useContext } from "react";
import { StylingContext } from "contexts";

import Card from "components/ui/Card";
import Button from "components/ui/Button";

export default function EventStyling() {
  const [styling, setStyling] = useContext(StylingContext);
  return (
    <Card className="flex items-center p-4 space-x-8">
      <div className="space-y-1">
        <p className="text-gray-500 font-bold uppercase text-sm">
          Color Scheme
        </p>
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
      <div className="space-y-1">
        <p className="text-gray-500 font-bold uppercase text-sm">Layout</p>
        <div className="flex items-center space-x-4">
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
            />
            <span>Horizontal</span>
          </label>
        </div>
      </div>
    </Card>
  );
}
