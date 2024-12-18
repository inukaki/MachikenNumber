'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  status: '受付中' | '処理中' | '完了';
  createdAt: string;
}

export default function OrderList() {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getOrder() {
      try {
        const response = await fetch(`/api/shop/${id}/order`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getOrder();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">注文リスト</h2>
      {orders.length === 0 ? (
        <p>現在の注文はありません。</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} className="min-h-[220px]">
              <CardContent className="pt-6">
                <p className="font-bold">注文 ID: {order.id}</p>
                <p>ステータス: {order.status}</p>
                <p>注文日時: {new Date(order.createdAt).toLocaleString()}</p>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} - ¥{item.price * item.quantity}
                  </li>
                ))}
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
