import { dbConstants } from 'src/module/db/db.constants';
import { Provider } from '@nestjs/common';
import { machikanNumberDataSource } from 'src/data-source/machikanNumber_data_source';

export const machikanNumberDatabaseProvider: Provider = {
  provide: dbConstants.MACHIKAN_NUMBER_DB,
  useFactory: async () => await machikanNumberDataSource.initialize(),
};
