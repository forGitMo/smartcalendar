"use client";

import { useState } from "react";
import { Calendar } from "./Calendar";
import { Sidebar } from "./Sidebar";
import { calendars } from "./calendarData";

export function SmartCalendarApp() {
  const [visibleCalendarIds, setVisibleCalendarIds] = useState(
    calendars.map((calendar) => calendar.id),
  );

  function toggleCalendar(calendarId: string) {
    setVisibleCalendarIds((currentIds) => {
      if (currentIds.includes(calendarId)) {
        return currentIds.filter((id) => id !== calendarId);
      }

      return [...currentIds, calendarId];
    });
  }

  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar
        visibleCalendarIds={visibleCalendarIds}
        onToggleCalendar={toggleCalendar}
      />

      <section className="flex-1 p-8">
        <Calendar
          visibleCalendarIds={visibleCalendarIds}
        />
      </section>
    </main>
  );
}