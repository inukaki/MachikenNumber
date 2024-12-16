import { Controller, Delete, Get, Patch } from "@nestjs/common";
import { Post, Body, Param } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "../dtos/create_event_dto";
import { Event } from "../entities/events.entity";
import { UpdateEventDto } from "src/module/dtos/update_event_dto";

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
    @Get(':event_id')
    async getEvent(@Param('event_id') event_id: string): Promise<Event> {
        const event = await this.eventsService.getEvent(event_id);
        return event;
    }
    @Delete(':event_id')
    async deleteEvent(@Param('event_id') event_id: string): Promise<void> {
        console.log(event_id);
        await this.eventsService.deleteEvent(event_id);
    }
    @Patch(':event_id')
    async updateEvent(@Param('event_id') event_id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
        const updatedEvent = await this.eventsService.updateEvent(event_id, updateEventDto);
        return updatedEvent;
    }
}