import OrderList from '@/components/order/OrderList';
import OrderMenu from '@/components/order/OrderMenu';

export default async function Order({ params }: { params: { id: string } }) {
  const shopId = params.id;
  console.log(shopId);

  const res = await fetch(`http://localhost:3001/items/${shopId}`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return (
    <div>
      <OrderMenu id={shopId} menu={data} />
      <OrderList />
    </div>
  );
}
