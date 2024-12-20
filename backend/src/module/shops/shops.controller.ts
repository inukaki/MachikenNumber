import { Controller, Get, Patch, Post } from "@nestjs/common";
import { Body, Param } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { CreateShopDto } from "src/module/dtos/create_shop_dto";
import { UpdateShopDto } from "src/module/dtos/update_shop_dto";
import { Shop } from "../entities/shops.entity";

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) {}
    @Post()
    createShop(@Body() createShopDto: CreateShopDto) {
        const createdShop = this.shopsService.createShop(createShopDto);
        return createdShop;
    }
    @Get(':shop_id')
    getShop(@Param('shop_id') shop_id: string): Promise<Shop> {
        const shop = this.shopsService.getShop(shop_id);
        return shop;
    }
    @Patch(':shop_id')
    updateShop(@Param('shop_id') shop_id: string, @Body() updateShopDto: UpdateShopDto): Promise<Shop>{
        const shop = this.shopsService.updateShop(shop_id, updateShopDto);
        return shop;
    }
}