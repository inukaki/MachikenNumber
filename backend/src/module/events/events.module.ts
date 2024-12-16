import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { eventsRepositoryTypeORM } from './events.repository.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/events.entity';
import { DatabaseModule } from '../db/database.module';

@Module({
        imports: [
            TypeOrmModule.forFeature([Event]),
            DatabaseModule
        ],
        controllers: [EventsController],
        providers: [
            EventsService, 
            EventsRepository,
            eventsRepositoryTypeORM
        ],    
})
export class EventsModule {}