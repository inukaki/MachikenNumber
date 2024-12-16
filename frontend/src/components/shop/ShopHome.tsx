'use client';

import React, { useMemo, useState } from 'react';
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import QRCodeReact from 'react-qr-code';
import * as QRCode from 'qrcode';
import { toast } from '@/hooks/use-toast';

const ShopHome = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const qrCodeUrl = useMemo(() => {
    const shopId = Array.isArray(id) ? id[0] : id;
    return `http://localhost:3000/client/${shopId}`;
  }, [id]);

  const form = useForm<z.infer<typeof eventIdSchema>>({
    resolver: zodResolver(eventIdSchema),
    defaultValues: {
      eventId: '',
    },
  });

  async function onSubmit(data: z.infer<typeof eventIdSchema>) {
    setIsSubmitting(true);
    try {
      const shopId = Array.isArray(id) ? id[0] : id;
      const res = await fetch(`/api/shop/${shopId}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: data.eventId, shopId }),
      });
      if (res.ok) {
        toast({
          title: 'イベント登録成功',
          description: 'イベントが正常に登録されました。',
        });
      } else {
        throw new Error('イベント登録に失敗しました');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'エラー',
        description: 'イベント登録中にエラーが発生しました。',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDownload = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(qrCodeUrl);
      const link = document.createElement('a');
      link.download = `qrcode-${Array.isArray(id) ? id[0] : id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('QRコードの生成に失敗しました', err);
      toast({
        title: 'エラー',
        description: 'QRコードの生成に失敗しました。',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-[350px] items-center">
        <CardHeader>
          <CardTitle>ショップ管理: {Array.isArray(id) ? id[0] : id}</CardTitle>
          <CardDescription>ショップの各種設定を行います</CardDescription>
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
                      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? '送信中...' : '送信'}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="w-full" variant="outline">
                    QRコードを表示
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>QRコード</DrawerTitle>
                    <DrawerDescription>
                      このQRコードをスキャンしてクライアントページにアクセスできます。
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex justify-center p-4">
                    <QRCodeReact
                      value={qrCodeUrl}
                      aria-label={`クライアントページへのQRコード: ${qrCodeUrl}`}
                    />
                  </div>
                  <DrawerFooter>
                    <Button onClick={handleDownload}>QRコードをダウンロード</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">閉じる</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/order`}>
                <Button className="w-full" variant="outline">
                  注文関連
                </Button>
              </Link>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/createMenu`}>
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
