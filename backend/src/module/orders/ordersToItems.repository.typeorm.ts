import { DataSource } from 'typeorm';
import { orderToItemsConstants } from './ordersToItems.constants';
import { OrderToItems } from 'src/module/entities/order_to_items.entity';
import { dbConstants } from '../db/db.constants';

export const ordersToItemsRepositoryTypeORM = {
    provide: orderToItemsConstants.ORDERTOITEMS_REPOSITORY_TYPEORM,
    inject: [dbConstants.MACHIKAN_NUMBER_DB],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderToItems),
}