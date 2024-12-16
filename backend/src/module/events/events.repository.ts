import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "../entities/events.entity";

@Injectable()
export class EventsRepository {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepositoryTypeORM: Repository<Event>
    ) {}
    async createEvent(event: Event): Promise<Event> {
        const createdEvent = await this.eventsRepositoryTypeORM.save(event);
        return createdEvent;
    }
}