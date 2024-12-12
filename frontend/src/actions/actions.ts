'use server';
import type { Order } from '@/types/orderTypes';

export async function getOrders(): Promise<Order[]> {
  const response = await fetch('http://localhost:3001/api/tester/shop/orders', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}
