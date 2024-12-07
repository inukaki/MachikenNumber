import { Controller, Get, Patch, Post } from "@nestjs/common";

@Controller('shops')
export class ShopsController {
    constructor(shopsService) {}
    @Post()
    createShop() {
        return 'This action adds a new shop';
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