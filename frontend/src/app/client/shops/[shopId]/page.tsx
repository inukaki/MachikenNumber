'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Search, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface OrderItem {
  item_id: string;
  count: number;
  time: number;
  name: string;
}

interface Order {
  order_id: string;
  card_number: string;
  status: number;
  wait_time: number;
  items: OrderItem[];
  create_at: string;
}

export default function ShopDetailPage({ params }: { params: { shopId: string } }) {
  const [unreadyOrders, setUnreadyOrders] = useState<Order[]>([]);
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const unreadyRes = await fetch(`http://localhost:3001/orders/${params.shopId}/unready`);
      const readyRes = await fetch(`http://localhost:3001/orders/${params.shopId}/ready`);
      const unready = await unreadyRes.json();
      const ready = await readyRes.json();
      setUnreadyOrders(unready);
      setReadyOrders(ready);
    };
    fetchOrders();
  }, [params.shopId]);

  const calculateTotalWaitTime = (orders: Order[]) => {
    return orders.reduce((total, order) => {
      return total + order.items.reduce((itemTotal, item) => itemTotal + item.time * item.count, 0);
    }, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber) {
      router.push(`/client/shops/${params.shopId}/${cardNumber}`);
    }
  };

  const totalWaitTime = calculateTotalWaitTime(unreadyOrders);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/client">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">注文状況</h1>
            <div className="w-10" /> {/* スペーサー */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 待ち時間サマリー */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-4">
            <Clock className="size-8" />
            <div>
              <p className="text-sm font-medium text-indigo-100">現在の総待ち時間</p>
              <p className="text-4xl font-bold">{totalWaitTime}分</p>
              <p className="mt-1 text-sm text-indigo-100">待ち件数: {unreadyOrders.length}件</p>
            </div>
          </div>
        </div>

        {/* 注文番号検索 */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="注文番号を入力して検索"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="h-12 bg-white pl-12 pr-4"
            />
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
              検索
            </Button>
          </form>
        </div>

        {/* 完了済み注文 */}
        {readyOrders.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-500" />
              <h2 className="text-lg font-medium">完了済み注文</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {readyOrders.map((order: Order) => (
                <span
                  key={order.order_id}
                  className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                  {order.card_number}
                </span>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* 待ち注文一覧 */}
        <div>
          <h2 className="mb-4 text-lg font-medium">タップで詳細を確認</h2>
          <div className="space-y-3">
            {unreadyOrders.map((order: Order) => {
              const waitTime = order.items.reduce(
                (total, item) => total + item.time * item.count,
                0,
              );
              return (
                <Link
                  key={order.order_id}
                  href={`/client/shops/${params.shopId}/${order.card_number}`}
                  className="block">
                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
                    <div>
                      <span className="text-lg font-medium">#{order.card_number}</span>
                      <p className="text-sm text-gray-500">注文番号</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-medium">{waitTime}分</span>
                      <p className="text-sm text-gray-500">待ち時間</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
