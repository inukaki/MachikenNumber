import { Injectable } from '@nestjs/common';
import { Items } from '../entities/items.entity';
import { ItemsRepository } from './items.repository';
import { CreateItemsDto } from '../dtos/create_items_dto';
import { UpdateItemsDto } from '../dtos/update_items_dto';
import { ReturnItemsDto } from '../dtos/return_items_dto';
import { ShopsService } from '../shops/shops.service';

@Injectable()
export class ItemsService {
    constructor(
        private readonly itemsRepository: ItemsRepository,
        private readonly shopsService: ShopsService
    ) {}
    async createItems(createItemsDto: CreateItemsDto): Promise<Items> {
        const items = new Items();
        items.shop_id = await this.shopsService.getShop(createItemsDto.shop_id);
        items.name = createItemsDto.name;
        items.price = createItemsDto.price;
        items.time = createItemsDto.time;
        const createdItems = await this.itemsRepository.createItems(items);
        return createdItems;
    }
    async getItemsByShopId(shop_id: string): Promise<ReturnItemsDto[]> {
        const shop = await this.shopsService.getShop(shop_id);
        const items = await this.itemsRepository.getItemsByShopId(shop);
        const returnItemsDto: ReturnItemsDto[] = items.map(item => {
            const returnItem: ReturnItemsDto = {
                item_id: item.item_id,
                name: item.name,
                price: item.price,
                time: item.time
            };
            return returnItem;
        });
        return returnItemsDto;
    }
    async updateItems(item_id: string, updateItemsDto: UpdateItemsDto): Promise<Items> {
        let items = await this.itemsRepository.getItems(item_id);
        if (updateItemsDto.name) items.name = updateItemsDto.name;
        if (updateItemsDto.price) items.price = updateItemsDto.price;
        if (updateItemsDto.time) items.time = updateItemsDto.time;
        return this.itemsRepository.createItems(items);
    }
    async deleteItems(item_id: string): Promise<void> {
        await this.itemsRepository.deleteItems(item_id);
    }
}