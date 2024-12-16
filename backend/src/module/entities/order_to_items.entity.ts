import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Orders } from './orders.entity';
import { Items } from './items.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('order_to_items')
export class OrderToItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: string;

    @Column()
    item_id: string;

    @ManyToOne(() => Orders, (order) => order.orderToItems, {
        onDelete: 'CASCADE',
    })
    order: Orders;

    @ManyToOne(() => Items, (item) => item, { onDelete: 'CASCADE' })
    item: Items;

    @Column()
    count: number;
}
