'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface MenuItem {
    id: string;
    name: string;
    price: number;
}

interface OrderItem extends MenuItem {
    quantity: number;
}

export default function OrderMenu({ id, menu }: { id: string; menu: MenuItem[] }) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const router = useRouter();

    const handleSubmitOrder = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: orderItems.map((item) => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (!response.ok) throw new Error('注文の送信に失敗しました');

            toast({
                title: '注文が完了しました',
                description: `合計金額: ¥${calculateTotal()}`,
            });
            setOrderItems([]);
            router.refresh(); // 注文リストを更新
        } catch (error) {
            console.error('Error submitting order:', error);
            toast({
                title: 'エラーが発生しました',
                description: '注文の送信中にエラーが発生しました。もう一度お試しください。',
                variant: 'destructive',
            });
        }
    };

    const handleCheckboxChange = (item: MenuItem, isChecked: boolean) => {
        if (isChecked) {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        } else {
            setOrderItems(orderItems.filter((orderItem) => orderItem.id !== item.id));
        }
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        setOrderItems(
            orderItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
            ),
        );
    };

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="mx-auto max-w-md p-4">
            <h1 className="mb-4 text-2xl font-bold">注文メニュー</h1>
            <p className="mb-4">注文ID: {id}</p>
            <div className="space-y-4">
                {menu.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={item.id}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange(item, checked as boolean)
                            }
                        />
                        <Label htmlFor={item.id} className="grow">
                            {item.name} - ¥{item.price}
                        </Label>
                        {orderItems.some((orderItem) => orderItem.id === item.id) && (
                            <Input
                                type="number"
                                min="1"
                                value={
                                    orderItems.find((orderItem) => orderItem.id === item.id)
                                        ?.quantity || 1
                                }
                                onChange={(e) =>
                                    handleQuantityChange(item.id, parseInt(e.target.value))
                                }
                                className="w-20"
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <p className="font-bold">合計: ¥{calculateTotal()}</p>
                <Button
                    onClick={handleSubmitOrder}
                    className="mt-2 w-full"
                    disabled={orderItems.length === 0}>
                    注文する
                </Button>
            </div>
        </div>
    );
}
