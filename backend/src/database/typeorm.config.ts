import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Shop } from "../module/entities/shops.entity";
import { Orders } from "src/module/entities/orders.entity";
import { Items } from "src/module/entities/items.entity";
import { Event } from "src/module/entities/events.entity";
import { OrderToItems } from "src/module/entities/order_to_items.entity";
import { EventToShops } from "src/module/entities/event_to_shops.entity";
import { ShopToCardNumbers } from "src/module/entities/shop_to_card_numbers.entity";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT),
  database: process.env.MARIADB_DATABASE,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  entities: [
    Shop,
    Orders,
    Items,
    Event,
    OrderToItems,
    EventToShops,
    ShopToCardNumbers,
  ],
  synchronize: false,
  logging: false,
};