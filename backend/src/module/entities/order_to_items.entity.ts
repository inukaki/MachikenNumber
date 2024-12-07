import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Orders } from './orders.entity';
import { Items } from './items.entity';

@Entity('order_to_items')
export class OrderToItems {
    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Orders, (order) => order.orderToItems)
    order_id: Orders;

    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Items, (item) => item)
    item_id: Items;

    @Column()
    count: number;
}
