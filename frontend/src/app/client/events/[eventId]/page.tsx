import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Clock, ArrowLeft, Store } from 'lucide-react';

interface Shop {
  shop_id: string;
  name: string;
  description: string;
  status: boolean;
  wait_time: number;
}

interface EventDetail {
  event_id: string;
  name: string;
  description: string;
  shops: Shop[];
}

async function getEventDetail(eventId: string) {
  const res = await fetch(`http://localhost:3001/events/${eventId}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event: EventDetail = await getEventDetail(params.eventId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/client" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span>戻る</span>
            </Link>
            <h1 className="text-lg font-semibold">{event.name}</h1>
            <div className="w-20" /> {/* スペーサー */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <Store className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium text-blue-100">現在の出店数</p>
              <p className="text-4xl font-bold">{event.shops.length}店舗</p>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">店舗を選択</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {event.shops.map((shop) => (
            <Link key={shop.shop_id} href={`/client/shops/${shop.shop_id}`}>
              <div className="group flex items-center justify-between rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex-1 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold group-hover:text-indigo-600">
                      {shop.name}
                    </h2>
                    <Badge variant={shop.status ? 'default' : 'secondary'}>
                      {shop.status ? '営業中' : '休業中'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{shop.description}</p>
                </div>
                <div className="flex flex-col items-end justify-center border-l border-gray-100 pl-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="mt-1 text-center">
                    <span className="text-2xl font-bold text-blue-600">{shop.wait_time}</span>
                    <span className="ml-1 text-sm text-gray-500">分</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
