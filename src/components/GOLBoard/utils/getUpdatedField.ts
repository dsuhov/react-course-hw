function adjacentStatus(field: boolean[][], coords: [number, number]): 1 | 0 {
  const x = coords[0];
  const y = coords[1];

  if (x < 0 || x > field[0].length - 1) {
    return 0;
  }
  if (y < 0 || y > field.length - 1) {
    return 0;
  }

  return field[y][x] ? 1 : 0;
}

function livecircleStatus(
  cell: boolean,
  cellCoords: [number, number],
  field: boolean[][]
): boolean {
  let adjacentAlive = 0;
  const x = cellCoords[0];
  const y = cellCoords[1];

  adjacentAlive += adjacentStatus(field, [x - 1, y - 1]);
  adjacentAlive += adjacentStatus(field, [x, y - 1]);
  adjacentAlive += adjacentStatus(field, [x + 1, y - 1]);
  adjacentAlive += adjacentStatus(field, [x - 1, y]);
  adjacentAlive += adjacentStatus(field, [x + 1, y]);
  adjacentAlive += adjacentStatus(field, [x - 1, y + 1]);
  adjacentAlive += adjacentStatus(field, [x, y + 1]);
  adjacentAlive += adjacentStatus(field, [x + 1, y + 1]);

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
