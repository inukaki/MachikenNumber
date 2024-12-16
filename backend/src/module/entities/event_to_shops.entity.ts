import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './events.entity';
import { Shop } from './shops.entity';

@Entity('event_to_shops')
export class EventToShops {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Event, (event) => event.event_id)
    event: Event;

    @ManyToOne(() => Shop, (shop) => shop.shop_id)
    shop: Shop;
}
