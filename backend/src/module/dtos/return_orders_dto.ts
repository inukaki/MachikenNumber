import { IsString, IsNumber, IsArray, IsDateString } from 'class-validator';

export class ReturnOrderItemDto {
  @IsString()
  item_id: string;

  @IsString()
  name: string;

  @IsNumber()
  count: number;

  @IsNumber()
  price: number;

  @IsNumber()
  time: number;
}

export class ReturnOrdersDto {
  @IsString()
  order_id: string;

  @IsString()
  shop_id: string;

  @IsString()
  card_number: string;

  @IsDateString()
  create_at: Date;

  @IsArray()
  items: ReturnOrderItemDto[];
}
