import { Controller, Get, Post, Body} from "@nestjs/common";
import { OrdersService } from "src/module/orders/orders.service";
import { CreateOrdersDto } from "src/module/dtos/create_orders_dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    @Post()
    createOrders(@Body() createOrdersDto: CreateOrdersDto) {
        return this.ordersService.createOrders(createOrdersDto);
    }
    // @Get()
}