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
async function getOrders(shopId: string) {
  try {
    const res = await fetch(`http://localhost:3001/orders/${shopId}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Failed to fetch orders');
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  const shopId = params.id;
  const orderData = await getOrders(shopId);

  const [menuData, unreadyOrders] = await Promise.all([
    fetch(`http://localhost:3001/items/${shopId}`, { cache: 'no-store' }).then((res) => res.json()),
    getUnreadyOrders(shopId),
  ]);

  return (
    <div>
      <OrderMenu shopId={shopId} menu={menuData} unreadyOrders={unreadyOrders} />
      <OrderList shopId={shopId} orderData={orderData} />
    </div>
  );
}
