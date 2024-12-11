import { Controller, Get, Patch, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { CreateShopDto } from "src/module/dtos/create_shop_dto";

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) {}
    @Post()
    createShop(@Body() createShopDto: CreateShopDto) {
        const createdShop = this.shopsService.createShop(createShopDto);
        console.log(createdShop);
        return createdShop;
    }
    @Get(':shop_id')
    getShop() {
        return 'This action returns a shop';
    }
    @Patch()
    updateShop() {
        return 'This action updates a shop';
    }
}