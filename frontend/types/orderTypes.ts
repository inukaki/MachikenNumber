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
