import OrderList from '@/components/order/OrderList';
import OrderMenu from '@/components/order/OrderMenu';

export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // const menu = await fetch(`${baseUrl}/api/items/${id}`).then((response) => response.json());
  const menu = [
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

  return (
    <div>
      <OrderMenu id={id} menu={menu} />
      <OrderList />
    </div>
  );
}
