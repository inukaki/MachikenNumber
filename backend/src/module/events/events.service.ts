import { Injectable } from "@nestjs/common";
import { EventsRepository } from "./events.repository";
import { CreateEventDto } from "src/module/dtos/create_event_dto";
import { Event } from "../entities/events.entity";
import { UpdateEventDto } from "src/module/dtos/update_event_dto";

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
    async updateEvent(event_id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        let event = new Event();
        event = await this.eventsRepository.getEvent(event_id);
        if (updateEventDto.name) event.name = updateEventDto.name;
        if (updateEventDto.description) event.description = updateEventDto.description;
        if (updateEventDto.start_at) event.start_at = updateEventDto.start_at;
        if (updateEventDto.end_at) event.end_at = updateEventDto.end_at;
        const updatedEvent = await this.eventsRepository.createEvent(event);
        return updatedEvent;
    }
}