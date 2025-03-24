import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Cartoon } from "./cartoon.entities";

@Entity()
export class Personnage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  short_description: string;

  @ManyToOne(() => Cartoon, (cartoon) => cartoon.personnages)
  cartoon: Cartoon;
}
