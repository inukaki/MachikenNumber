import { Module } from "@nestjs/common";
import { machikanNumberDatabaseProvider } from "./machikanNumber_Database.provider";

@Module({
    providers: [machikanNumberDatabaseProvider],
    exports: [machikanNumberDatabaseProvider],
})
export class DatabaseModule {}