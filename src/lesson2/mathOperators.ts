export const mathPriorities: number[] = [1, 2, 3, 4];

const [FIRST, SECOND, THIRD, FOURTH] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "*": SECOND,
  "/": SECOND,
  "+": FIRST,
  "-": FIRST,
  "^": THIRD,
  "**": THIRD,
  "!": FOURTH,
};

export type OperationCalc = (a: number[]) => number;

export const plus: OperationCalc = (valuesStack) => {
  return Number(valuesStack.pop()) + Number(valuesStack.pop());
};

export const mul: OperationCalc = (valuesStack) => {
  return Number(valuesStack.pop()) * Number(valuesStack.pop());
};

export const minus: OperationCalc = (valuesStack) => {
  const tempNum = Number(valuesStack.pop());
  return Number(valuesStack.pop()) - tempNum;
};

export const div: OperationCalc = (valuesStack) => {
  const tempNum = Number(valuesStack.pop());
  return Number(valuesStack.pop()) / tempNum;
};

export const square: OperationCalc = (valuesStack) => {
  return Math.pow(Number(valuesStack.pop()), 2);
};

export const powOf: OperationCalc = (valuesStack) => {
  const tempNum = Number(valuesStack.pop());
  return Math.pow(Number(valuesStack.pop()), tempNum);
};

export const factor: OperationCalc = (valuesStack) => {
  let result = 1;
  const factorVale = Number(valuesStack.pop())

  for (let i = 1; i <= factorVale; i++) {
    result *= i;
  }

  return result;
};

export const operationChooser: {
  [key: string]: OperationCalc;
} = {
  "+": plus,
  "-": minus,
  "/": div,
  "*": mul,
  "**": square,
  "^": powOf,
  "!": factor,
};
