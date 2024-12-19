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

        let add_wait_time = 0;

        const orderToItemsPromises = createOrdersDto.items.map(async(item: OrderItemDto) => {
            const orderToItems = new OrderToItems();
            const item_id = await this.itemsService.getItems(item.item_id);
            orderToItems.order_id = createOrder.order_id;
            orderToItems.item_id = item_id.item_id;
            orderToItems.order = createOrder;
            orderToItems.item = item_id;
            orderToItems.count = item.count;
            add_wait_time += item_id.time * item.count;
            return orderToItems;
          });
        const orderToItems = await Promise.all(orderToItemsPromises);
        await this.shopsService.addWaitTime(createOrdersDto.shop_id, add_wait_time);
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
            returnOrder.status = order.status;
            let wait_time = 0;
            const items = await this.ordersRepository.getItems(order.order_id);
            returnOrder.items = await Promise.all(items.map(async(orderToItem) => {
                const returnOrderItem = new ReturnOrderItemDto();
                returnOrderItem.item_id = orderToItem.item_id;
                returnOrderItem.count = orderToItem.count;
                const item = await this.itemsService.getItems(orderToItem.item_id);
                returnOrderItem.time = item.time;
                returnOrderItem.price = item.price;
                returnOrderItem.name = item.name;
                wait_time += item.time * orderToItem.count;
                return returnOrderItem;
            }));
            returnOrder.wait_time = wait_time;
            return returnOrder;
        });
        const returnOrders = await Promise.all(returnOrdersPromise);
        return returnOrders
    }
    async getOrderById(order_id: string): Promise<ReturnOrdersDto> {
        const order = await this.ordersRepository.getOrderById(order_id);
        const returnOrder = new ReturnOrdersDto();
        const shop = order.shop;
        returnOrder.order_id = order.order_id;
        returnOrder.shop_id = "所得できないぴえん";
        returnOrder.card_number = order.card_number;
        returnOrder.create_at = order.created_at;
        returnOrder.status = order.status;
        let wait_time = 0;
        const items = await this.ordersRepository.getItems(order.order_id);
        returnOrder.items = await Promise.all(items.map(async(orderToItem) => {
            const returnOrderItem = new ReturnOrderItemDto();
            returnOrderItem.item_id = orderToItem.item_id;
            returnOrderItem.count = orderToItem.count;
            const item = await this.itemsService.getItems(orderToItem.item_id);
            returnOrderItem.time = item.time;
            returnOrderItem.price = item.price;
            returnOrderItem.name = item.name;
            wait_time += item.time * orderToItem.count;
            return returnOrderItem;
        }));
        returnOrder.wait_time = wait_time;
        return returnOrder;
    }
    async getUnreadyOrders(shop_id: string): Promise<ReturnOrdersDto[]> {
        const orders = await this.ordersRepository.getUnreadyOrders(shop_id);
        const returnOrdersPromise = orders.map(async (order) => {
          const returnOrder = new ReturnOrdersDto();
          returnOrder.order_id = order.order_id;
          returnOrder.shop_id = shop_id;
          returnOrder.card_number = order.card_number;
          returnOrder.create_at = order.created_at;
          returnOrder.status = order.status;
          let wait_time = 0;
          const items = await this.ordersRepository.getItems(order.order_id);
          returnOrder.items = await Promise.all(
            items.map(async (orderToItem) => {
              const returnOrderItem = new ReturnOrderItemDto();
              returnOrderItem.item_id = orderToItem.item_id;
              returnOrderItem.count = orderToItem.count;
              const item = await this.itemsService.getItems(
                orderToItem.item_id,
              );
              returnOrderItem.time = item.time;
              returnOrderItem.price = item.price;
              returnOrderItem.name = item.name;
              wait_time += item.time * orderToItem.count;
              return returnOrderItem;
            }),
          );
          returnOrder.wait_time = wait_time;
          return returnOrder;
        });
        const returnOrders = await Promise.all(returnOrdersPromise);
        return returnOrders;
    }
    async getReadyOrders(shop_id: string): Promise<ReturnOrdersDto[]> {
        const orders = await this.ordersRepository.getReadyOrders(shop_id);
        const returnOrdersPromise = orders.map(async (order) => {
          const returnOrder = new ReturnOrdersDto();
          returnOrder.order_id = order.order_id;
          returnOrder.shop_id = shop_id;
          returnOrder.card_number = order.card_number;
          returnOrder.create_at = order.created_at;
          returnOrder.status = order.status;
          let wait_time = 0;
          const items = await this.ordersRepository.getItems(order.order_id);
          returnOrder.items = await Promise.all(
            items.map(async (orderToItem) => {
              const returnOrderItem = new ReturnOrderItemDto();
              returnOrderItem.item_id = orderToItem.item_id;
              returnOrderItem.count = orderToItem.count;
              const item = await this.itemsService.getItems(
                orderToItem.item_id,
              );
              returnOrderItem.time = item.time;
              returnOrderItem.price = item.price;
              returnOrderItem.name = item.name;
              wait_time += item.time * orderToItem.count;
              return returnOrderItem;
            }),
          );
          returnOrder.wait_time = wait_time;
          return returnOrder;
        });
        const returnOrders = await Promise.all(returnOrdersPromise);
        return returnOrders;
    }
    async getReceivedOrders(shop_id: string): Promise<ReturnOrdersDto[]> {
        const orders = await this.ordersRepository.getReceivedOrders(shop_id);
        const returnOrdersPromise = orders.map(async (order) => {
          const returnOrder = new ReturnOrdersDto();
          returnOrder.order_id = order.order_id;
          returnOrder.shop_id = shop_id;
          returnOrder.card_number = order.card_number;
          returnOrder.create_at = order.created_at;
          returnOrder.status = order.status;
          let wait_time = 0;
          const items = await this.ordersRepository.getItems(order.order_id);
          returnOrder.items = await Promise.all(
            items.map(async (orderToItem) => {
              const returnOrderItem = new ReturnOrderItemDto();
              returnOrderItem.item_id = orderToItem.item_id;
              returnOrderItem.count = orderToItem.count;
              const item = await this.itemsService.getItems(
                orderToItem.item_id,
              );
              returnOrderItem.time = item.time;
              returnOrderItem.price = item.price;
              returnOrderItem.name = item.name;
              wait_time += item.time * orderToItem.count;
              return returnOrderItem;
            }),
          );
          returnOrder.wait_time = wait_time;
          return returnOrder;
        });
        const returnOrders = await Promise.all(returnOrdersPromise);
        return returnOrders;
    }
    async deleteOrder(order_id: string, shop_id: string): Promise<void> {
        const order = await this.getOrderById(order_id);
        if(order.status === 0) {
          const sub_wait_time = order.wait_time;
          await this.shopsService.subWaitTime(shop_id, sub_wait_time);
        }
        await this.ordersRepository.deleteOrder(order_id);
    }
    async readyOrder(order_id: string, shop_id: string): Promise<void> {
        const order = await this.getOrderById(order_id);
        const sub_wait_time = order.wait_time;
        console.log(sub_wait_time);
        await this.shopsService.subWaitTime(shop_id, sub_wait_time);
        await this.ordersRepository.readyOrder(order_id);
    }
    async receivedOrder(order_id: string, shop_id: string): Promise<void> {
        await this.ordersRepository.receivedOrder(order_id);
    }
}