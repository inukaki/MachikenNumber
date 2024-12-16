import { Controller } from "@nestjs/common";
import { Post, Body } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "../dtos/create_event_dto";
import { Event } from "../entities/events.entity";

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService
    ) {}
    @Post()
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        const createdEvent = await this.eventsService.createEvent(createEventDto);
        return createdEvent;
    }
}