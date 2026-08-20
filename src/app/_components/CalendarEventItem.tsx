"use client";

import { useState, type FormEvent } from "react";

type CalendarEventItemProps = {
  title: string;
  startTime: string;
  endTime: string;
  calendarName: string;
  calendarClassName: string;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
};

export function CalendarEventItem({
  title,
  startTime,
  endTime,
  calendarName,
  calendarClassName,
  onRename,
  onDelete,
}: CalendarEventItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  function saveEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedTitle = editTitle.trim();

    if (cleanedTitle === "") {
      return;
    }

    onRename(cleanedTitle);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditTitle(title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form
        onSubmit={saveEdit}
        className="flex items-center gap-2 rounded-lg border border-gray-200 p-3"
      >
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-gray-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
        >
          Speichern
        </button>

        <button
          type="button"
          onClick={cancelEdit}
          className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Abbrechen
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-800">
            {title}
          </p>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${calendarClassName}`}
          >
            {calendarName}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          {startTime} – {endTime}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Bearbeiten
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}