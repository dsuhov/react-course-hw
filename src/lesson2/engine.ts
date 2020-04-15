import { calcStack } from "./calcStack";
import convertToPostfix from "./convertToPostfix";
import { isNumber } from "./helpers";

export const doCalculation = (input: string): number => {
  const splittedInput = input.split(" ");

  if (!isNumber(splittedInput[1])) {
    return calcStack(convertToPostfix(splittedInput));
  }

  return calcStack(splittedInput);
}