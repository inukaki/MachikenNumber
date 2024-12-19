import { NextResponse } from 'next/server';

export async function GET() {
  // サンプルデータ
  const orders = [
    {
      order_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      shop_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      card_number: '334',
      create_at: '2024-12-10T05:55:53.140Z',
      items: [
        { item_id: '7c9c97d9-88f6-4e6f-94d6-9c0806ec98b8', count: 2, time: '4' },
        { item_id: '7d0d1a87-b8b0-47f9-93ff-11fd9221a0a7', count: 1, time: '7' },
      ],
    },
    {
      order_id: 'a4d8c7f4-77e6-4675-99c1-f7f717a31e5d',
      shop_id: '9e8c8d1f-62fe-4b42-a5e6-756e2fcb4a63',
      card_number: '114514',
      create_at: '2024-12-10T06:02:11.140Z',
      items: [
        { item_id: 'c9f3a6a0-1d1b-4384-bdfd-cbc5243b1d12', count: 4, time: '5' },
        { item_id: '7c9c97d9-88f6-4e6f-94d6-9c0806ec98b8', count: 5, time: '4' },
      ],
    },
    {
      order_id: 'bf93f59a-b035-402b-a021-9e4ed1cba9f0',
      shop_id: '98e1d0f4-c90d-4f78-b618-72836a4b21be',
      card_number: '4649',
      create_at: '2024-12-10T06:10:53.140Z',
      items: [
        { item_id: 'd5317b1d-9088-46b9-bcdb-8c918c4c9eaf', count: 1, time: '6' },
        { item_id: '7c9c97d9-88f6-4e6f-94d6-9c0806ec98b8', count: 5, time: '5' },
      ],
    },
    {
      order_id: 'ea9b82e6-5d2e-4ae3-b504-7e8f40742a33',
      shop_id: '2e44278e-93db-4421-b9b4-e80fd9a13e4f',
      card_number: '4979',
      create_at: '2024-12-10T06:25:12.140Z',
      items: [{ item_id: 'f62d6be9-bb94-4db7-b1ac-b111c3d8106b', count: 4, time: '12' }],
    },
    {
      order_id: '7b13ed9b-7bb4-44da-b12f-b0b444f08898',
      shop_id: '125c4569-2d29-4e5c-b8a6-218c9cfbce90',
      card_number: '18782',
      create_at: '2024-12-10T06:40:25.140Z',
      items: [{ item_id: '0c08a2d2-7b94-4e35-b1b5-bc1a430e79e3', count: 2, time: '10' }],
    },
  ];

  // JSONレスポンスを返す
  return NextResponse.json(orders);
}
