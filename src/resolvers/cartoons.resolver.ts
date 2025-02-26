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
  args: { cartoon: Cartoon }
): number => {
  const id = cartoons[cartoons.length - 1].id + 1;
  const { personnages, ...rest } = args.cartoon;
  const newPersonnages = personnages.map((pers) => ({
    ...pers,
    id: Date.now(),
  }));
  const newCartoon: Cartoon = {
    ...rest,
    personnages: newPersonnages,
    id,
  };

  cartoons.push(newCartoon);
  return id;
};

export const deleteCartoon = (_: unknown, args: { id: string }): boolean => {
  const index = cartoons.findIndex((cartoon) => cartoon.id === +args.id);
  if (index > 0) {
    cartoons.splice(index, 1);
    return true;
  }
  return false;
};
