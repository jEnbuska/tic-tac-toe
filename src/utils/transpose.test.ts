import { expect, test } from "vitest";
import transpose from "./transpose";

test("transpose 3x3", () => {
  const input = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  ];
  const output = transpose(input);
  const expected = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  ];
  expect(output).toStrictEqual(expected);
  expect(transpose(output)).toStrictEqual(input);
});

test("transpose 2x3", () => {
  const input = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  const output = transpose(input);
  const expected = [
    [1, 3, 5],
    [2, 4, 6],
  ];
  expect(output).toStrictEqual(expected);
  expect(transpose(output)).toStrictEqual(input);
});
