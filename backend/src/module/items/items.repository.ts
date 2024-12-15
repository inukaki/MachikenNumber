import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from '../entities/items.entity';
import { Shop } from '../entities/shops.entity';


@Injectable()
export class ItemsRepository {
    constructor(
        @InjectRepository(Items)
        private itemsRepositoryTypeORM: Repository<Items>,
    ) {}
    async createItems(items: Items): Promise<Items> {
        const createdItems = await this.itemsRepositoryTypeORM.save(items);
        return createdItems;
    }
    async getItems(item_id: string): Promise<Items> {
        const items = await this.itemsRepositoryTypeORM.findOneBy({item_id});
        return items;
    }
    async getItemsByShopId(shop: Shop): Promise<Items[]> {
        const items = await this.itemsRepositoryTypeORM.find({relations: ['shop_id'] });
        return items;
    }
    async deleteItems(item_id: string): Promise<void> {
        await this.itemsRepositoryTypeORM.delete({item_id});
    }
}