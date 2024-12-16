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
import { v4 as uuidv4 } from 'uuid';

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    order_id: string = uuidv4();

    @ManyToOne(() => Shop, (shop) => shop.orders)
    shop: Shop;

    @Column()
    card_number: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OrderToItems, (orderToItems) => orderToItems.order_id)
    orderToItems: OrderToItems[];
}
