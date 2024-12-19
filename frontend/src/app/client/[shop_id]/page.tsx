'use client';

import { getOrders } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Item } from '../../../../types/orderTypes';

type Order = {
  order_id: string;
  card_number: string;
  items: Item[];
};

export default function Home(params: { shop_id: string }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  // const response = await fetch(`http://localhost:3001/orders/${params.shop_id}/unready`, {
  //   cache: 'no-store',
  // });
  // const orders = await response.json();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get('cardNumber');
    router.push(`/client/${params.shop_id}/${cardNumber}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">注文待ち時間リスト</h1>
      <ul className="mb-8 space-y-2">
        {orders.map((order) => (
          <li key={order.order_id} className="rounded bg-gray-100 p-2">
            注文番号: {order.card_number} - 待ち時間: {calculateWaitTime(order.items)}分
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

function calculateWaitTime(items: Item[]) {
  return items.reduce((total, item) => total + parseInt(item.time) * item.count, 0);
}
