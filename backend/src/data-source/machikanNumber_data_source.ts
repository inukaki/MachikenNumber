import * as dotenv from 'dotenv';
import { Shop } from '../module/entities/shops.entity';
import { DataSource } from 'typeorm';
import { Orders } from 'src/module/entities/orders.entity';
import { OrderToItems } from 'src/module/entities/order_to_items.entity';
import { ShopToCardNumbers } from 'src/module/entities/shop_to_card_numbers.entity';
import { Items } from 'src/module/entities/items.entity';
import { Event } from 'src/module/entities/events.entity';
import { EventToShops } from 'src/module/entities/event_to_shops.entity';

dotenv.config();

export const machikanNumberDataSource: DataSource = new DataSource({
  type: 'mariadb',
  entities: [
    Shop,
    Orders,
    Items,
    Event,
    OrderToItems,
    EventToShops,
    ShopToCardNumbers,
  ],
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT, 10),
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  synchronize: true,
});
