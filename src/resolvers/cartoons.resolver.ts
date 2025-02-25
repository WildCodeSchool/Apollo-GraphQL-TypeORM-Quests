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

export const createCartoon = (_: unknown, args: Cartoon): number => {
  const id = cartoons[cartoons.length - 1].id + 1;
  const newCartoon: Cartoon = {
    ...args,
    id,
  };

  cartoons.push(newCartoon);
  return id;
};
