import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ShopsService } from "../shops/shops.service";
import { ItemsService } from "../items/items.service";
import { CreateOrdersDto, OrderItemDto } from "src/module/dtos/create_orders_dto";
import { Orders } from "../entities/orders.entity";
import { get } from "http";
import { OrderToItems } from "src/module/entities/order_to_items.entity";

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly shopsService: ShopsService,
        private readonly itemsService: ItemsService,
    ) {}
    async createOrders(createOrdersDto: CreateOrdersDto): Promise<void> {
        const orders = new Orders();
        const shop_id = await this.shopsService.getShop(createOrdersDto.shop_id);
        orders.shop = shop_id;
        orders.card_number = createOrdersDto.card_number;

        const createOrder = await this.ordersRepository.createOrders(orders);

        const orderToItemsPromises = createOrdersDto.items.map(async(item: OrderItemDto) => {
            const orderToItems = new OrderToItems();
            const item_id = await this.itemsService.getItems(item.item_id);
            orderToItems.order_id = createOrder.order_id;
            orderToItems.item_id = item_id.item_id;
            orderToItems.order = createOrder;
            orderToItems.item = item_id;
            orderToItems.count = item.count;
            return orderToItems;
        });
        const orderToItems = await Promise.all(orderToItemsPromises);
        await this.ordersRepository.saveOrderToItems(orderToItems);
    }
}