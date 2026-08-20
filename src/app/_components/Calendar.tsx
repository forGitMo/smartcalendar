"use client";

import { useState, type FormEvent } from "react";
import { CalendarDay } from "./CalendarDay";
import { CalendarEventItem } from "./CalendarEventItem";

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  calendarId: string;
};

type CalendarCategory = {
  id: string;
  name: string;
  eventClassName: string;
};

const calendars: CalendarCategory[] = [
  {
    id: "private",
    name: "Privat",
    eventClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "university",
    name: "Hochschule",
    eventClassName: "bg-blue-50 text-blue-700",
  },
  {
    id: "work",
    name: "Arbeit",
    eventClassName: "bg-red-50 text-red-700",
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState("09:00");
  const [newEventEndTime, setNewEventEndTime] = useState("10:00");
  const [newEventCalendarId, setNewEventCalendarId] =
  useState("private");

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

  function formatDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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

  function selectDay(day: number) {
    setSelectedDate(new Date(year, month, day));
  }

  function addEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedDate === null) {
      return;
    }

    if (newEventTitle.trim() === "") {
      return;
    }

    if (newEventEndTime <= newEventStartTime) {
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: newEventTitle.trim(),
      date: formatDateKey(selectedDate),
      startTime: newEventStartTime,
      endTime: newEventEndTime,
      calendarId: newEventCalendarId,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    setNewEventTitle("");
  }

  function deleteEvent(id: number) {
    setEvents((currentEvents) =>
      currentEvents.filter((calendarEvent) => calendarEvent.id !== id),
    );
  }

  function renameEvent(id: number, newTitle: string) {
    setEvents((currentEvents) =>
      currentEvents.map((calendarEvent) =>
        calendarEvent.id === id
          ? { ...calendarEvent, title: newTitle }
          : calendarEvent,
      ),
    );
  }

  const today = new Date();

  const selectedEvents =
    selectedDate === null
      ? []
      : events
          .filter(
            (calendarEvent) =>
              calendarEvent.date === formatDateKey(selectedDate),
          )
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

  function getCalendarById(calendarId: string) {
    return (
      calendars.find((calendar) => calendar.id === calendarId) ??
      calendars[0]
    );
  }

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

            const isSelected =
              selectedDate !== null &&
              day === selectedDate.getDate() &&
              month === selectedDate.getMonth() &&
              year === selectedDate.getFullYear();

            const dateKey = formatDateKey(
              new Date(year, month, day),
            );

            const dayEvents = events
              .filter((event) => event.date === dateKey)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((event) => {
                const calendar = getCalendarById(event.calendarId);

                return {
                  id: event.id,
                  label: `${event.startTime} ${event.title}`,
                  className:
                    calendar?.eventClassName ?? "bg-gray-50 text-gray-700",
                };
              });

            return (
              <CalendarDay
                key={day}
                day={day}
                isToday={isToday}
                isSelected={isSelected}
                events={dayEvents}
                onSelect={() => selectDay(day)}
              />
            );
          })}
        </div>
      </div>
      {selectedDate && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Ausgewählter Tag
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            {selectedDate.toLocaleDateString("de-DE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mt-5">
            <h3 className="mb-3 font-semibold text-gray-900">
              Termine
            </h3>

            {selectedEvents.length === 0 ? (
              <p className="text-sm text-gray-500">
                Für diesen Tag gibt es noch keine Termine.
              </p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map((calendarEvent) => {
                  const calendar = getCalendarById(calendarEvent.calendarId);

                  return (
                    <CalendarEventItem
                      key={calendarEvent.id}
                      title={calendarEvent.title}
                      startTime={calendarEvent.startTime}
                      endTime={calendarEvent.endTime}
                      calendarName={calendar?.name ?? "Unbekannt"}
                      calendarClassName={
                        calendar?.eventClassName ?? "bg-gray-50 text-gray-700"
                      }
                      onRename={(newTitle) =>
                        renameEvent(calendarEvent.id, newTitle)
                      }
                      onDelete={() => deleteEvent(calendarEvent.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {/* Add Event Form */}
          <form
            onSubmit={addEvent}
            className="mt-5 space-y-4"
          >
            <div>
              <label
                htmlFor="event-title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Titel
              </label>
              <div>
                <label
                  htmlFor="event-calendar"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Kalender
                </label>

                <select
                  id="event-calendar"
                  value={newEventCalendarId}
                  onChange={(event) => setNewEventCalendarId(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-gray-400"
                >
                  {calendars.map((calendar) => (
                    <option
                      key={calendar.id}
                      value={calendar.id}
                    >
                      {calendar.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                id="event-title"
                type="text"
                value={newEventTitle}
                onChange={(event) => setNewEventTitle(event.target.value)}
                placeholder="z. B. Vorlesung"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="event-start"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Beginn
                </label>

                <input
                  id="event-start"
                  type="time"
                  value={newEventStartTime}
                  onChange={(event) => setNewEventStartTime(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="event-end"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Ende
                </label>

                <input
                  id="event-end"
                  type="time"
                  value={newEventEndTime}
                  onChange={(event) => setNewEventEndTime(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-5 py-2 font-medium text-white hover:bg-gray-800"
            >
              Termin hinzufügen
            </button>
          </form>
        </div> 
      )}
    </div>
  );
}