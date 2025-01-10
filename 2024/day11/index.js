const FileReader = require("../utils/FileReader");

const multiplier = 2024;

// helper function
const splitNumber = (num, digits) => {
  const mid = digits >> 1; // Middle index
  const exponent = Math.pow(10, digits - mid); // 10^mid

  const leftPart = Math.floor(num / exponent); // Left half
  const rightPart = num % exponent; // Right half
  return [leftPart, rightPart];
};

// day 11 part 1
const transformStone = (stone) => {
  if (stone === 0) {
    // Rule 1: Stone engraved with 0 becomes 1
    return [1];
  }

  const digits = Math.floor(Math.log10(stone)) + 1; // Count the digits
  if (digits % 2 === 0) {
    // Rule 2: Even number of digits, split into two stones
    return splitNumber(stone, digits);
  }

  // Rule 3: None of the above, multiply by {multiplier=2024}
  return [stone * multiplier];
};

const blink = (stones, iterations) => {
  for (let i = 0; i < iterations; i++) {
    stones = stones.flatMap(transformStone); // Apply transformation
  }

  return stones.length; // Return the total number of stones after iterations
};

const fileReader = new FileReader();
const content = fileReader.fileContent;

const numbers = content.split(" ").map(Number);
const iterationsPart1 = 25;

console.log(
  `The number of stones after ${iterationsPart1} iterations is ${blink(
    numbers,
    iterationsPart1
  )} using method 1.`
);

// day 11 part 2
const stoneCounts = numbers.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
const iterationsPart2 = 75;

const simulateBlinks = (stoneCounts, iterations) => {
  for (let i = 0; i < iterations; i++) {
    let newStoneCounts = {};
    for (const [stone, count] of Object.entries(stoneCounts)) {
      const num = Number(stone);
      if (num === 0) {
        newStoneCounts[1] = (newStoneCounts[1] || 0) + count;
      } else {
        const digits = Math.floor(Math.log10(num)) + 1; // Count the digits
        if (digits % 2 === 0) {
          // Rule 2: Even number of digits, split into two stones
          const [leftPart, rightPart] = splitNumber(num, digits);
          newStoneCounts[leftPart] = (newStoneCounts[leftPart] || 0) + count;
          newStoneCounts[rightPart] = (newStoneCounts[rightPart] || 0) + count;
        } else {
          // Rule 3: None of the above, multiply by {multiplier=2024}
          newStoneCounts[num * multiplier] =
            (newStoneCounts[num * multiplier] || 0) + count;
        }
      }
    }
    stoneCounts = newStoneCounts;
  }

  return Object.values(stoneCounts).reduce((sum, count) => sum + count, 0);
};

console.log(
  `The number of stones after ${iterationsPart2} iterations is ${simulateBlinks(
    stoneCounts,
    iterationsPart2
  )} using method 2.`
);
