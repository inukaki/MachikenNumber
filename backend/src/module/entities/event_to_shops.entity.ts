import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './events.entity';
import { Shop } from './shops.entity';

@Entity('event_to_shops')
export class EventToShops {
    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Event, (event) => event.event_id)
    event_id: Event;

    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Shop, (shop) => shop.shop_id)
    shop_id: Shop;
}
