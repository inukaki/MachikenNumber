import EventDetails from '@/components/event/EventDetails';
import EventHome from '@/components/event/EventHome';

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold ">イベントID</h1>
      <EventHome event_id={params.id} />
      <h1 className="text-2xl font-bold ">詳細設定</h1>
      <EventDetails event_id={params.id} />
    </div>
  );
}
