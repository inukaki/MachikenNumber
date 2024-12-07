import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventToShops } from './event_to_shops.entity';
import { Items } from './items.entity';
import { Orders } from './orders.entity';
import { ShopToCardNumbers } from './shop_to_card_numbers.entity';

@Entity('shops')
export class Shop {
    @PrimaryGeneratedColumn('uuid')
    @OneToMany(() => EventToShops, (event_to_shops) => event_to_shops.shop_id)
    shop_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start_at: Date;

    @Column()
    end_at: Date;

    @Column()
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