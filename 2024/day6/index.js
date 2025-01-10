const { allCardinalDirections } = require("../utils/constants");
const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const { grid, height, width } = fileReader.asGrid();

/** day 6 part 1 INCOMPLETE */
const getDistinctPositions = () => {
  let distinctPositions = 0;
  let positionY = grid.findIndex((row) => row.includes("^"));
  let positionX = grid[positionY].findIndex((col) => col === "^");
  let currentDirectionIndex = 0;

  while (!FileReader.isOutOfBounds(positionY, positionX, height, width)) {
    // current direction
    const { dx, dy } = allCardinalDirections[currentDirectionIndex];

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
      currentDirectionIndex =
        (currentDirectionIndex + 1) % allCardinalDirections.length;
    }
  }

  return distinctPositions;
};

console.log(`The number of distinct positions is ${getDistinctPositions()}.`);
