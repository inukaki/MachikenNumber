import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shops.entity';

@Entity('items')
export class Items {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @ManyToOne(() => Shop, (shop) => shop.items)
  shop: Shop;

  @Column()
  name: string;

  @Column({default : 0})
  price: number;

  @Column({default : 0})
  time: number;
}
