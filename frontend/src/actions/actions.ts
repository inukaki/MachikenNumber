'use server';

export async function getOrders(shop_id: string) {
  const response = await fetch(`https://nya2:3002/orders/${shop_id}/unready`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}
