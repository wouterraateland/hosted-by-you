import { setMinutes, setSeconds, setMilliseconds } from "date-fns";

export const initialEvent = {
  occursAt: setMilliseconds(setSeconds(setMinutes(new Date(), 0), 0), 0),
  deadlineAt: null,
  endsAt: null,
  title: "Origami club evening",
  description: "Let's come together and create the most amazing origami's",
  host: "Jo Nakashima",
  image: "https://i.ytimg.com/vi/hFkGoFKMDI8/maxresdefault.jpg",
  locationOnline: true,
  location: "https://zoom.us/j/348924",
  capacity: 15,
  participants: 8,
  registrationRequired: false,
};

export const initialStyling = {
  colorMode: "light",
  layout: "automatic",
};
