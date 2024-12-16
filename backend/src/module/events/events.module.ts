import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { eventsRepositoryTypeORM } from './events.repository.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/events.entity';
import { DatabaseModule } from '../db/database.module';
import { eventToShopsRepositoryTypeORM } from './eventToShops.repository.typeorm';
import { EventToShops } from 'src/module/entities/event_to_shops.entity';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventToShops]),
    DatabaseModule,
    ShopsModule,
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    EventsRepository,
    eventsRepositoryTypeORM,
    eventToShopsRepositoryTypeORM,
  ],
})
export class EventsModule {}
