
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    item_id: string;

    @IsNotEmpty()
    count: number;
}

export class CreateOrdersDto {
    @IsString()
    @IsNotEmpty()
    shop_id: string;

    @IsString()
    @IsNotEmpty()
    card_number: string;

    @IsArray()
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

}