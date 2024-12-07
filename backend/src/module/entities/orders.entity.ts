import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Shop } from './shops.entity';
import { OrderToItems } from './order_to_items.entity';

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    order_id: number;

    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Shop, (shop) => shop.orders)
    shop_id: Shop;

    @Column()
    card_number: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OrderToItems, (orderToItems) => orderToItems.order_id)
    orderToItems: OrderToItems[];
}
