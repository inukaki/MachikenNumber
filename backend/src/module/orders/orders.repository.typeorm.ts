import { DataSource } from 'typeorm';
import { ordersConstants } from './orders.constants';
import { Orders } from '../entities/orders.entity';
import { dbConstants } from '../db/db.constants';

export const ordersRepositoryTypeORM = {
    provide: ordersConstants.ORDERS_REPOSITORY_TYPEORM,
    inject: [dbConstants.MACHIKAN_NUMBER_DB],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Orders),
}