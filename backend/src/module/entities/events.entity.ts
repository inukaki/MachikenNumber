import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventToShops } from './event_to_shops.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    event_id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    start_at?: Date;

    @Column({nullable: true})
    end_at?: Date;

    @Column({nullable: true})
    invite_key?: string;

    @OneToMany(() => EventToShops, eventToShops => eventToShops.event)
    eventToShops: EventToShops[];
}
