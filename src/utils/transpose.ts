// Rotates the matrix around
export default function transpose<T>(matrix: T[][]): T[][] {
  let transformed: T[][] = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (transformed.length === x) {
        transformed.push([]);
      }
      transformed[x][y] = matrix[y][x];
    }
  }
  return transformed;
}
