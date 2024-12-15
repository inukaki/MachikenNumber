import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemsDto } from '../dtos/create_items_dto';
import { ReturnItemsDto } from '../dtos/return_items_dto';
import { Items } from '../entities/items.entity';
import { UpdateItemsDto } from '../dtos/update_items_dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
    @Post()
    createItems(@Body() createItemsDto: CreateItemsDto) {
        const createdItems = this.itemsService.createItems(createItemsDto);
        console.log(createdItems);
        return createdItems;
    }
    @Get(':shop_id')
    getItemsByShopId(@Param('shop_id') shop_id: string): Promise<ReturnItemsDto[]> {
        const items = this.itemsService.getItemsByShopId(shop_id);
        return items;
    }
    @Patch(':item_id')
    updateItems(@Param('item_id') item_id: string, @Body() updateItemsDto: UpdateItemsDto): Promise<Items>{
        const items = this.itemsService.updateItems(item_id, updateItemsDto);
        return items;
    }
    @Delete(':item_id')
    deleteItems(@Param('item_id') item_id: string): Promise<void> {
        return this.itemsService.deleteItems(item_id);
    }
}