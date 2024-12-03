const fs = require("fs");

const filePath = "./input.txt";

// day 3 part 1&2
function mulUncorruptedNumbers(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Regex to match `mul(number,number)` or relevant control keywords

  /*  regex for part 1:  const mulRegex = /mul\((\d+),(\d+)\)/g; */
  const mulRegex = /(don't\(\))|(do\(\))|mul\((\d+),(\d+)\)/g;

  let result = 0;

  let inDontBlock = false;

  let match;
  while ((match = mulRegex.exec(fileContent)) !== null) {
    if (match[1]) {
      // Enter "don't block" when "don't()" is found
      inDontBlock = true;
    } else if (match[2]) {
      // Exit "don't block" when "do()" or "undo()" is found
      inDontBlock = false;
    } else if (match[3] && !inDontBlock) {
      // Capture `mul(...)` when not in a "don't block"
      // part 1: match[1] and match[2] instead
      const num1 = parseInt(match[3], 10);
      const num2 = parseInt(match[4], 10);

      result += num1 * num2;
    }
  }

  return result;
}

const result = mulUncorruptedNumbers(filePath);
console.log(result);
