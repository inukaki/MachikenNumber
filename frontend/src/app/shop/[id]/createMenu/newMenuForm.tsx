'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { menuSchema } from '@/schema/menuSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function CreateMenu({ id }: { id: string | string[] }) {
  const [sliderValue, setSliderValue] = useState(5);
  const router = useRouter();

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      price: 300,
      time: 5,
    },
  });

  async function onSubmit(data: z.infer<typeof menuSchema>) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, shop_id: id }),
      });
      if (res.ok) {
        form.reset(); // フォームをリセット
        router.refresh(); // データの再フェッチをトリガー
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-full items-center justify-center ">
      <Card className="bg-primary/5 w-[420px]">
        <CardHeader>
          <CardTitle>メニューの追加登録</CardTitle>
          <CardDescription>以下の情報を入力してメニューを追加してください</CardDescription>
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
                      <Input className="w-4/5 bg-white" placeholder="焼きそば" {...field} />
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
                          className="w-4/5 bg-white"
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                          defaultValue={[field.value]}
                          max={20}
                          step={1}
                          className={cn('w-[80%]')}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                            setSliderValue(value[0]);
                          }}
                        />
                        <span>{sliderValue}分</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit">登録</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
