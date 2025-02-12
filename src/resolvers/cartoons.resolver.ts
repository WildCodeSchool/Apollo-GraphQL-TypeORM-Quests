import { Cartoon } from "../types/cartoons.type";
import { default as cartoons } from "../../dataset.json";

export const getCartoons = (): Cartoon[] => {
  return cartoons;
};

type GetOneCartoonByIdArgs = {
  id: string;
};

export const getOneCartoonsById = (
  _: unknown,
  args: GetOneCartoonByIdArgs
): Cartoon => {
  return cartoons.find((cartoon) => cartoon.id === +args.id) as Cartoon;
};

export const createCartoon = (
  _: unknown,
  args: { name: string; description: string }
): number => {
  const id = cartoons[cartoons.length - 1].id + 1;
  const { name, description } = args;
  const newCartoon: Cartoon = {
    id,
    name,
    description,
    nb_of_episodes: 0,
    nb_of_seasons: 0,
    genres: undefined,
    realisator: "",
    author: "",
    ft_diffusion: "",
    personnages: undefined,
  };
  console.log(newCartoon);
  // cartoons.push(newCartoon);
  return id;
};
