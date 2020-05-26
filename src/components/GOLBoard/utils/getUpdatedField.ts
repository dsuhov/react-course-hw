function livecircleStatus(
  cell: boolean,
  cellCoords: [number, number],
  field: boolean[][]
): boolean {
  let adjacentAlive = 0;
  const x = cellCoords[1];
  const y = cellCoords[0];

  adjacentAlive += field[x - 1] ? (field[x - 1][y - 1] ? 1 : 0) : 0;
  adjacentAlive += field[x][y - 1] ? 1 : 0;
  adjacentAlive += field[x + 1] ? (field[x + 1][y - 1] ? 1 : 0) : 0;

  adjacentAlive += field[x - 1] ? (field[x - 1][y] ? 1 : 0) : 0;
  adjacentAlive += field[x + 1] ? (field[x + 1][y] ? 1 : 0) : 0;

  adjacentAlive += field[x - 1] ? (field[x - 1][y + 1] ? 1 : 0) : 0;
  adjacentAlive += field[x][y + 1] ? 1 : 0;
  adjacentAlive += field[x + 1] ? (field[x + 1][y + 1] ? 1 : 0) : 0;

  if (cell) {
    if (adjacentAlive < 2) {
      return false;
    }
    if (adjacentAlive === 2 || adjacentAlive === 3) {
      return true;
    }
    if (adjacentAlive > 3) {
      return false;
    }
  } else {
    if (adjacentAlive === 3) {
      return true;
    }
  }

  return false;
}

export function getUpdatedField(field: boolean[][]): boolean[][] {
  return field.map((row, y) => {
    return row.map((cell, x) => {
      return livecircleStatus(cell, [x, y], field);
    });
  });
}
