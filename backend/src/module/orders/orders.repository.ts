import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { OrderToItems } from '../entities/order_to_items.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepositoryTypeORM: Repository<Orders>,
        @InjectRepository(OrderToItems)
        private readonly orderToItemsRepositoryTypeORM: Repository<OrderToItems>,
    ) {}
    async createOrders(orders: Orders): Promise<Orders> {
        const createdOrders = await this.ordersRepositoryTypeORM.save(orders);
        return createdOrders;
    }
    async saveOrderToItems(orderToItems: OrderToItems[]): Promise<void> {
        await this.orderToItemsRepositoryTypeORM.save(orderToItems);
    }
}