import { addDays, setMinutes, setSeconds, setMilliseconds } from "date-fns";

export const initialEvent = {
  occursAt: setMilliseconds(
    setSeconds(setMinutes(addDays(new Date(), 1), 0), 0),
    0
  ),
  endsAt: null,
  title: "",
  description: "",
  host: "",
  image: null,
  locationOnline: true,
  location: "",
  capacity: null,
  registrationRequired: false,
};

export const initialStyling = {
  colorMode: "light",
  layout: "automatic",
};
