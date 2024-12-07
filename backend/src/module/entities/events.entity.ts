import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventToShops } from './event_to_shops.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    @OneToMany(() => EventToShops, (eventToShops) => eventToShops.event_id)
    event_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start_at: Date;

    @Column()
    end_at: Date;

    @Column()
    invite_key: string;
}
