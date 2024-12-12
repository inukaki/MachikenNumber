"use client"

import Link from 'next/link';
import React , { ReactNode, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card,
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
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
// import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
// import { type DataType, POST, GET, PATCH, DELETE }  from "@/components/event/shopsAPI";

type T = {
  event_id: any
}
type U = {
  msg:string
  children: ReactNode
  custom?: btninfo[]
}
interface btninfo {
  cont: string;
  func?: () => void;
}
// ポップアップ
const Modal = ({msg,children,custom}: U) => {
  const buttonStyle = ``;
  const overlayStyle = `fixed w-screen h-screen bg-gray-500/50 inset-0`;
  const modalStyle = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[350px] items-center p-3`;
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  } // 表示非表示
  const defaultCustom:btninfo[] = [
    {cont:"OK",func:() => {}}
  ] // デフォ指定
  custom = custom || defaultCustom;
  const checkType = () => {
    try{
      return(
        <div className='flex row justify-between gap-2'>
          {custom.map((elm) => (
            <Button className="flex-1" variant="outline" onClick={() => {elm['func']?.();toggleModal()}}>{elm['cont']}</Button>
          ))}
        </div>
      );
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div>
      <Button
        className={buttonStyle}
        onClick={toggleModal}
      >
        {msg}
      </Button>
      {isOpen && (
        <div className={overlayStyle}>
          <Card className={modalStyle}>
            {children}
            {checkType()}
          </Card>
        </div>
      )}
    </div>
  )
}
const twoDigit = (num:number) => {
  var digit:string;
  if(num<10){
    digit = "0" + String(num);
  }else{
    digit = String(num);
  }
  return digit;
}
const dateFormat = (date:string) =>{
  const dates = new Date(date);
  return `${dates.getFullYear()}/${dates.getMonth()+1}/${dates.getDate()} ${twoDigit(dates.getHours())}:${twoDigit(dates.getMinutes())};${twoDigit(dates.getSeconds())}`;
};
const ShopList = ({event_id}:T) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // const EventInfo = await fetch(`${baseUrl}/api/events/${event_id}`).then((response) => response.json());
  const EventInfo = {
    "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "shops": [
      {
        "shop_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "start_at": "2024-12-10T05:32:05.681Z",
        "end_at": "2024-12-10T05:32:05.681Z",
        "description": "string"
      },
      {
        "shop_id": "no2",
        "name": "string",
        "start_at": "2024-12-10T05:32:05.681Z",
        "end_at": "2024-12-10T05:32:05.681Z",
        "description": "string"
      }
    ],
    "start_at": "2024-12-10T05:32:05.681Z",
    "end_at": "2024-12-10T05:32:05.681Z",
    "description": "string"
  }
  return EventInfo;
}
const ShowShopList = ({event_id}:T) => {
  const shoplist = ShopList(event_id);
  return (
    <div>
      <h2>{shoplist['name']}</h2><span>{shoplist['event_id']}</span>
      <dl>
        {shoplist['shops'].map((elem) => (
          <li><Link href={`/client/${elem['shop_id']}`}>{elem['name']}</Link></li>
        ))}
      </dl>
    </div>
  );
}
const EditShopList = async ({event_id}:T) => {
  const { toast } = useToast();
  const shopListGet = await GET(event_id);
  const shopListStatus = shopListGet.status;
  if (shopListStatus === 200){
    const shopList:DataType = shopListGet.data;
    const [selectedShops, setSelectedShops] = React.useState<Record<string, boolean>>({});
    const handleCheckboxChange = (shopId: string) => {
      setSelectedShops((prev) => ({
        ...prev,
        [shopId]: !prev[shopId],
      }));
    };
    const getSelectedShopsInfo = () => {
      const selectedShopsInfo = Object.keys(selectedShops)
        .filter(shopId => selectedShops[shopId])
        .reduce((acc, shopId) => {
          const shop = shopList.shops.find(s => s.shop_id === shopId);
          if (shop) {
            acc[shopId] = { name: shop.name };
          }
          return acc;
        }, {} as Record<string, { name: string }>);

      return selectedShopsInfo; // 辞書型オブジェクト
    };
    let delShopList = Object.entries(getSelectedShopsInfo()).map(([shopId, { name }]) => {
      return `${name}(${shopId})`
    });
    const del = () => {
      const res = DELETE(event_id);
      toast({
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
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
                <TableCell>
                  {elem['name']}
                </TableCell>
                <TableCell>
                  {elem['shop_id']}
                </TableCell>
                <TableCell>
                  {dateFormat(elem['end_at'])}
                </TableCell>
                <TableCell>
                  <Button>
                    <Link href={`/client/${elem['shop_id']}`}>ショップページ</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {delShopList.length > 0 ? 
          <Modal msg="削除する" custom={[{'cont':'戻る'},{'cont':'削除する','func':del}]}>以下のショップを削除してよろしいですか。<br />{delShopList}</Modal>
        : <Modal msg="削除する" custom={[{'cont':'戻る'}]}>ショップが選択されていません。<br /></Modal>
        }
      </div>
    );
  }
}

export {
  ShowShopList,
  EditShopList
};