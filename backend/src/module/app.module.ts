import { Module } from '@nestjs/common';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../database/typeorm.config';

@Module({
  imports: [
    ShopsModule,
    ItemsModule,
    OrdersModule,
    EventsModule,
    TypeOrmModule.forRoot(typeormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
