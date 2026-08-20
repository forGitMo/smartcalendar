"use client";

import { useState, type FormEvent } from "react";

import {
  calendarColors,
  type CalendarCategory,
} from "./calendarData";

type SidebarProps = {
  calendars: CalendarCategory[];
  visibleCalendarIds: string[];
  onToggleCalendar: (calendarId: string) => void;
  onCreateCalendar: (
    name: string,
    eventClassName: string,
  ) => void;
};

export function Sidebar({
  calendars,
  visibleCalendarIds,
  onToggleCalendar,
  onCreateCalendar,
}: SidebarProps) {
  const [isCreatingCalendar, setIsCreatingCalendar] =
    useState(false);

  const [newCalendarName, setNewCalendarName] =
    useState("");

  const [selectedColorId, setSelectedColorId] =
    useState("blue");

  function handleCreateCalendar(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedName = newCalendarName.trim();

    if (cleanedName === "") {
      return;
    }

    const selectedColor = calendarColors.find(
      (color) => color.id === selectedColorId,
    );

    if (!selectedColor) {
      return;
    }

    onCreateCalendar(
      cleanedName,
      selectedColor.className,
    );

    setNewCalendarName("");
    setSelectedColorId("blue");
    setIsCreatingCalendar(false);
  }

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
          S
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Smart Calendar
          </h1>

          <p className="text-xs text-gray-500">
            Plan your day
          </p>
        </div>
      </div>

      <nav className="mt-10">
        <ul className="space-y-2">
          <li>
            <button className="w-full rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              Übersicht
            </button>
          </li>

          <li>
            <button className="w-full rounded-lg bg-gray-100 px-4 py-3 text-left font-medium text-gray-900">
              Kalender
            </button>
          </li>

          <li>
            <button className="w-full rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              Aufgaben
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-10">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Meine Kalender
        </p>

        <div className="space-y-1">
          {calendars.map((calendar) => {
            const isVisible =
              visibleCalendarIds.includes(calendar.id);

            return (
              <label
                key={calendar.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() =>
                    onToggleCalendar(calendar.id)
                  }
                />

                <span>{calendar.name}</span>
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsCreatingCalendar(true)}
          className="mt-3 w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          + Kalender hinzufügen
        </button>

        {isCreatingCalendar && (
          <form
            onSubmit={handleCreateCalendar}
            className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
          >
            <label
              htmlFor="calendar-name"
              className="text-xs font-medium text-gray-600"
            >
              Name
            </label>

            <input
              id="calendar-name"
              type="text"
              value={newCalendarName}
              onChange={(event) =>
                setNewCalendarName(event.target.value)
              }
              placeholder="z. B. Fitness"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            />

            <p className="mt-4 text-xs font-medium text-gray-600">
              Farbe
            </p>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {calendarColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() =>
                    setSelectedColorId(color.id)
                  }
                  className={`rounded-lg px-3 py-2 text-xs font-medium ${color.className} ${
                    selectedColorId === color.id
                      ? "ring-2 ring-gray-900 ring-offset-1"
                      : ""
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Erstellen
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCreatingCalendar(false);
                  setNewCalendarName("");
                  setSelectedColorId("blue");
                }}
                className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
              >
                Abbrechen
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-auto">
        <button className="w-full rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
          Einstellungen
        </button>
      </div>
    </aside>
  );
}