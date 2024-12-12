import { getOrders } from '@/actions/actions';
import { WaitingCircle } from '@/components/client/WaitingCircle';
import type { Order } from '@/types/orderTypes';
import { sortOrdersByDate, calculateCumulativeWaitTime } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function OrderPage({
  params,
}: {
  params: { cardNumber: string; shop_id: string };
}) {
  const { cardNumber } = params;
  const orders: Order[] = await getOrders();
  const sortedOrders = sortOrdersByDate(orders);
  const userOrder = sortedOrders.find((order) => order.card_number === cardNumber);

  if (!userOrder) {
    return (
      <div>
        <div>指定された注文が見つかりません</div>
        <div>
          <Link href={`/client/${params.shop_id}`}>
            <p>Client Shop</p>
          </Link>
        </div>
      </div>
    );
  }

  const waitTime = calculateCumulativeWaitTime(sortedOrders, userOrder);
  const ordersAhead = sortedOrders.findIndex((order) => order.order_id === userOrder.order_id);

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center p-4">
        <h1 className="mb-4 text-2xl font-bold">あなたの待ち時間</h1>
        <WaitingCircle waitTime={waitTime} ordersAhead={ordersAhead} />
      </div>
      <div className="container mx-auto flex flex-col items-center p-4">
        <Button size="lg">
          <Link href={`/client/${params.shop_id}`}>
            <p>Client Shop</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
