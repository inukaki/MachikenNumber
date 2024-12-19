'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Clock, Trash2, Check } from 'lucide-react';
import { formatDate } from '@/actions/formatDate';
import { ConfirmationModal } from './confirmation-modal';

interface OrderItem {
  item_id: string;
  name: string;
  count: number;
  price: number;
  time: string;
}

interface Order {
  order_id: string;
  card_number: string;
  items: OrderItem[];
  create_at: string;
  status: 'incomplete' | 'complete';
}

export default function OrderList() {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    getOrder();
  }, [id]);

  async function getOrder() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data.map((order: Order) => ({ ...order, status: 'incomplete' })));
    } catch (error) {
      console.error('注文の取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string) {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'complete' }),
      });

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`);
      }

      setOrders(
        orders.map((order) =>
          order.order_id === orderId ? { ...order, status: 'complete' } : order,
        ),
      );
    } catch (error) {
      console.error('注文状態の更新に失敗しました:', error);
    }
  }

  async function deleteOrder(orderId: string) {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`);
      }

      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error('注文の削除に失敗しました:', error);
    }
  }

  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete);
      setDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className="mt-8 pb-20">
      <h2 className="mb-4 text-xl font-bold">注文リスト</h2>
      {orders.length === 0 ? (
        <p>現在の注文はありません。</p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.order_id} className="overflow-hidden ">
              <CardHeader className="bg-primary/10 py-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {order.card_number}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(order.create_at)}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <ul className="space-y-1 text-sm mb-3">
                  {order.items.map((item) => (
                    <li key={item.item_id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.count}点 - ¥{item.price * item.count} (
                          {parseInt(item.time) * item.count}分)
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant={order.status === 'complete' ? 'secondary' : 'default'}
                    onClick={() => updateOrderStatus(order.order_id)}
                    disabled={order.status === 'complete'}>
                    {order.status === 'complete' ? <Check className="h-4 w-4 mr-2" /> : null}
                    {order.status === 'complete' ? '完了済み' : '完了にする'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(order.order_id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="注文の削除"
        description="この注文を削除してもよろしいですか？この操作は取り消せません。"
      />
    </div>
  );
}
