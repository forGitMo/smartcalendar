export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6">
        <h1 className="text-2xl font-bold">Smart Calendar</h1>

        <nav className="mt-8">
          <ul className="space-y-4">
            <li>Übersicht</li>
            <li>Kalender</li>
            <li>Aufgaben</li>
          </ul>
        </nav>
      </aside>

      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold">Kalender</h2>
      </section>
    </main>
  );
}