import { Module } from '@nestjs/common';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../database/typeorm.config';

@Module({
  imports: [
    ShopsModule,
    ItemsModule,
    TypeOrmModule.forRoot(typeormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
