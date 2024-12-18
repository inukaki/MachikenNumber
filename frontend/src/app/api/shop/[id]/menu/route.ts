import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { shopId: string } }) {
  try {
    const { shopId } = params;
    // DBからメニューを取得
    // prisma.menu.findMany({
    //   where: {
    //     shopId,
    //   },
    // });

    // サンプルデータ
    const data = [
      {
        id: '728ed52f',
        price: 100,
        name: '焼きそば',
      },
      {
        id: '7ased52f',
        price: 80,
        name: '唐揚げ',
      },
    ];

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
