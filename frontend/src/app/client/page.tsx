import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface Event {
  event_id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
}

async function getEvents() {
  const res = await fetch('http://localhost:3001/events', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            <h1 className="text-lg font-semibold">イベント一覧から選択</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event: Event) => (
            <Link key={event.event_id} href={`client/events/${event.event_id}`}>
              <div className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-blue-600">
                      {event.name}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="size-4" />
                      <span>
                        {new Date(event.start_at).toLocaleDateString('ja-JP')} -
                        {new Date(event.end_at).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
