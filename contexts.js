import { createContext } from "react";
import { initialEvent, initialStyling } from "data";

export const EventContext = createContext([initialEvent, () => {}]);
export const StylingContext = createContext([initialStyling, () => {}]);
