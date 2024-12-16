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
}
