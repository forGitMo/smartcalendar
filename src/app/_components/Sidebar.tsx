export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white p-6">
      <div>
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

      <div className="mt-auto">
        <button className="w-full rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
          Einstellungen
        </button>
      </div>
    </aside>
  );
}