type CalendarDayProps = {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  eventTitles: string[];
  onSelect: () => void;
};

export function CalendarDay({
  day,
  isToday,
  isSelected,
  eventTitles,
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
        {eventTitles.map((title, index) => (
          <div
          key={`${title}-${index}`}
          className="truncate rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
          >
              {title}
          </div>
        ))}
      </div>
    </button>
  );
}