import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Genre } from "./genres.entities";
import { Personnage } from "./personnage.entities";

@Entity()
export class Cartoon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  nb_of_episodes: number;

  @Column()
  nb_of_seasons: number;

  @Column()
  realisator: string;

  @Column()
  author: string;

  @Column()
  ft_diffusion: string;

  @OneToMany(() => Genre, (genre) => genre.cartoon)
  genres?: Genre[];

  @OneToMany(() => Personnage, (pers) => pers.cartoon)
  personnages?: Personnage[];
}
