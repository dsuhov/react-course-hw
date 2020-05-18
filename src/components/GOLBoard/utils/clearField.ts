export function clearField(size: [number, number]) {
  const length = size[0];
  const height = size[1];

  return new Array(height).fill(new Array(length).fill(false));
}
