import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { EventToShops } from './event_to_shops.entity';
import { Items } from './items.entity';
import { Orders } from './orders.entity';
import { ShopToCardNumbers } from './shop_to_card_numbers.entity';

@Entity('shops')
export class Shop {
  @PrimaryColumn()
  shop_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  start_at: Date;

  @Column({ nullable: true })
  end_at: Date;

  @Column({ nullable: true })
  user_key: string;

  @OneToMany(() => Items, (items) => items.shop_id)
  items: Items[];

  @OneToMany(() => Orders, (orders) => orders.shop_id)
  orders: Orders[];

  @OneToMany(
    () => ShopToCardNumbers,
    (shopToCardNumbers) => shopToCardNumbers.shop_id,
  )
  shopToCardNumbers: ShopToCardNumbers[];
}
