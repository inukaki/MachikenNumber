'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Clock, Trash2, Check, ShoppingBag } from 'lucide-react';
import { formatDate } from '@/actions/formatDate';
import { ConfirmationModal } from './confirmation-modal';
import { cn } from '@/lib/utils';
import * as React from 'react';
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
  status: 0 | 1 | 2;
}

export default function OrderList({ orderData, shopId }: { orderData: Order[]; shopId: string }) {
  const [orders, setOrders] = useState<Order[]>(orderData);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setOrders(orderData); // 最新の orderData を反映
  }, [orderData]);

  async function updateOrderStatus(orderId: string, newStatus: 1 | 2) {
    try {
      if (newStatus === 1) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/orders/${orderId}/${shopId}/ready`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (newStatus === 2) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/orders/${orderId}/${shopId}/received`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      setOrders(
        orders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error('注文状態の更新に失敗しました:', error);
    }
  }

  async function deleteOrder(orderId: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`);
      }

      setOrders(orders.filter((order) => order.order_id !== orderId));
      router.refresh();
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

  const incompleteOrders = orders.filter((order) => order.status === 0);
  const completeOrders = orders.filter((order) => order.status === 1 || order.status === 2);

  return (
    <div className="mt-8 pb-20">
      <h2 className="mb-4 text-xl font-bold">注文リスト</h2>
      {orders.length === 0 ? (
        <p>現在の注文はありません。</p>
      ) : (
        <Tabs defaultValue="incomplete" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incomplete">未完了 ({incompleteOrders.length})</TabsTrigger>
            <TabsTrigger value="complete">完了 ({completeOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="incomplete">
            <OrderGrid
              orders={incompleteOrders}
              updateOrderStatus={updateOrderStatus}
              handleDeleteClick={handleDeleteClick}
              deleteOrder={deleteOrder}
            />
          </TabsContent>
          <TabsContent value="complete">
            <OrderGrid
              orders={completeOrders}
              updateOrderStatus={updateOrderStatus}
              handleDeleteClick={handleDeleteClick}
              deleteOrder={deleteOrder}
            />
          </TabsContent>
        </Tabs>
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

function OrderGrid({
  orders,
  updateOrderStatus,
  handleDeleteClick,
  deleteOrder,
}: {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: 1 | 2) => void;
  handleDeleteClick: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <Card key={order.order_id} className="overflow-hidden">
          <CardHeader className="bg-primary/10 py-2">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4" />
                {order.card_number}
              </div>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Clock className="size-3" />
                {formatDate(order.create_at)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ul className="mb-3 space-y-1 text-sm">
              {order.items.map((item) => (
                <li key={item.item_id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.count}点 - ¥{item.price * item.count} (
                      {parseInt(item.time) * item.count}分)
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              {order.status === 0 && (
                <Button size="sm" onClick={() => updateOrderStatus(order.order_id, 1)}>
                  完了にする
                </Button>
              )}
              {order.status === 1 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    // updateOrderStatus(order.order_id, 2);
                    deleteOrder(order.order_id);
                  }}>
                  <ShoppingBag className="mr-2 size-4" />
                  準備完了
                </Button>
              )}
              {order.status === 2 && (
                <Button size="sm" variant="secondary" disabled>
                  <Check className="mr-2 size-4" />
                  受け渡し済み
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteClick(order.order_id)}>
                <Trash2 className="mr-2 size-4" />
                削除
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
