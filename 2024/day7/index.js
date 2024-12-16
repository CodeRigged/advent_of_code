const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const lines = fileReader.asLines();

/** Day 7 */
const getCalibrationResult = (operators) => {
  return lines.reduce((calibrationResult, curLine) => {
    const [sideA, sideB] = curLine.split(":");
    const calibration = Number(sideA);
    const numbers = sideB.trim().split(" ").map(Number);

    const possibleCombinations = Math.pow(operators.length, numbers.length - 1);

    for (let i = 0; i < possibleCombinations; i++) {
      let start = numbers[0];
      let combination = i
        .toString(operators.length)
        .padStart(numbers.length - 1, "0");
      for (let j = 0; j < combination.length; j++) {
        start = applyOperator(operators[combination[j]], start, numbers[j + 1]);
      }
      if (start === calibration) {
        calibrationResult += calibration;
        return calibrationResult;
      }
    }

    return calibrationResult;
  }, 0);
};

// Helper function, can be extended to support more operators
const applyOperator = (operator, a, b) => {
  switch (operator) {
    case "+":
      return a + b;
    case "*":
      return a * b;
    case "||":
      return Number(String(a) + String(b));
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

// part 1
const calibrationResultA = getCalibrationResult(["+", "*"]);
console.log(`The calibration result for part 1 is ${calibrationResultA}.`);

// part 2
const calibrationResultB = getCalibrationResult(["+", "*", "||"]);
console.log(`The calibration result for part 2 is ${calibrationResultB}.`);
