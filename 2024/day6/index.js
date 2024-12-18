const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const grid = fileReader.asGrid();
const numRows = grid.length;
const numCols = grid[0].length;

/** day 6 part 1 */
const getDistinctPositions = () => {
  let distinctPositions = 0;
  const directions = [
    { dx: 0, dy: -1 }, // north
    { dx: 1, dy: 0 }, // east
    { dx: 0, dy: 1 }, // south
    { dx: -1, dy: 0 }, // west
  ];

  let positionY = grid.findIndex((row) => row.includes("^"));
  let positionX = grid[positionY].findIndex((col) => col === "^");
  let currentDirectionIndex = 0;

  while (
    numRows >= positionY &&
    numCols >= positionX &&
    positionY >= 0 &&
    positionX >= 0
  ) {
    // current direction
    const { dx, dy } = directions[currentDirectionIndex];

    // if not visited yet, increase distinct positions
    if (grid[positionY][positionX] !== "X") distinctPositions++;

    // set as visited
    grid[positionY][positionX] = "X";

    // move in direction
    positionY += dy;
    positionX += dx;

    // turn, if there is a wall
    if (grid[positionY][positionX] === "#") {
      positionY -= dy;
      positionX -= dx;
      currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
    }
  }

  return distinctPositions;
};

console.log(`The number of distinct positions is ${getDistinctPositions()}.`);
