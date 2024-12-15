import { IsString, IsNumber } from 'class-validator';

export class UpdateItemsDto {
    @IsString()
    name?: string;

    @IsNumber()
    price?: number;

    @IsNumber()
    time?: number;
}