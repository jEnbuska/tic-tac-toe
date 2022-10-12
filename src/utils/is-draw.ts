import { Mark } from "../types";

export default function isDraw(grid: Mark[][]) {
  return grid.flat(1).every((mark) => mark !== Mark.EMPTY);
}
