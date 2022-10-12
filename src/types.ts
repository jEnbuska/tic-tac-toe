export type Point = readonly [number, number];
export type Range = readonly [Point, Point];

export enum Mark {
  X = "X",
  O = "O",
  EMPTY = "",
}
