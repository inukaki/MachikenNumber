'use client';

import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { POST, GET, DELETE, PATCH } from '@/hooks/event/APIs';
import Modal from '@/components/event/Modal';
import {
  type EventId,
  type DataProps,
  type BackData,
  type PostProps,
} from '@/components/type/Apis';

// ポップアップ

const twoDigit = (num: number) => {
  let digit: string;
  if (num < 10) {
    digit = '0' + String(num);
  } else {
    digit = String(num);
  }
  return digit;
};
const dateFormat = (date: string) => {
  const dates = new Date(date);
  return `${dates.getFullYear()}/${dates.getMonth() + 1}/${dates.getDate()} ${twoDigit(dates.getHours())}:${twoDigit(dates.getMinutes())};${twoDigit(dates.getSeconds())}`;
};
const ShopList = ({ event_id }: EventId) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // const EventInfo = await fetch(`${baseUrl}/api/events/${event_id}`).then((response) => response.json());
  const EventInfo = {
    event_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    shops: [
      {
        shop_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        start_at: '2024-12-10T05:32:05.681Z',
        end_at: '2024-12-10T05:32:05.681Z',
        description: 'string',
      },
      {
        shop_id: 'no2',
        name: 'string',
        start_at: '2024-12-10T05:32:05.681Z',
        end_at: '2024-12-10T05:32:05.681Z',
        description: 'string',
      },
    ],
    start_at: '2024-12-10T05:32:05.681Z',
    end_at: '2024-12-10T05:32:05.681Z',
    description: 'string',
  };
  return EventInfo;
};
const EditShopList = ({ event_id }: EventId) => {
  const { toast } = useToast();
  const shopList: DataProps = ShopList({ event_id });
  const [selectedShops, setSelectedShops] = React.useState<Record<string, boolean>>({});
  const handleCheckboxChange = (shopId: string) => {
    setSelectedShops((prev) => ({
      ...prev,
      [shopId]: !prev[shopId],
    }));
  };
  const getSelectedShopsInfo = () => {
    const selectedShopsInfo = Object.keys(selectedShops)
      .filter((shopId) => selectedShops[shopId])
      .reduce(
        (acc, shopId) => {
          const shop = shopList.shops.find((s) => s.shop_id === shopId);
          if (shop) {
            acc[shopId] = { name: shop.name };
          }
          return acc;
        },
        {} as Record<string, { name: string }>,
      );
    return selectedShopsInfo; // 辞書型オブジェクト
  };
  const delShopList = Object.entries(getSelectedShopsInfo()).map(([shopId, { name }]) => {
    return `${name}(${shopId})`;
  });
  const del = async () => {
    // shop の削除リクエストはこちら
    // const EventInfo = await fetch(`${baseUrl}/api/events/${event_id}`).then((response) => response.json());
    //
    toast({
      description: '削除しました。',
    });
  };
  const modalCustom =
    delShopList.length > 0
      ? [{ cont: '戻る' }, { cont: '削除する', func: del }]
      : [{ cont: '戻る' }];
  const modalContents =
    delShopList.length > 0 ? (
      <>
        以下のショップを削除してよろしいですか。
        <br />
        {delShopList}
      </>
    ) : (
      <>
        ショップが選択されていません。
        <br />
        <br />
      </>
    );
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>削除</TableHead>
            <TableHead>shop Name</TableHead>
            <TableHead>Shop ID</TableHead>
            <TableHead>Add Date</TableHead>
            <TableHead>ショップページへ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shopList['shops'].map((elem) => (
            <TableRow key={elem['shop_id']}>
              <TableCell>
                <Checkbox
                  checked={!!selectedShops[elem['shop_id']]}
                  onCheckedChange={() => handleCheckboxChange(elem['shop_id'])}
                />
              </TableCell>
              <TableCell>{elem['name']}</TableCell>
              <TableCell>{elem['shop_id']}</TableCell>
              <TableCell>{dateFormat(elem['end_at'])}</TableCell>
              <TableCell>
                <Button>
                  <Link href={`/client/${elem['shop_id']}`}>ショップページ</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal msg="削除する" custom={modalCustom}>
        {modalContents}
      </Modal>
    </div>
  );
};

export { EditShopList };