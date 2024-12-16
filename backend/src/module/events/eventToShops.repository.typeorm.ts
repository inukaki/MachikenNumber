import { dbConstants } from 'src/module/db/db.constants';
import { DataSource } from 'typeorm';
import { EventToShops } from 'src/module/entities/event_to_shops.entity';
import { eventToShopsConstants } from 'src/module/events/eventToShops.constants';

export const eventToShopsRepositoryTypeORM = {
    provide: eventToShopsConstants.EVENTTOSHOPS_REPOSITORY_TYPEORM,
    inject: [dbConstants.MACHIKAN_NUMBER_DB],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EventToShops),
};
