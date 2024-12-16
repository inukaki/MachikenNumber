import { Injectable } from "@nestjs/common";
import { EventsRepository } from "./events.repository";
import { CreateEventDto } from "src/module/dtos/create_event_dto";
import { Event } from "../entities/events.entity";

@Injectable()
export class EventsService {
    constructor(
        private readonly eventsRepository: EventsRepository
    ) {}
    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
        const event = new Event();
        event.name = createEventDto.name;
        event.description = createEventDto.description;
        event.start_at = createEventDto.start_at;
        event.end_at = createEventDto.end_at;
        const createdEvent = await this.eventsRepository.createEvent(event);
        return createdEvent;
    }
    async getEvent(event_id: string): Promise<Event> {
        const event = await this.eventsRepository.getEvent(event_id);
        return event;
    }
    async deleteEvent(event_id: string): Promise<void> {
        console.log(event_id);
        await this.eventsRepository.deleteEvent(event_id);
    }
}