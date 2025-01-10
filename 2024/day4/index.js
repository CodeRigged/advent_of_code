const { allCardinalDirections } = require("../utils/constants");
const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const { grid, height, width } = fileReader.asGrid();

/** day 4 part 1 */
// Helper function to check if the word exists starting from (x, y) in direction (dx, dy)
const isWordAtPosition = (x, y, dx, dy, word, grid) => {
  const wordLength = word.length;

  for (let i = 0; i < wordLength; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;

    // Boundary check
    if (
      FileReader.isOutOfBounds(nx, ny, height, width) ||
      grid[nx][ny] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};

const countWordAppearence = (word) => {
  let count = 0;

  // iterate over the grid
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // iterate over all the directions
      for (const { dx, dy } of allCardinalDirections) {
        if (isWordAtPosition(row, col, dx, dy, word, grid)) {
          count++;
        }
      }
    }
  }

  return count;
};

const xmas = "XMAS";

const wordCount = countWordAppearence(xmas);
console.log(`The word "${xmas}" appears ${wordCount} times.`);

/** day 4 part 2 */
// Helper function to check if the word exists as X in grid
const isXAtPosition = (x, y, xMap, centerChar, word, wordInReverse, grid) => {
  if (grid[x][y] !== centerChar) return false;

  let wordNWToSE = centerChar;
  let wordNEToSW = centerChar;

  for (const { dx, dy } of xMap) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= height || ny >= width || !grid[nx][ny]) {
      return false;
    }

    if (dx === dy) {
      if (dy > 0) {
        wordNWToSE = wordNWToSE + grid[nx][ny];
      } else {
        wordNWToSE = grid[nx][ny] + wordNWToSE;
      }
    } else {
      if (dy > 0) {
        wordNEToSW = wordNEToSW + grid[nx][ny];
      } else {
        wordNEToSW = grid[nx][ny] + wordNEToSW;
      }
    }
  }

  const isValid =
    (word === wordNWToSE || wordInReverse === wordNWToSE) &&
    (word === wordNEToSW || wordInReverse === wordNEToSW);

  return isValid;
};

const countWordAppearenceAsX = (word) => {
  const wordInReverse = word.split("").reverse().join("");
  if (word.length % 2 === 0)
    throw new Error(
      "Word must be an uneven number of characters for it to form an X."
    );

  const centerChar = word[word.length >> 1];

  const xMap = Array.from({ length: (word.length - 1) / 2 }).flatMap((_, i) => {
    let dx = i + 1;
    let dy = i + 1;
    return [
      { dx: -dx, dy: -dy }, // northwest
      { dx, dy: -dy }, // northeast
      { dx: -dx, dy }, // southwest
      { dx, dy }, // southeast
    ];
  });

  let count = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (
        isXAtPosition(row, col, xMap, centerChar, word, wordInReverse, grid)
      ) {
        count++;
      }
    }
  }

  return count;
};

const mas = "MAS";
const xCount = countWordAppearenceAsX(mas);
console.log(`The word "${mas}" appears ${xCount} times as an X.`);
