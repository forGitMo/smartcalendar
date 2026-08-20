import { Sidebar } from "./_components/Sidebar";
import { Calendar } from "./_components/Calendar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <section className="flex-1 p-8">
        <Calendar />
      </section>
    </main>
  );
}