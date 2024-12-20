import { dbConstants } from 'src/module/db/db.constants';
import { Items } from '../entities/items.entity';
import { DataSource } from 'typeorm';
import { itemsConstants } from './items.constants';

export const itemsRepositoryTypeORM = {
  provide: itemsConstants.ITEMS_REPOSITORY_TYPEORM,
  inject: [dbConstants.MACHIKAN_NUMBER_DB],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Items),
};
