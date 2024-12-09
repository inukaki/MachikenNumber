'use client';

import React from 'react';
import { eventIdSchema } from '@/schema/eventIdSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const ShopHome = () => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof eventIdSchema>>({
    resolver: zodResolver(eventIdSchema),
    defaultValues: {
      eventId: '',
    },
  });

  async function onSubmit(data: z.infer<typeof eventIdSchema>) {
    try {
      const res = await fetch(`/api/shop/${id}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: data.eventId, shopId: id }),
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle>Create project: {id}</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">イベントの登録</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>イベントIDを入力してください</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                          control={form.control}
                          name="eventId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Link href={`/shop/${id}/order`}>
                <Button className="w-full" variant="outline">
                  注文関連
                </Button>
              </Link>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Link href={`/shop/${id}/createMenu`}>
                <Button className="w-full" variant="outline">
                  メニューの登録
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopHome;
