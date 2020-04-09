export const mathPriorities: number[] = [1, 2, 3, 4];

const [FIRST, SECOND, THIRD, FOURTH] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "*": SECOND,
  "/": SECOND,
  "+": FIRST,
  "-": FIRST,
  "^": THIRD,
  "**": THIRD,
  sin: FOURTH,
  cos: FOURTH,
  tan: FOURTH,
  "!": FOURTH,
};
