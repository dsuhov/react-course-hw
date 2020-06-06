import shuffle from "lodash/shuffle";

export function fillField(fullness: number, sizeX: number, sizeY: number) {
  if (fullness < 10 || fullness > 100) {
    throw new Error("Incorrec data");
  }

  const plainSize = sizeX * sizeY;
  const fillCells = Math.ceil((plainSize / 100) * fullness);

  const arr = new Array(plainSize).fill(false);

  for (let i = 0; i < fillCells; i++) {
    arr[i] = true;
  }

  const shuffledArr = shuffle(arr);
  const newArr = [];

  for (let i = 0; i < sizeY; i++) {
    newArr.push(shuffledArr.splice(0, sizeX));
  }

  return newArr;
}
