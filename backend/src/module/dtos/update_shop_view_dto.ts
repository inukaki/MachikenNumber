import { IsString, IsBoolean } from 'class-validator';

export class UpdateShopViewDto{
    @IsString() 
    shop_id: string;

    @IsBoolean()
    status: boolean;
}