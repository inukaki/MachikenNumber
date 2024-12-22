import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../entities/events.entity';
import { EventToShops } from 'src/module/entities/event_to_shops.entity';
import { ShopsService } from '../shops/shops.service';
import { UpdateShopViewDto } from '../dtos/update_shop_view_dto';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepositoryTypeORM: Repository<Event>,
    @InjectRepository(EventToShops)
    private readonly eventToShopsRepositoryTypeORM: Repository<EventToShops>,
    private readonly shopsService: ShopsService,
  ) {}
  async createEvent(event: Event): Promise<Event> {
    const createdEvent = await this.eventsRepositoryTypeORM.save(event);
    return createdEvent;
  }
  async getEvent(event_id: string): Promise<Event> {
    const event = await this.eventsRepositoryTypeORM.findOneBy({ event_id });
    return event;
  }
  async getEventByShopId(shop_id: string): Promise<Event> {
    const eventToShop = await this.eventToShopsRepositoryTypeORM.findOne({
      where:{shop: { shop_id }},
      relations: ['event'],
    });
    return eventToShop.event;
  }
  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventsRepositoryTypeORM.find();
    return events;
  }
  async deleteEvent(event_id: string): Promise<void> {
    await this.eventsRepositoryTypeORM.delete({ event_id });
  }
  async addShopToEvent(event_id: string, shop_id: string): Promise<Event> {
    const eventToShops = new EventToShops();
    eventToShops.event = await this.getEvent(event_id);
    eventToShops.shop = await this.shopsService.getShop(shop_id);
    await this.eventToShopsRepositoryTypeORM.save(eventToShops);
    return this.getEvent(event_id);
  }
  async deleteShopFromEvent(event_id: string, shop_id: string): Promise<Event> {
    await this.eventToShopsRepositoryTypeORM.delete({
      event: { event_id },
      shop: { shop_id },
    });
    return this.getEvent(event_id);
  }
  async updateShopView(
    event_id: string,
    updateShopViewDto: UpdateShopViewDto[],
  ): Promise<Event> {
    for (const shopView of updateShopViewDto) {
      await this.eventToShopsRepositoryTypeORM.update(
        { event: { event_id }, shop: { shop_id: shopView.shop_id } },
        { status: shopView.status },
      );
    }
    return this.getEvent(event_id);
  }
  async getEventWithShops(event_id: string): Promise<any> {
    const event = await this.eventsRepositoryTypeORM.findOneBy({ event_id });
    if (!event) {
      throw new Error('Event not found');
    }

    const eventToShops = await this.eventToShopsRepositoryTypeORM.find({
      where: { event: { event_id } },
      relations: ['shop'],
    });

    const shops = eventToShops.map((eventToShop) => ({
      shop_id: eventToShop.shop.shop_id,
      name: eventToShop.shop.name,
      start_at: eventToShop.shop.start_at,
      end_at: eventToShop.shop.end_at,
      description: eventToShop.shop.description,
      status: eventToShop.status,
    }));

    return {
      event_id: event.event_id,
      name: event.name,
      shops: shops,
      start_at: event.start_at,
      end_at: event.end_at,
      description: event.description,
    };
  }
}
