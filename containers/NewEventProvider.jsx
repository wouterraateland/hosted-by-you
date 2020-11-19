import { useState } from "react";
import { EventContext, StylingContext } from "contexts";
import { initialEvent, initialStyling } from "data";

export default function NewEventProvider({ children }) {
  const event = useState(initialEvent);
  const styling = useState(initialStyling);

  return (
    <EventContext.Provider value={event}>
      <StylingContext.Provider value={styling}>
        {children}
      </StylingContext.Provider>
    </EventContext.Provider>
  );
}
