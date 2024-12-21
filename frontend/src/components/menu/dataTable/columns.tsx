/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { MenuEditModal } from '@/components/menu/MenuEditModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  item_id: string;
  price: number;
  name: string;
  time: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-center">商品名</div>,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center font-medium">{name}</div>; // そのまま表示
    },
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-center">価格(円)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'time',
    header: () => <div className="text-center">提供時間</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('time'));

      return <div className="text-center font-medium">{amount}分</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const payments = row.original;
      const router = useRouter();

      const [payment, setPayment] = useState<Payment>(payments);

      const MenuEdit = (payment: Payment) => {
        setPayment(payment);
        setOpen(true);
      };
      async function MenuDelete(payment: Payment) {
        const isConfirmed = confirm(`「${payment.name}」を削除してもよろしいですか？`);
        if (isConfirmed) {
          const res = await fetch(`${process.env.NEST_URL}/items/${payment.item_id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            toast.success('メニューを削除しました');
            router.refresh(); // データの再フェッチをトリガー
          } else {
            console.error('Failed to delete menu');
            toast.error('メニューの削除に失敗しました');
          }
        }
      }
      const handleDelete = () => {
        MenuDelete(payment);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>詳細</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => MenuEdit(payment)}>編集</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>削除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <MenuEditModal open={open} onOpenChange={setOpen} payment={payment} />
        </>
      );
    },
  },
];
