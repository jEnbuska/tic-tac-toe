import range from "lodash.range";
import { Mark } from "../types";

export default function createGame(size: number): Mark[][] {
  return range(size).map(() => {
    return range(size).map(() => Mark.EMPTY);
  });
}
