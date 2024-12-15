import { IsDate, IsString } from 'class-validator';

export class UpdateShopDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsDate()
    start_at?: Date;

    @IsDate()
    end_at?: Date;
}