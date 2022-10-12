import { Range } from "../types";

export default function getRotation(range: Range) {
  const [[y1, x1], [y2, x2]] = range;
  const dy = y1 - y2;
  const dx = x1 - x2;
  return Math.atan2(dy, dx) - Math.PI;
}
