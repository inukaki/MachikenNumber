import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './events.entity';
import { Shop } from './shops.entity';
import { Column } from 'typeorm';

@Entity('event_to_shops')
export class EventToShops {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({default: true})
    status: boolean;

    @ManyToOne(() => Event, (event) => event.eventToShops, { onDelete: 'CASCADE' })
    event: Event;

    @ManyToOne(() => Shop, (shop) => shop.eventToShops, { onDelete: 'CASCADE' })
    shop: Shop;
}
