import "reflect-metadata"
import { DataSource } from "typeorm"
import {PersonEntity} from "./entity/personEntity";
import {ProfessionEntity} from "./entity/professionEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [PersonEntity, ProfessionEntity],
    migrations: ['./src/migrations/*.ts'],
    subscribers: [],
    relationLoadStrategy: "join"
})
