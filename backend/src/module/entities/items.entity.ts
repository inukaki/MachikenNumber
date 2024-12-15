import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shops.entity';

@Entity('items')
export class Items {
  @PrimaryGeneratedColumn()
  item_id: string;

  @ManyToOne(() => Shop, (shop) => shop.items)
  shop_id: Shop;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  time: number;
}
