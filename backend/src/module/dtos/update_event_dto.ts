import { IsString, IsDateString } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsDateString()
    start_at?: Date;

    @IsDateString()
    end_at?: Date;
}