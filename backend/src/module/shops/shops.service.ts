import { Injectable } from "@nestjs/common";
import { Shop } from "../entities/shops.entity";
import { ShopsRepository } from "./shops.repository";
import { CreateShopDto } from "src/module/dtos/create_shop_dto";

@Injectable()
export class ShopsService {
    constructor(private readonly shopsRepository: ShopsRepository) {}
    createShop(createShopDto: CreateShopDto): Promise<Shop> {
        const shop = new Shop();
        shop.name = createShopDto.name;
        shop.description = createShopDto.description;
        shop.start_at = createShopDto.start_at;
        shop.end_at = createShopDto.end_at;
        shop.user_key = "user_key";
        const createdShop = this.shopsRepository.createShop(shop);
        return createdShop;
    }
    getShop() {
        return 'This action returns a shop';
    }
    updateShop() {
        return 'This action updates a shop';
    }
}