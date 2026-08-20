export type CalendarCategory = {
  id: string;
  name: string;
  eventClassName: string;
};

export const defaultCalendars: CalendarCategory[] = [
  {
    id: "private",
    name: "Privat",
    eventClassName: "bg-blue-50 text-blue-700",
  },
  {
    id: "university",
    name: "Hochschule",
    eventClassName: "bg-violet-50 text-violet-700",
  },
  {
    id: "work",
    name: "Arbeit",
    eventClassName: "bg-emerald-50 text-emerald-700",
  },
];

export const calendarColors = [
  {
    id: "blue",
    name: "Blau",
    className: "bg-blue-50 text-blue-700",
  },
  {
    id: "violet",
    name: "Violett",
    className: "bg-violet-50 text-violet-700",
  },
  {
    id: "emerald",
    name: "Grün",
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "orange",
    name: "Orange",
    className: "bg-orange-50 text-orange-700",
  },
];