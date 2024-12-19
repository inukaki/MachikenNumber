import { Controller, Get, Post, Body, Param, Delete, Patch} from "@nestjs/common";
import { OrdersService } from "src/module/orders/orders.service";
import { CreateOrdersDto } from "src/module/dtos/create_orders_dto";
import { ReturnOrdersDto } from "src/module/dtos/return_orders_dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    @Post()
    createOrders(@Body() createOrdersDto: CreateOrdersDto) {
        return this.ordersService.createOrders(createOrdersDto);
    }
    @Get(':shop_id')
    getOrders(@Param('shop_id') shop_id: string): Promise<ReturnOrdersDto[]> {
        return this.ordersService.getOrders(shop_id);
    }
    @Get(':shop_id/unready')
    getUnreadyOrders(@Param('shop_id') shop_id: string): Promise<ReturnOrdersDto[]> {
        return this.ordersService.getUnreadyOrders(shop_id);
    }
    @Get(':shop_id/ready')
    getReadyOrders(@Param('shop_id') shop_id: string): Promise<ReturnOrdersDto[]> {
        return this.ordersService.getReadyOrders(shop_id);
    }
    @Get(':shop_id/received')
    getReceivedOrders(@Param('shop_id') shop_id: string): Promise<ReturnOrdersDto[]> {
        return this.ordersService.getReceivedOrders(shop_id);
    }
    @Delete(':order_id')
    deleteOrder(@Param('order_id') order_id: string): Promise<void> {
        return this.ordersService.deleteOrder(order_id);
    }
    @Patch(':order_id/ready')
    readyOrder(@Param('order_id') order_id: string): Promise<void> {
        return this.ordersService.readyOrder(order_id);
    }
    @Patch(':order_id/received')
    receivedOrder(@Param('order_id') order_id: string): Promise<void> {
        return this.ordersService.receivedOrder(order_id);
    }
}