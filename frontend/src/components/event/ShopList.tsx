'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import Modal from '@/components/event/Modal';
import { toast } from '@/hooks/use-toast';

const dateFormat = (date: string) => {
  const dates = new Date(date);
  return `${dates.getFullYear()}/${dates.getMonth() + 1}/${dates.getDate()} ${dates.getHours().toString().padStart(2, '0')}:${dates.getMinutes().toString().padStart(2, '0')}`;
};

interface Shop {
  shop_id: string;
  name: string;
  start_at: string;
  end_at: string;
  description: string;
  status: boolean;
}

interface ShopListProps {
  event_id: string;
}

export default function ShopList({ event_id }: ShopListProps) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShops, setSelectedShops] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchShops();
  }, [event_id]);

  const fetchShops = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${event_id}`);
      if (!response.ok) throw new Error('ショップリストの取得に失敗しました');
      const data = await response.json();
      setShops(data.shops);
      const initialSelectedShops: Record<string, boolean> = {};
      data.shops.forEach((shop: Shop) => {
        initialSelectedShops[shop.shop_id] = shop.status;
      });
      setSelectedShops(initialSelectedShops);
    } catch (error) {
      console.error('Error fetching shops:', error);
      toast({
        title: 'エラー',
        description: 'ショップリストの取得に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleCheckboxChange = (shopId: string) => {
    setSelectedShops((prev) => ({
      ...prev,
      [shopId]: !prev[shopId],
    }));
  };

  const updateShopVisibility = async () => {
    try {
      const updatedShops = Object.entries(selectedShops).map(([shop_id, status]) => ({
        shop_id,
        status,
      }));

      const response = await fetch(`http://localhost:3001/events/${event_id}/shopsView`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedShops),
      });

      if (!response.ok) throw new Error('ショップの表示状態の更新に失敗しました');

      toast({
        description: 'ショップの表示状態を更新しました',
      });
      fetchShops(); // リストを再取得して最新の状態を反映
    } catch (error) {
      console.error('Error updating shop visibility:', error);
      toast({
        title: 'エラー',
        description: 'ショップの表示状態の更新に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const deleteShop = async (event_id: string, shop_id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/events/${event_id}/shops/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop_id }),
      });
      if (!response.ok) throw new Error('ショップの削除に失敗しました');
      toast({
        description: 'ショップを削除しました',
      });
      fetchShops();
    } catch (error) {
      console.error('Error deleting shop:', error);
      toast({
        title: 'エラー',
        description: 'ショップの削除に失敗しました',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold">ショップリスト</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>表示</TableHead>
            <TableHead>店名の詳細</TableHead>

            {/* <TableHead>追加日時</TableHead> */}
            <TableHead>削除</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop.shop_id}>
              <TableCell>
                <Checkbox
                  checked={selectedShops[shop.shop_id]}
                  onCheckedChange={() => handleCheckboxChange(shop.shop_id)}
                />
              </TableCell>
              <TableCell>
                <Button variant="link" asChild>
                  <Link href={`/client/${shop.shop_id}`}>{shop.name}</Link>
                </Button>
              </TableCell>

              {/* <TableCell>{dateFormat(shop.end_at)}</TableCell> */}
              <TableCell>
                <Button variant="destructive" onClick={() => deleteShop(event_id, shop.shop_id)}>
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-center">
        <Modal
          msg="表示・非表示を変更する"
          custom={[{ cont: '戻る' }, { cont: '更新', func: updateShopVisibility }]}>
          選択したショップの表示状態を更新しますか？
        </Modal>
      </div>
    </div>
  );
}
