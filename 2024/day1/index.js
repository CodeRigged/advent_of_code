const fs = require("fs");

const filePath = "./input.txt";

// part 1 of day 1
const calculateDistance = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const leftNumbers = [];
  const rightNumbers = [];

  fileContent.split("\n").forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "") return;

    const [leftNumber, rightNumber] = trimmedLine.split(/\s+/).map(Number);

    leftNumbers.push({ value: leftNumber, index });
    rightNumbers.push({ value: rightNumber, index });
  });

  const leftNumbersSorted = leftNumbers.sort((a, b) => a.value - b.value);
  const rightNumbersSorted = rightNumbers.sort((a, b) => a.value - b.value);

  const distance = leftNumbersSorted.reduce((acc, curr, index) => {
    const step = Math.abs(curr.value - rightNumbersSorted[index].value);
    return acc + step;
  }, 0);

  return distance;
};

const distance = calculateDistance(filePath);
console.log("distance", distance);

// part 2 of day 1
const calculateSimilarityScore = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const leftNumbers = [];
  const rightNumbersCount = {};

  fileContent.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "") return;

    const [leftNumber, rightNumber] = trimmedLine.split(/\s+/).map(Number);

    leftNumbers.push(leftNumber);
    rightNumbersCount[rightNumber] = (rightNumbersCount[rightNumber] || 0) + 1;
  });

  const similarityScore = leftNumbers.reduce((acc, curr) => {
    const step = curr * (rightNumbersCount[curr] || 0);
    return acc + step;
  }, 0);

  return similarityScore;
};

const similarityScore = calculateSimilarityScore(filePath);
console.log("similarityScore", similarityScore);
