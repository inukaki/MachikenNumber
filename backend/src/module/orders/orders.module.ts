import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/module/db/database.module";
import { OrderToItems } from "src/module/entities/order_to_items.entity";
import { Orders } from "../entities/orders.entity";
import { OrdersController } from "src/module/orders/orders.controller";
import { OrdersService } from "src/module/orders/orders.service";
import { ItemsModule } from "src/module/items/items.module";
import { ShopsModule } from "src/module/shops/shops.module";
import { OrdersRepository } from "./orders.repository";
import { ordersRepositoryTypeORM } from "src/module/orders/orders.repository.typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders, OrderToItems]),
        DatabaseModule,
        ItemsModule,
        ShopsModule ,
        OrderToItems
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService, 
        OrdersRepository, 
        ordersRepositoryTypeORM, 
        OrderToItems, 
        Orders
    ],
    exports: [
        OrdersService, 
        OrdersRepository, 
        ordersRepositoryTypeORM
    ],
})
export class OrdersModule {}