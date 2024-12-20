import { dbConstants } from "src/module/db/db.constants";
import { Shop } from "../entities/shops.entity";
import { DataSource } from "typeorm";
import { shopsConstants } from "src/module/shops/shops.constants";

export const shopsRepositoryTypeORM = {
    provide: shopsConstants.SHOPS_REPOSITORY_TYPEORM,
    inject: [dbConstants.MACHIKAN_NUMBER_DB],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
}