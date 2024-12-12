import { getOrders } from '@/actions/actions';
import { WaitingCircle } from '@/components/client/WaitingCircle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Item } from '../../../../../types/orderTypes';

interface Order {
  order_id: string;
  card_number: string;
  items: Item[];
  create_at: string;
}

interface OrderPageProps {
  params: { shop_id: string; cardNumber: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { cardNumber } = params;
  const orders = await getOrders();
  const userOrder = orders.find((order: Order) => order.card_number === cardNumber);

  if (!userOrder) {
    return (
      <div className="flex h-screen flex-col items-center ">
        指定された注文が見つかりません
        <Link href={`/client/${params.shop_id}`}>
          <Button className="mt-10 px-10 py-2" size="lg">
            注文待ち時間リストに戻る
          </Button>
        </Link>
      </div>
    );
  }

  const waitTime = calculateWaitTime(userOrder.items);
  const ordersAhead = orders.filter(
    (order: Order) => new Date(order.create_at) < new Date(userOrder.create_at),
  ).length;

  return (
    <div className="container mx-auto flex flex-col items-center p-4">
      <h1 className="mb-10 text-2xl font-bold">あなたの待ち時間</h1>
      <WaitingCircle waitTime={waitTime} ordersAhead={ordersAhead} />
      <Link href={`/client/${params.shop_id}`}>
        <Button className="mt-10 px-10 py-2" size="lg">
          注文待ち時間リストに戻る
        </Button>
      </Link>
    </div>
  );
}

function calculateWaitTime(items: Item[]) {
  return items.reduce((total: number, item: Item) => total + parseInt(item.time) * item.count, 0);
}
