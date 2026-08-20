export type CalendarCategory = {
  id: string;
  name: string;
  eventClassName: string;
};

export const calendars: CalendarCategory[] = [
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