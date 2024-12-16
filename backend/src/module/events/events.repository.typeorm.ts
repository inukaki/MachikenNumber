import { dbConstants } from 'src/module/db/db.constants';
import { Event } from '../entities/events.entity';
import { DataSource } from 'typeorm';
import { eventsConstants } from 'src/module/events/events.constants';

export const eventsRepositoryTypeORM = {
    provide: eventsConstants.EVENTS_REPOSITORY_TYPEORM,
    inject: [dbConstants.MACHIKAN_NUMBER_DB],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
};
