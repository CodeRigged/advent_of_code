const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const grid = fileReader.asGrid();
const numRows = grid.length;
const numCols = grid[0].length;

/** day 4 part 1 */
// Helper function to check if the word exists starting from (x, y) in direction (dx, dy)
const isWordAtPosition = (x, y, dx, dy, word, grid) => {
  const wordLength = word.length;

  for (let i = 0; i < wordLength; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;

    // Boundary check
    if (
      nx < 0 ||
      ny < 0 ||
      nx >= numRows ||
      ny >= numCols ||
      grid[nx][ny] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};

const countWordAppearence = (word) => {
  const directions = [
    { dx: -1, dy: 0 }, // west
    { dx: 1, dy: 0 }, // east
    { dx: 0, dy: -1 }, // north
    { dx: 0, dy: 1 }, // south
    { dx: -1, dy: -1 }, // northwest
    { dx: 1, dy: -1 }, // northeast
    { dx: -1, dy: 1 }, // southwest
    { dx: 1, dy: 1 }, // southeast
  ];

  let count = 0;

  // iterate over the grid
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // iterate over the directions
      for (const { dx, dy } of directions) {
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
    if (nx < 0 || ny < 0 || nx >= numRows || ny >= numCols || !grid[nx][ny]) {
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
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
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
