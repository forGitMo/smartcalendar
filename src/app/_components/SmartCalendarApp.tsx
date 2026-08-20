"use client";

import { useState } from "react";
import { Calendar } from "./Calendar";
import { Sidebar } from "./Sidebar";
import {
  defaultCalendars,
  type CalendarCategory,
} from "./calendarData";

export function SmartCalendarApp() {
  const [calendars, setCalendars] =
    useState<CalendarCategory[]>(defaultCalendars);
  const [visibleCalendarIds, setVisibleCalendarIds] = useState(
    defaultCalendars.map((calendar) => calendar.id),
  );

  function toggleCalendar(calendarId: string) {
    setVisibleCalendarIds((currentIds) => {
      if (currentIds.includes(calendarId)) {
        return currentIds.filter((id) => id !== calendarId);
      }

      return [...currentIds, calendarId];
    });
  }

  function createCalendar(
    name: string,
    eventClassName: string,
  ) {
    const newCalendar: CalendarCategory = {
      id: crypto.randomUUID(),
      name,
      eventClassName,
    };

    setCalendars((currentCalendars) => [
      ...currentCalendars,
      newCalendar,
    ]);

    setVisibleCalendarIds((currentIds) => [
      ...currentIds,
      newCalendar.id,
    ]);
  }

  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar
        calendars={calendars}
        visibleCalendarIds={visibleCalendarIds}
        onToggleCalendar={toggleCalendar}
        onCreateCalendar={createCalendar}
      />

      <section className="flex-1 p-8">
        <Calendar
          calendars={calendars}
          visibleCalendarIds={visibleCalendarIds}
        />
      </section>
    </main>
  );
}