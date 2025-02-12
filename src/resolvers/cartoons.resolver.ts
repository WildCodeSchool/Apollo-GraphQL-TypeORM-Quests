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
