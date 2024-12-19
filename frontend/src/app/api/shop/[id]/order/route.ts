import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { shopId: string } }) {
  try {
    const { shopId } = params;
    const body = await request.json();

    // バリデーション
    // const validatedData = orderSchema.parse(body);

    // データベースの更新
    // const updatedShop = await prisma.shop.update({
    //   where: {
    //     id: shopId,
    //   },
    //   data: {
    //     eventId: validatedData.eventId,
    //   },
    // });

    // return NextResponse.json(updatedShop);
    return NextResponse.json({ error: 'update event' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { shopId: string } }) {
  try {
    const { shopId } = params;

    // サンプルデータ
    const data = [
      {
        id: '1',
        status: '受付中',
        createdAt: new Date().toISOString(),
        items: [
          { id: '1', name: '焼きそば', quantity: 2, price: 100 },
          { id: '2', name: '唐揚げ', quantity: 1, price: 80 },
        ],
      },
      {
        id: '2',
        status: '受付中',
        createdAt: new Date().toISOString(),
        items: [
          { id: '1', name: '焼きそば', quantity: 1, price: 100 },
          { id: '2', name: '唐揚げ', quantity: 3, price: 80 },
        ],
      },
    ];

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
