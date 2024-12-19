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
const ShopList = async ({ event_id }: EventId) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // try {
  //   const response = await fetch(`${baseUrl}/api/events/${event_id}`);
    
  //   if (!response.ok) {
  //     throw new Error(`HTTPエラー: ${response.status}`);
  //   }

  //   const eventInfo = await response.json();
  //   return eventInfo;
  // } catch (error) {
  //   return `error -> ${error}`;
  // }
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
        status: true,
      },
      {
        shop_id: 'no2',
        name: 'string',
        start_at: '2024-12-10T05:32:05.681Z',
        end_at: '2024-12-10T05:32:05.681Z',
        description: 'string',
        status: false,
      },
    ],
    start_at: '2024-12-10T05:32:05.681Z',
    end_at: '2024-12-10T05:32:05.681Z',
    description: 'string',
  };
  return EventInfo;
};

interface ShowEditShopList {
  event_id: string
  shopList: DataProps
}

const ShowEditShopList = ({ event_id,shopList }: ShowEditShopList) => {
  const { toast } = useToast();  
  const [selectedShops, setSelectedShops] = React.useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (shopList && shopList.shops) {
      const initialSelectedShops: Record<string, boolean> = {};
      shopList.shops.forEach(shop => {
        initialSelectedShops[shop.shop_id] = shop.status; // statusに基づいて初期化
      });
      setSelectedShops(initialSelectedShops);
    }
  }, [shopList]);
  
  const handleCheckboxChange = (shopId: string) => {
    setSelectedShops((prev) => ({
      ...prev,
      [shopId]: !prev[shopId],
    }));
  };

  const getSelectedShopsInfo = () => {
    const selectedShopsInfo = Object.keys(selectedShops).reduce(
      (acc, shopId) => {
        const shop = shopList.shops.find((s) => s.shop_id === shopId);
        if (shop) {
          acc[shopId] = { name: shop.name, status: selectedShops[shopId] }; // selectedShopsから状態を取得
        }
        return acc;
      },
      {} as Record<string, { name: string; status: boolean }>,
    );
    return selectedShopsInfo; // 辞書型オブジェクト
  };

  const delShopList = Object.entries(getSelectedShopsInfo()).map(([shopId, { name, status}]) => {
    return `${name}(${shopId})->${status};`;
  });

  interface cvslT {
    shop_id: string
    status: boolean
  }

  const del = async () => {
    const changeViewShopList:cvslT[] = []
    Object.entries(getSelectedShopsInfo()).forEach(([shopId,{name, status}]) => {
      const newShop:cvslT = {
        shop_id: shopId,
        status: status
      }
      changeViewShopList.push(newShop)
    });
    // shop の削除リクエストはこちら
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    // const EventInfo = await fetch(`${baseUrl}/api/events/${event_id}/shopsView`).then((response) => response.json());
    const EventInfo = await fetch(`${baseUrl}/api/events/${event_id}/shopsView`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeViewShopList), // bodyにJSON形式のデータを設定
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
      return response.json();
    }).catch((error) => {
      console.error('エラーが発生しました:', error);
      toast({
        description: `エラーが発生しました：${error}`,
      })
    });
    
    toast({
      description: '表示状態を変更しました。',
    });
  };
  const modalCustom =
    delShopList.length > 0
      ? [{ cont: '戻る' }, { cont: '表示状態を変更する', func: del }]
      : [{ cont: '戻る' }];
  const modalContents =
    delShopList.length > 0 ? (
      <>
        以下のショップの表示状態を変更します。
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
            <TableHead>表示</TableHead>
            <TableHead>shop Name</TableHead>
            <TableHead>Shop ID</TableHead>
            <TableHead>Add Date</TableHead>
            <TableHead>ショップページへ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {shopList.shops && shopList.shops.length > 0 ? (
          shopList.shops.map((elem) => (
            <TableRow key={elem.shop_id}>
              <TableCell>
                <Checkbox
                  checked={!!selectedShops[elem.shop_id]}
                  onCheckedChange={() => handleCheckboxChange(elem['shop_id'])}
                />
              </TableCell>
              <TableCell>{elem.name}</TableCell>
              <TableCell>{elem.shop_id}</TableCell>
              <TableCell>{dateFormat(elem.end_at)}</TableCell>
              <TableCell>
                <Button>
                  <Link href={`/client/${elem.shop_id}`}>ショップページ</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>ショップが見つかりませんでした。</TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
      <Modal msg="表示・非表示を変更する" custom={modalCustom}>
        {modalContents}
      </Modal>
    </div>
  )
};

const EditShopList: React.FC<EventId> = ({ event_id }) => {
  const [shopList, setShopList] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopList = async () => {
      try {
        const result = await ShopList({ event_id });
        setShopList(result);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : '予期しないエラーが発生しました');
      }
    };

    fetchShopList();
  }, [event_id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  if(!shopList){
    return <p>ロード中...</p>
  }
  return (
    <ShowEditShopList 
      event_id={event_id}
      shopList={shopList}
    />
  );
};


export { EditShopList };
