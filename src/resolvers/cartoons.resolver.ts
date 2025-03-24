import { Cartoon } from "../entities/cartoon.entities";
import { Personnage } from "../entities/personnage.entities";
import { Genre } from "../entities/genres.entities";
import { DeleteResult } from "typeorm";

export const getCartoons = async (): Promise<Cartoon[]> => {
  return await Cartoon.find();
};

type GetOneCartoonByIdArgs = {
  id: string;
};

export const getOneCartoonsById = async (
  _: unknown,
  args: GetOneCartoonByIdArgs
): Promise<Cartoon> => {
  return (await Cartoon.findOneBy({ id: +args.id })) as Cartoon;
};

export const createCartoon = async (
  _: unknown,
  args: { cartoon: Cartoon }
): Promise<Number> => {
  const { personnages, genres, ...rest } = args.cartoon;

  /** Création du tableau d'instance de personnage */
  const newPersonnages = personnages?.map((pers) => {
    const myPers = new Personnage();
    myPers.name = pers.name;
    myPers.short_description = pers.short_description;
    myPers.role = pers.role;

    return myPers;
  }) as Personnage[];

  /** Création du tableau d'instance de genre */
  const newGenre = genres?.map((genre) => {
    const myGr = new Genre();
    myGr.name = genre.name;

    return myGr;
  }) as Genre[];

  /** Association des données et instances à */
  const newCartoon: Cartoon = new Cartoon();
  Object.assign(newCartoon, rest);
  newCartoon.personnages = newPersonnages;
  newCartoon.genres = newGenre;

  const result = await newCartoon.save();
  return result.id;
};

export const deleteCartoon = async (
  _: unknown,
  args: { id: string }
): Promise<boolean> => {
  const result: DeleteResult = await Cartoon.delete({ id: +args.id });
  if (result.affected && result.affected > 1) {
    return true;
  }
  return false;
};
