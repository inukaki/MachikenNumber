'use server';

export async function getOrders() {
  const response = await fetch('http://localhost:3000/api/tester/shop/orders', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}
