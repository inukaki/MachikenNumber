import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    start_at: Date;

    @IsDate()
    end_at: Date;

    @IsString()
    description: string;
}