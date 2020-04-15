import { isNumber } from "./helpers";
import { OperationCalc, operationChooser } from "./mathOperators";

export const calcStack = (stack: string[]): number => {
  const reversedStack = stack.reverse();
  const workingStack: number[] = [];

  while (reversedStack.length > 0) {
    const currValue: string = reversedStack.pop() as string;

    if (isNumber(currValue)) {
      workingStack.push(Number(currValue));
    } else {
      const operation: OperationCalc = operationChooser[currValue];
      const operationResult = operation(workingStack);
      workingStack.push(operationResult);
    }
  }

  return workingStack[0];
}