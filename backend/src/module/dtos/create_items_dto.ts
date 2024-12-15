import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemsDto {
    @IsString()
    @IsNotEmpty()
    shop_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    time: number;
}