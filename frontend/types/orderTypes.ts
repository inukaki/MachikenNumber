export interface Item {
  item_id: string;
  count: number;
  time: string;
}

export interface Order {
  order_id: string;
  shop_id: string;
  card_number: string;
  create_at: string;
  items: Item[];
}

export interface EventData {
  event_id: string;
  name: string;
  shops: ShopData[];
  start_at: string;
  end_at: string;
  description: string;
}

export interface ShopData {
  shop_id: string;
  name: string;
  status: boolean;
  start_at: string;
  end_at: string;
  wait_time: number;
}
