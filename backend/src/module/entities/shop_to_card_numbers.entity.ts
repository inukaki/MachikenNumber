import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Shop } from './shops.entity';

@Entity('shop_to_card_numbers')
export class ShopToCardNumbers {
    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Shop, (shop) => shop.shop_id)
    shop_id: Shop;

    @Column()
    card_number: string;

    @Column()
    is_used: boolean;

    @Column()
    last_assigned_at: Date;
}
