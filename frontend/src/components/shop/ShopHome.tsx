'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { eventIdSchema } from '@/schema/eventIdSchema';
import { Button } from '@/components/ui/button';
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
import type { User } from '@prisma/client';
import { Store, QrCode, Utensils, FileText, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '@/actions/formatDate';
import type { EventData } from '../../../types/orderTypes';

const ShopHome = ({ user }: { user: User }) => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);

  const qrCodeUrl = useMemo(() => {
    const shopId = Array.isArray(id) ? id[0] : id;
    return `http://localhost:3000/client/shops/${shopId}`;
  }, [id]);

  const form = useForm<z.infer<typeof eventIdSchema>>({
    resolver: zodResolver(eventIdSchema),
    defaultValues: {
      eventId: '',
    },
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/${id}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        }
      } catch (error) {
        console.error(error);
        toast.error('イベント情報の取得に失敗しました');
      }
    };

    fetchEventData();
  }, [id]);

  async function onSubmit(data: z.infer<typeof eventIdSchema>) {
    setIsSubmitting(true);
    try {
      const shopId = Array.isArray(id) ? id[0] : id;
      const res = await fetch(`http://localhost:3001/events/${data.eventId}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop_id: shopId }),
      });
      if (res.ok) {
        toast.success('イベント登録が完了しました');
        const response = await fetch(`http://localhost:3001/events/${data.eventId}`, {
          method: 'GET',
        });
        if (response.ok) {
          const eventData = await response.json();
          setEventData(eventData);
        }
      } else {
        throw new Error('イベント登録に失敗しました');
      }
    } catch (error) {
      console.error(error);
      toast.error('イベント登録に失敗しました');
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
      toast.error('QRコードの生成に失敗しました');
    }
  };

  async function deleteShopEvent(eventId: string) {
    try {
      const shopId = Array.isArray(id) ? id[0] : id;
      const res = await fetch(`http://localhost:3001/events/${eventId}/shops`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopId }),
      });
      if (res.ok) {
        toast.success('イベントの紐付け解除が完了しました');
        setEventData(null);
      } else {
        throw new Error('イベントの紐付け解除に失敗しました');
      }
    } catch (error) {
      console.error(error);
      toast.error('イベントの紐付け解除に失敗しました');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-4">
        <header className="bg-primary/10 mb-8 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <Store className="text-primary size-12" />
            <div>
              <h1 className="text-primary text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground text-sm">ショップ管理ダッシュボード</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary size-5" />
                  <h2 className="text-lg font-semibold">イベント管理</h2>
                </div>
              </div>

              {eventData ? (
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-md p-4">
                    <p className="text-primary font-medium">{eventData.name}</p>
                    <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                      <Clock className="size-4" />
                      <span>
                        {formatDate(eventData.start_at)} - {formatDate(eventData.end_at)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => deleteShopEvent(eventData.event_id)}>
                    イベントの紐付け解除
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">イベントに参加</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>イベントIDを入力</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="eventId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>イベントID</FormLabel>
                              <FormControl>
                                <Input placeholder="イベントIDを入力してください" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? '送信中...' : '登録する'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="bg-card rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-2">
                <QrCode className="text-primary size-5" />
                <h2 className="text-lg font-semibold">QRコード</h2>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="w-full" variant="outline">
                    QRコードを表示
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>店舗QRコード</DrawerTitle>
                    <DrawerDescription>
                      このQRコードをスキャンすると注文ページにアクセスできます
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex justify-center p-4">
                    <QRCodeReact value={qrCodeUrl} />
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
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-2">
                <Utensils className="text-primary size-5" />
                <h2 className="text-lg font-semibold">注文管理</h2>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                注文の確認、ステータス更新、履歴の管理ができます
              </p>
              <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/order`}>
                <Button className="w-full">注文管理へ</Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="text-primary size-5" />
                <h2 className="text-lg font-semibold">メニュー管理</h2>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                メニューの登録、編集、価格設定ができます
              </p>
              <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/createMenu`}>
                <Button className="w-full">メニュー管理へ</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
