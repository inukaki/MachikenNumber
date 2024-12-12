'use client';
import { getOrders } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Order } from '@/types/orderTypes';
import { sortOrdersByDate, calculateCumulativeWaitTime } from '@/lib/utils';

export default function Home({ params }: { params: { shop_id: string } }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = await getOrders();
        setOrders(sortOrdersByDate(fetchedOrders));
      } catch (err) {
        console.error('注文の取得中にエラーが発生しました:', err);
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      }
    }
    fetchOrders();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get('cardNumber') as string;
    router.push(`/client/${params.shop_id}/${cardNumber}`);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold text-red-600">エラーが発生しました</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">注文待ち時間リスト</h1>
      <ul className="mb-8 space-y-2">
        {orders.map((order) => (
          <li key={order.order_id} className="rounded bg-gray-100 p-2">
            注文番号: {order.card_number} - 待ち時間: {calculateCumulativeWaitTime(orders, order)}分
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input type="text" name="cardNumber" placeholder="カード番号を入力" required />
        <Button type="submit">確認</Button>
      </form>
    </div>
  );
}
