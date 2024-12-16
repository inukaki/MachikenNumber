import type { Payment } from '@/components/menu/dataTable/columns';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { menuSchema } from '@/schema/menuSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';

interface MenuEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment;
  shopId: string;
}

export function MenuEditModal({ open, onOpenChange, payment, shopId }: MenuEditModalProps) {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: payment.name,
      price: payment.price,
      time: payment.time,
    },
  });

  useEffect(() => {
    if (!isInitialized) {
      form.reset({
        name: payment.name,
        price: payment.price,
        time: payment.time,
      });
      setIsInitialized(true);
    }
  }, [payment, form, isInitialized]);

  async function onSubmit(data: z.infer<typeof menuSchema>) {
    try {
      const res = await fetch(`/api/shop/${shopId}/menu/${payment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('メニューを更新しました');
        router.refresh(); // データの再フェッチをトリガー
        onOpenChange(false); // モーダルを閉じる
      } else {
        console.error('Failed to update menu');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <CardHeader>
          <CardTitle>メニューの編集</CardTitle>
          <CardDescription>メニューの編集後は保存ボタンを押してください</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商品名</FormLabel>
                    <FormControl>
                      <Input className="w-4/5" {...field} />
                    </FormControl>
                    <FormDescription>トッピングは商品名に含めてください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>価格</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input
                          className="w-4/5"
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <span>円/単価</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>予想提供時間</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[field.value]}
                          max={20}
                          step={1}
                          className={cn('w-[80%]')}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                          }}
                        />
                        <span>{field.value}分</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">変更を保存</Button>
            </form>
          </Form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
