import { getOrders } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';

interface Item {
  name: string;
  time: number;
  count: number;
}

interface Order {
  order_id: string;
  card_number: string;
  items: Item[];
  create_at: string;
}

interface OrderPageProps {
  params: { shopId: string; cardNumber: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { shopId, cardNumber } = params;
  const orders = await getOrders(shopId);
  const userOrder = orders.find((order: Order) => order.card_number === cardNumber);

  if (!userOrder) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="mb-4 text-xl">指定された注文が見つかりません</p>
        <Link href={`/client/shops/${shopId}`}>
          <Button className="px-10 py-2" size="lg">
            店舗ページに戻る
          </Button>
        </Link>
      </div>
    );
  }

  const ordersAhead = orders.filter(
    (order: Order) => new Date(order.create_at) < new Date(userOrder.create_at),
  );

  const totalWaitTime = calculateTotalWaitTime(ordersAhead, userOrder);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href={`/client/shops/${shopId}`} className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span>戻る</span>
            </Link>
            <h1 className="text-lg font-semibold">注文詳細</h1>
            <div className="w-20" /> {/* スペーサー */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium text-indigo-100">あなたの待ち時間</p>
              <p className="text-4xl font-bold">{totalWaitTime}分</p>
              <p className="mt-1 text-sm text-indigo-100">
                あなたの前に {ordersAhead.length} 件の注文があります
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">注文番号</p>
              <p className="text-2xl font-bold text-gray-900">#{cardNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">注文時間</p>
              <p className="text-gray-900">
                {new Date(userOrder.create_at).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {userOrder.items.map((item: Item, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.time}分 × {item.count}個
                  </p>
                </div>
                <p className="font-medium">{item.time * item.count}分</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateTotalWaitTime(ordersAhead: Order[], userOrder: Order) {
  const previousOrdersTime = ordersAhead.reduce((total, order) => {
    return total + order.items.reduce((itemTotal, item) => itemTotal + item.time * item.count, 0);
  }, 0);

  const userOrderTime = userOrder.items.reduce((total, item) => total + item.time * item.count, 0);

  return previousOrdersTime + userOrderTime;
}
