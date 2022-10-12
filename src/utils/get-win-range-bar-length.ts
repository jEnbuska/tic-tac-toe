import { Range } from "../types";

const diagonalBlockWidth = Math.sqrt(2);
export default function getWinRangeBarLength(range: Range): number {
  const [[y1, x1], [y2, x2]] = range;
  let blockWidth = y1 - y2 && x1 - x2 ? diagonalBlockWidth : 1;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) - blockWidth;
}
