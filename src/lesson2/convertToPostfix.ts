import { isNumber, isFunction } from "./helpers";
import { mathOperatorsPriorities } from "./mathOperators";

export default (inputArr: string[]): string[] => {
  const resutingArray: string[] = [];
  const operatorsArray: string[] = [];

  inputArr.forEach((el) => {
    if (isNumber(el)) {
      resutingArray.push(el);
    } else {
      if (el === "(") {
        operatorsArray.push(el);
      } else if (el === ")") {
        while (operatorsArray[operatorsArray.length - 1] !== "(") {
          resutingArray.push(operatorsArray.pop() as string);
        }

        if (operatorsArray[operatorsArray.length - 1] === "(") {
          operatorsArray.pop();
        }
      } else if (isFunction(el)) {
        operatorsArray.push(el);
      } else if (operatorsArray.length > 0) {
        while (
          operatorsArray.length > 0
            ? isFunction(operatorsArray[operatorsArray.length - 1])
            : false ||
              ((mathOperatorsPriorities[
                operatorsArray[operatorsArray.length - 1]
              ] > mathOperatorsPriorities[el] ||
                (mathOperatorsPriorities[
                  operatorsArray[operatorsArray.length - 1]
                ] === mathOperatorsPriorities[el] &&
                  mathOperatorsPriorities[el] < 3)) &&
                operatorsArray[operatorsArray.length - 1] !== "(")
        ) {
          resutingArray.push(operatorsArray.pop() as string);
        }

        operatorsArray.push(el);
      } else {
        operatorsArray.push(el);
      }
    }
  });

  while (operatorsArray.length > 0) {
    resutingArray.push(operatorsArray.pop() as string);
  }

  return resutingArray;
};
