const fs = require("fs");

const filePath = "./input.txt";

const isUnsafe = (currentNumber, nextNumber, isIncreasing) => {
  const difference = Math.abs(nextNumber - currentNumber);

  const isDecreasing = currentNumber > nextNumber;
  const inRange = difference >= 1 && difference <= 3;

  return (
    (isIncreasing && isDecreasing) ||
    (!isIncreasing && !isDecreasing) ||
    !inRange
  );
};

// part 2 of day 1 (remove dampener logic for part 1)
const checkReportSafety = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  let safeReports = 0;

  fileContent.split("\n").forEach((line) => {
    if (line.trim() === "") return;

    const numbers = line.trim().split(/\s+/).map(Number);

    const isIncreasing = numbers[0] < numbers[1];

    let isSafe = true;
    let dampenerUsed = false;

    for (let i = 0; i < numbers.length - 1; i++) {
      const currentNumber = numbers[i];
      const nextNumber = numbers[i + 1];

      const unsafeNow = isUnsafe(currentNumber, nextNumber, isIncreasing);
      if (unsafeNow && dampenerUsed) {
        isSafe = false;
        break;
      }
      if (!dampenerUsed && unsafeNow) {
        const nextNumberAfter = numbers[i + 2];
        const unsafeAfter = isUnsafe(
          nextNumber,
          nextNumberAfter,
          currentNumber < nextNumberAfter
        );
        dampenerUsed = true;
        numbers.splice(unsafeAfter ? i + 1 : i, 1);
        i--;
      }
    }

    if (isSafe) {
      safeReports++;
    }
  });

  return safeReports;
};

const safeReports = checkReportSafety(filePath);

console.log("safe reports", safeReports);
