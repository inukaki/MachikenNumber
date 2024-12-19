import OrderList from '@/components/order/OrderList';
import OrderMenu from '@/components/order/OrderMenu';

async function getUnreadyOrders(shopId: string) {
  try {
    const res = await fetch(`http://localhost:3001/orders/${shopId}/unready`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Failed to fetch unready orders');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching unready orders:', error);
    return [];
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  const shopId = params.id;
  console.log(shopId);

  const [menuData, unreadyOrders] = await Promise.all([
    fetch(`http://localhost:3001/items/${shopId}`, { cache: 'no-store' }).then((res) => res.json()),
    getUnreadyOrders(shopId),
  ]);

  return (
    <div>
      <OrderMenu id={shopId} menu={menuData} unreadyOrders={unreadyOrders} />
      <OrderList />
    </div>
  );
}
