import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shop } from "../entities/shops.entity";

@Injectable()
export class ShopsRepository {
    constructor(
        @InjectRepository(Shop)
        private shopsRepositoryTypeORM: Repository<Shop>,
    ) {}
    async createShop(shop: Shop): Promise<Shop> {
        const createdShop = await this.shopsRepositoryTypeORM.save(shop);
        return createdShop;
    }
    getShop() {
        return 'This action returns a shop';
    }
    updateShop() {
        return 'This action updates a shop';
    }
}