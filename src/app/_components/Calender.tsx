"use client";

import { useState } from "react";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const firstDayMondayBased = (firstDayOfMonth + 6) % 7;

  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const calendarDays = Array.from(
  { length: firstDayMondayBased + daysInMonth },
  (_, index) => {
    if (index < firstDayMondayBased) {
      return null;
    }

    return index - firstDayMondayBased + 1;
  },
);

  const monthName = currentDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      ),
    );
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      ),
    );
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const today = new Date();

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Kalender</p>

          <h2 className="text-3xl font-bold capitalize text-gray-900">
            {monthName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            &lt;
          </button>

          <button
            onClick={goToToday}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Heute
          </button>

          <button
            onClick={goToNextMonth}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            &gt;
          </button>
        </div>
      </header>
      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="px-4 py-3 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-28 border-b border-r border-gray-100 bg-gray-50"
                />
              );
            }
            const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

            return (
              <div
                key={day}
                className={`min-h-28 border-b border-r border-gray-100 p-3 ${isToday ? 'bg-blue-100 text-white' : ''}`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isToday
                      ? "bg-gray-900 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}