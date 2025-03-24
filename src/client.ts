import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Cartoon } from "./entities/cartoon.entities";
import { Genre } from "./entities/genres.entities";
import { Personnage } from "./entities/personnage.entities";

dotenv.config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./bd.sqlite",
  entities: [Cartoon, Genre, Personnage],
  synchronize: true,
});
