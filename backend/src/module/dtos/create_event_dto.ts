import { IsDateString, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    event_id: string;

    @IsString()
    name: string;
    
    @IsString()
    description?: string;

    @IsDateString()
    start_at?: Date;

    @IsDateString()
    end_at?: Date;
}