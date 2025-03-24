import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./bd.sqlite",
  entities: [],
  synchronize: true,
});
