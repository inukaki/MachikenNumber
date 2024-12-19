'use client';

import React, { useMemo, useState } from 'react';
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
import { toast } from '@/hooks/use-toast';
import type { User } from '@prisma/client';
import { Store, QrCode, Utensils, FileText, Calendar } from 'lucide-react';

const ShopHome = ({ user }: { user: User }) => {
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
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-2">
          <Store className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            ようこそ！
            <br />
            {user.name}さん
          </h1>
          <p className="text-indigo-600">ショップの各種設定を行います</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <Calendar className="w-5 h-5 mr-2" />
              イベント登録
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
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
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <QrCode className="w-5 h-5 mr-2" />
              QRコード
            </h2>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
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

          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <Utensils className="w-5 h-5 mr-2" />
              注文管理
            </h2>
            <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/order`}>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                注文関連
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <FileText className="w-5 h-5 mr-2" />
              メニュー管理
            </h2>
            <Link href={`/shop/${Array.isArray(id) ? id[0] : id}/createMenu`}>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
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
