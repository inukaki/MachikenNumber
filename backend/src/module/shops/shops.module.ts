import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopsController } from "src/module/shops/shops.controller";
import { ShopsRepository } from "src/module/shops/shops.repository";
import { shopsRepositoryTypeORM } from "src/module/shops/shops.repository.typeorm";
import { ShopsService } from "src/module/shops/shops.service";
import { Shop } from "../entities/shops.entity";
import { DatabaseModule } from "src/module/db/database.module";
import { Items } from "src/module/entities/items.entity";
import { ShopToCardNumbers } from "src/module/entities/shop_to_card_numbers.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, Items, ShopToCardNumbers]),
        DatabaseModule
    ],
    controllers: [ShopsController],
    providers: [
        ShopsService,
        ShopsRepository,
        shopsRepositoryTypeORM
    ],
    exports: [
        ShopsService,
        ShopsRepository,
        shopsRepositoryTypeORM
    ]
})
export class ShopsModule {}