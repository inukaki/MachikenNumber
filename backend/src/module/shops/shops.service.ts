import { Injectable } from "@nestjs/common";
import { Shop } from "../entities/shops.entity";
import { ShopsRepository } from "./shops.repository";
import { CreateShopDto } from "../dtos/create_shop_dto";
import { UpdateShopDto } from "../dtos/update_shop_dto";


@Injectable()
export class ShopsService {
    constructor(private readonly shopsRepository: ShopsRepository) {}
    createShop(createShopDto: CreateShopDto): Promise<Shop> {
        const shop = new Shop();
        shop.shop_id = createShopDto.shop_id;
        shop.name = createShopDto.name;
        shop.description = createShopDto.description;
        shop.start_at = createShopDto.start_at;
        shop.end_at = createShopDto.end_at;
        shop.user_key = "user_key";
        const createdShop = this.shopsRepository.createShop(shop);
        return createdShop;
    }
    getShop(shop_id: string): Promise<Shop> {
        const shop = this.shopsRepository.getShop(shop_id);
        return shop;

    }
    async updateShop(shop_id: string, updateShopDto: UpdateShopDto): Promise<Shop> {
        let shop = await this.shopsRepository.getShop(shop_id);
        if (updateShopDto.name) shop.name = updateShopDto.name;
        if (updateShopDto.description) shop.description = updateShopDto.description;
        if (updateShopDto.start_at) shop.start_at = updateShopDto.start_at;
        if (updateShopDto.end_at) shop.end_at = updateShopDto.end_at;
        return this.shopsRepository.createShop(shop);
    }
}