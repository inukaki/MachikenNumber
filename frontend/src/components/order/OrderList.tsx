'use client';

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

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders/${id}`);
            if (!response.ok) throw new Error('注文データの取得に失敗しました');
            const data = await response.json();
            // const data = [
            //     {
            //         id: '1',
            //         status: '受付中',
            //         createdAt: new Date().toISOString(),
            //         items: [
            //             {
            //                 id: '1',
            //                 name: '焼きそば',
            //                 quantity: 2,
            //                 price: 100,
            //             },
            //             {
            //                 id: '2',
            //                 name: '唐揚げ',
            //                 quantity: 1,
            //                 price: 80,
            //             },
            //         ],
            //     },
            //     {
            //         id: '2',
            //         status: '受付中',
            //         createdAt: new Date().toISOString(),
            //         items: [
            //             {
            //                 id: '1',
            //                 name: '焼きそば',
            //                 quantity: 1,
            //                 price: 100,
            //             },
            //             {
            //                 id: '2',
            //                 name: '唐揚げ',
            //                 quantity: 3,
            //                 price: 80,
            //             },
            //         ],
            //     },
            // ];
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">注文リスト</h2>
            {orders.length === 0 ? (
                <p>現在の注文はありません。</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order.id} className="rounded-md border p-4">
                            <p className="font-bold">注文 ID: {order.id}</p>
                            <p>状態: {order.status}</p>
                            <p>注文時刻: {new Date(order.createdAt).toLocaleString()}</p>
                            <ul className="mt-2">
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name} x {item.quantity} - ¥
                                        {item.price * item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
