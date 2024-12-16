import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ShopsService } from "../shops/shops.service";
import { ItemsService } from "../items/items.service";
import { CreateOrdersDto, OrderItemDto } from "src/module/dtos/create_orders_dto";
import { Orders } from "../entities/orders.entity";
import { get } from "http";
import { OrderToItems } from "src/module/entities/order_to_items.entity";
import { ReturnOrdersDto, ReturnOrderItemDto } from "src/module/dtos/return_orders_dto";
import { create } from "domain";

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
    async getOrders(shop_id: string): Promise<ReturnOrdersDto[]> {
        const orders = await this.ordersRepository.getOrders(shop_id);
        const returnOrdersPromise = orders.map(async(order) => {
            const returnOrder = new ReturnOrdersDto();
            returnOrder.order_id = order.order_id;
            returnOrder.shop_id = shop_id;
            returnOrder.card_number = order.card_number;
            returnOrder.create_at = order.created_at;
            const items = await this.ordersRepository.getItems(order.order_id);
            returnOrder.items = await Promise.all(items.map(async(orderToItem) => {
                const returnOrderItem = new ReturnOrderItemDto();
                returnOrderItem.item_id = orderToItem.item_id;
                returnOrderItem.count = orderToItem.count;
                const item = await this.itemsService.getItems(orderToItem.item_id);
                returnOrderItem.time = item.time;
                returnOrderItem.price = item.price;
                returnOrderItem.name = item.name;
                return returnOrderItem;
            }));
            return returnOrder;
        });
        const returnOrders = await Promise.all(returnOrdersPromise);
        return returnOrders
    }
}