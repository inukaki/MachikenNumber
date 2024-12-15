import { IsString, IsNumber } from 'class-validator';

export class ReturnItemsDto {
    @IsString()
    item_id: string;

    @IsString()
    name: string;
    
    @IsNumber()
    price: number;
    
    @IsNumber()
    time: number;    
}