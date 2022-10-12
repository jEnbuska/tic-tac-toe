import range from "lodash.range";
import { Mark } from "../types";
import arrayProducer from "./array-producer";
import transpose from "./transpose";

const findHorizontalConsecutiveRanges = arrayProducer(function* <T>(
  grid: T[][],
  match: T,
  threshold: number
) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length - threshold + 1; x++) {
      const v = grid[y][x];
      if (v !== match) {
        continue;
      }
      let consecutives =
        [...grid[y].slice(x + 1), Symbol()].findIndex((v) => v !== match) + 1;
      if (consecutives >= threshold) {
        yield [
          [y, x],
          [y, x + consecutives],
        ] as const;
      }
    }
  }
});

const findVerticalConsecutiveRanges = arrayProducer(function* <T>(
  grid: T[][],
  match: T,
  threshold: number
) {
  const rotatedGrid = transpose(grid);
  const generator = findHorizontalConsecutiveRanges(
    rotatedGrid,
    match,
    threshold
  );
  for (const value of generator) {
    const [[y1, x1], [y2, x2]] = value;
    yield [
      // flip x and y around
      [x1, y1],
      [x2, y2],
    ] as const;
  }
});
const findDescendingDiagonalConsecutiveRanges = arrayProducer(function* <T>(
  grid: T[][],
  match: T,
  threshold: number
) {
  for (let y = 0; y < grid.length - threshold + 1; y++) {
    for (let x = 0; x < grid.length - threshold + 1; x++) {
      const value = grid[y][x];
      if (value !== match) {
        continue;
      }
      const consecutives =
        [...range(1, grid.length - Math.max(y, x)), grid.length].findIndex(
          (d) => {
            return grid?.[y + d]?.[x + d] !== value;
          }
        ) + 1;
      if (consecutives >= threshold) {
        yield [
          [y, x],
          [y + consecutives, x + consecutives],
        ] as const;
      }
    }
  }
});

const findAscendingDiagonalConsecutiveRanges = arrayProducer(function* <T>(
  grid: T[][],
  match: T,
  threshold: number
) {
  const reversedGrid = grid.map((row) => row.slice().reverse());
  const generator = findDescendingDiagonalConsecutiveRanges(
    reversedGrid,
    match,
    threshold
  );
  const rowLength = grid[0]?.length ?? 0;
  for (const value of generator) {
    const [[y1, x1], [y2, x2]] = value;
    yield [
      [y1, Math.abs(rowLength - x1) - 1],
      [y2, Math.abs(rowLength - x2) - 1],
    ] as const;
  }
});

export default function getWinRanges(grid: string[][]) {
  return [
    findHorizontalConsecutiveRanges,
    findVerticalConsecutiveRanges,
    findDescendingDiagonalConsecutiveRanges,
    findAscendingDiagonalConsecutiveRanges,
  ].flatMap((cb) =>
    [Mark.X, Mark.O].flatMap((mark) =>
      cb(grid, mark, Math.min(5, grid.length)).map((range) => {
        return { range, mark };
      })
    )
  );
}
