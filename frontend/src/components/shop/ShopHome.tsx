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
import { Store, QrCode, Utensils, FileText, Calendar } from 'lucide-react';
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
  }, []);

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
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-2 text-center">
          <Store className="mx-auto mb-4 size-16 text-indigo-600" />
          <h1 className="mb-2 text-3xl font-bold text-indigo-800">
            ようこそ！
            <br />
            {user.name}さん
          </h1>
          <p className="text-indigo-600">ショップの各種設定を行います</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105">
            {eventData ? (
              <>
                <h2 className="mb-4 flex items-center text-xl font-semibold text-indigo-700">
                  <Calendar className="mr-2 size-5" />
                  登録イベント情報
                </h2>
                <div className="mb-4">
                  <p>イベント名: {eventData.name}</p>
                  <p>開始時間: {formatDate(eventData.start_at)}</p>
                  <p>終了時間: {formatDate(eventData.end_at)}</p>
                </div>
                <Button
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => deleteShopEvent(eventData.event_id)}>
                  イベントの紐付け解除
                </Button>
              </>
            ) : (
              <>
                <h2 className="mb-4 flex items-center text-xl font-semibold text-indigo-700">
                  <Calendar className="mr-2 size-5" />
                  イベント登録
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                      イベントの登録
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>イベントIDを入力してください</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? '送信中...' : '送信'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105">
            <h2 className="mb-4 flex items-center text-xl font-semibold text-indigo-700">
              <QrCode className="mr-2 size-5" />
              QRコード
            </h2>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
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
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                    QRコードをダウンロード
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      閉じる
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105">
            <h2 className="mb-4 flex items-center text-xl font-semibold text-indigo-700">
              <Utensils className="mr-2 size-5" />
              注文管理
            </h2>
            <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/order`}>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                注文関連
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105">
            <h2 className="mb-4 flex items-center text-xl font-semibold text-indigo-700">
              <FileText className="mr-2 size-5" />
              メニュー管理
            </h2>
            <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/createMenu`}>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                メニューの登録
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
