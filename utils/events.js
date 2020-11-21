export const normalizeEventDates = (event) =>
  event
    ? {
        ...event,
        occursAt: event.occursAt ? new Date(event.occursAt) : null,
        endsAt: event.endsAt ? new Date(event.endsAt) : null,
        createdAt: event.createdAt ? new Date(event.createdAt) : null,
        updatedAt: event.updatedAt ? new Date(event.updatedAt) : null,
      }
    : null;

export const normalizeEventStyling = (styling) => ({
  colorMode: ["light", "dark"].includes(styling?.colorMode)
    ? styling?.colorMode
    : "light",
  layout: ["automatic", "horizontal", "vertical"].includes(styling?.layout)
    ? styling?.layout
    : "automatic",
});
