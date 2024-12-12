import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Order, Item } from '@/types/orderTypes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortOrdersByDate(orders: Order[]): Order[] {
  return orders.sort((a, b) => new Date(a.create_at).getTime() - new Date(b.create_at).getTime());
}

export function calculateWaitTimeForOrder(items: Item[]): number {
  return items.reduce((total, item) => total + parseInt(item.time) * item.count, 0);
}

export function calculateCumulativeWaitTime(orders: Order[], targetOrder: Order): number {
  const sortedOrders = sortOrdersByDate(orders);
  let cumulativeTime = 0;
  for (const order of sortedOrders) {
    cumulativeTime += calculateWaitTimeForOrder(order.items);
    if (order.order_id === targetOrder.order_id) {
      break;
    }
  }
  return cumulativeTime;
}

export function getOrderPosition(orders: Order[], targetOrder: Order): number {
  const sortedOrders = sortOrdersByDate(orders);
  return sortedOrders.findIndex((order) => order.order_id === targetOrder.order_id) + 1;
}
