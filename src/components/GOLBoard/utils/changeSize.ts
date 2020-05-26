export function changeSize(
  shiftX: number,
  shiftY: number,
  oldScheme: boolean[][]
): boolean[][] {
  let newScheme: boolean[][];

  if (shiftY !== 0) {
    newScheme =
      shiftY < 0
        ? oldScheme.slice(0, oldScheme.length - shiftY * -1)
        : [
            ...oldScheme,
            ...new Array(shiftY).fill(
              new Array(oldScheme[0].length).fill(false)
            ),
          ];
  } else {
    newScheme = oldScheme;
  }

  if (shiftX !== 0) {
    newScheme =
      shiftX < 0
        ? newScheme.map((row) => {
            return row.slice(0, row.length - shiftX * -1);
          })
        : newScheme.map((row) => {
            return [...row, ...new Array(shiftX).fill(false)];
          });
  }

  return newScheme;
}
