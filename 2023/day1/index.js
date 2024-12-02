// File path: readLines.js
const fs = require("fs");
const readline = require("readline");

const filePath = "./input.txt";

const numberWordsToValues = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const wordRegex = new RegExp(
  "(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))",
  "gi"
);

const convertNumber = (numberAsString) => {
  return numberWordsToValues[numberAsString] ?? numberAsString;
};

async function getSumOfDigits(filePath) {
  let sum = 0;
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      const matches = [...line.matchAll(wordRegex)];

      const firstMatch = matches.at(0)[1];
      const lastMatch = matches.at(-1)[1];
      const firstNumber = convertNumber(firstMatch);
      const lastNumber = convertNumber(lastMatch);
      sum += parseInt(firstNumber + lastNumber);
    }
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }

  return sum;
}

getSumOfDigits(filePath).then((result) => console.log(result));
