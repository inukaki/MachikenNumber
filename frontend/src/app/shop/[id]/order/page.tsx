import OrderList from '@/components/order/OrderList';
import OrderMenu from '@/components/order/OrderMenu';
import { Suspense } from 'react';

async function fetchMenu(shopId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/shop/${shopId}/menu`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch menu:', err);
    return [];
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  const shopId = params.id;

  const menu = await fetchMenu(shopId);

  return (
    <div>
      <Suspense fallback={<p>読み込み中...</p>}>
        <OrderMenu id={shopId} menu={menu} />
        <OrderList />
      </Suspense>
    </div>
  );
}
