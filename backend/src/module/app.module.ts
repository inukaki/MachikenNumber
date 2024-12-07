import { Module } from '@nestjs/common';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [ShopsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
