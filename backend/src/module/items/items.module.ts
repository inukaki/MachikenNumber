import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Items } from '../entities/items.entity';
import { Shop } from '../entities/shops.entity';
import { ItemsRepository } from './items.repository';
import { itemsRepositoryTypeORM } from './items.repository.typeorm';
import { ShopsService } from '../shops/shops.service';
import { ShopsRepository } from '../shops/shops.repository';
import { DatabaseModule } from '../db/database.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Items]),
        DatabaseModule,
        ShopsModule
    ],
    controllers: [ItemsController],
    providers: [
        ItemsService,
        ItemsRepository,
        itemsRepositoryTypeORM
    ],
    exports: [
        ItemsService,
        ItemsRepository,
        itemsRepositoryTypeORM
    ]
})
export class ItemsModule {}