import { Controller, Get, Post, Body, Param} from "@nestjs/common";
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
}