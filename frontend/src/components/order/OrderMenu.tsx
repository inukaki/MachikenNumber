'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Minus } from 'lucide-react';

interface MenuItem {
  item_id: string;
  shop_id: string;
  name: string;
  price: number;
}

interface OrderItem extends MenuItem {
  count: number;
}

interface UnreadyOrder {
  order_id: string;
  shop_id: string;
  card_number: string;
  create_at: string;
  status: number;
  items: Array<{
    item_id: string;
    count: number;
    time: number;
    price: number;
    name: string;
  }>;
}

export default function OrderMenu({
  shopId,
  menu,
  unreadyOrders,
}: {
  shopId: string;
  menu: MenuItem[];
  unreadyOrders: UnreadyOrder[];
}) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const unreadyCardNumbers = unreadyOrders.map((order) => order.card_number);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCardNumber = e.target.value;
    setCardNumber(newCardNumber);
    if (unreadyCardNumbers.includes(newCardNumber)) {
      setCardError('このカードは現在使用中です。');
    } else {
      setCardError(null);
    }
  };

  const handleSubmitOrder = async () => {
    if (!cardNumber) {
      toast({
        title: 'エラー',
        description: 'カード番号を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    if (cardError) {
      toast({
        title: 'エラー',
        description: cardError,
        variant: 'destructive',
      });
      return;
    }

    if (unreadyCardNumbers.includes(cardNumber)) {
      toast({
        title: 'エラー',
        description: 'このカード番号は現在使用中です。',
        variant: 'destructive',
      });
      return;
    }

    setIsPending(true);

    try {
      // Check if the card number exists in any order
      // const existingOrderResponse = await fetch(`http://localhost:3001/orders/check/${cardNumber}`);
      // const existingOrderData = await existingOrderResponse.json();

      // if (existingOrderData.exists) {
      //   await fetch(`http://localhost:3001/orders/${existingOrderData.orderId}`, {
      //     method: 'DELETE',
      //   });
      // }

      const response = await fetch(`http://localhost:3001/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shop_id: shopId,
          card_number: cardNumber,
          items: orderItems.map((item) => ({ item_id: item.item_id, count: item.count })),
        }),
      });

      if (!response.ok) throw new Error('注文の送信に失敗しました');

      toast({
        title: '注文が完了しました',
        description: `合計金額: ¥${calculateTotal()}`,
      });
      setOrderItems([]);
      setCardNumber('');
      router.refresh();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'エラーが発生しました',
        description: '注文の送信中にエラーが発生しました。もう一度お試しください。',
        variant: 'destructive',
      });
      router.refresh();
    } finally {
      setIsPending(false);
    }
  };

  const handleCheckboxChange = (item: MenuItem, isChecked: boolean) => {
    if (isChecked) {
      setOrderItems([...orderItems, { ...item, count: 1 }]);
    } else {
      setOrderItems(orderItems.filter((orderItem) => orderItem.item_id !== item.item_id));
    }
  };

  const handleQuantityChange = (id: string, change: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.item_id === id ? { ...item, count: Math.max(1, item.count + change) } : item,
      ),
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div>
      <Card className="bg-primary/5 mx-auto mt-8 max-w-2xl">
        <CardHeader>
          <CardTitle>注文メニュー</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {menu.map((item) => (
              <Card key={item.item_id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={item.item_id}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(item, checked as boolean)
                        }
                      />
                      <Label htmlFor={item.item_id} className="font-medium">
                        {item.name}
                      </Label>
                    </div>
                    <span className="text-sm font-semibold">¥{item.price}</span>
                  </div>
                  {orderItems.some((orderItem) => orderItem.item_id === item.item_id) && (
                    <div className="mt-2 flex items-center justify-end space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.item_id, -1)}>
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-8 text-center">
                        {orderItems.find((orderItem) => orderItem.item_id === item.item_id)
                          ?.count || 1}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.item_id, 1)}>
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-4">
          <div>
            <Label htmlFor="card-number" className="mb-2 block">
              カード番号
            </Label>
            <Input
              id="card-number"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="カード番号を入力"
              className={`bg-white py-6 shadow-sm ${cardError ? 'border-red-500' : ''}`}
            />
            {cardError && <p className="mt-2 text-sm text-red-600">{cardError}</p>}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">合計: ¥{calculateTotal()}</p>
            <Button
              onClick={handleSubmitOrder}
              disabled={
                orderItems.length === 0 ||
                isPending ||
                !cardNumber ||
                unreadyCardNumbers.includes(cardNumber)
              }>
              {isPending ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>送信中...</span>
                </div>
              ) : (
                '注文する'
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
