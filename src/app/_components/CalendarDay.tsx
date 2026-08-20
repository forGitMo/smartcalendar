type CalendarDayEvent = {
  id: number;
  label: string;
  className: string;
};

type CalendarDayProps = {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarDayEvent[];
  onSelect: () => void;
};

export function CalendarDay({
  day,
  isToday,
  isSelected,
  events,
  onSelect,
}: CalendarDayProps) {
  return (
    <button
      onClick={onSelect}
      className="min-h-28 border-b border-r border-gray-100 p-3 text-left transition hover:bg-gray-50"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
          isSelected
            ? "bg-blue-600 text-white"
            : isToday
              ? "bg-gray-900 text-white"
              : "text-gray-700"
        }`}
      >
        {day}
      </span>
      <div className="mt-2 space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className={`truncate rounded-md px-2 py-1 text-xs font-medium ${event.className}`}
          >
            {event.label}
          </div>
        ))}
      </div>
    </button>
  );
}