//IDの型
type EventId = {
  event_id: string;
};
// shopIdの型
type ShopId = {
  shop_id: string;
};
// Apiから取得するデータの型
type DataProps = {
  event_id: string;
  name: string;
  shops: ShopsProps[];
  start_at: string;
  end_at: string;
  description: string;
};
// data.shopsの型
type ShopsProps = {
  shop_id: string;
  name: string;
  start_at: string;
  end_at: string;
  description: string;
  status: boolean;
};
// POST,GET,DELETE,PATCHから帰ってくる型
type BackData = {
  status: number;
  data?: DataProps | string;
};
// POST,PATCHで送る型(null許容)
type PostProps = {
  name: string;
  start_at?: string;
  end_at?: string;
  description?: string;
};
export {
  type EventId,
  type ShopId,
  type DataProps,
  type ShopsProps,
  type BackData,
  type PostProps,
};
