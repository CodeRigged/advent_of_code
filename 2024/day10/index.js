const { mainCardinalDirections } = require("../utils/constants");
const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const topographicMap = fileReader.asGrid();
const numRows = topographicMap.length;
const numCols = topographicMap[0].length;

const startOfTrail = 0;
const endOfTrail = 9;

const isOutOfBounds = (y, x) => x < 0 || y < 0 || y >= numRows || x >= numCols;

/** Day 10 */

const countTrails = (
  currentY,
  currentX,
  countDistinctTrails,
  visited = new Set()
) => {
  if (isOutOfBounds(currentY, currentX)) return 0;

  const currentHeight = Number(topographicMap[currentY][currentX]);

  // If the current position is already visited, skip it
  const positionKey = `${currentY},${currentX}`;
  const isVisited = visited.has(positionKey);
  const isEndOfTrail = currentHeight === endOfTrail;

  if (isVisited) return 0;
  // part 2
  if (countDistinctTrails && isEndOfTrail) return 1;
  // Mark the current position as visited
  visited.add(positionKey);

  // If we reach the end of the trail, count this as a valid trail
  if (isEndOfTrail) return 1;

  let trails = 0;

  // Explore all main cardinal directions
  for (const { dx, dy } of mainCardinalDirections) {
    const nextY = currentY + dy;
    const nextX = currentX + dx;

    // Check if the next position is within bounds and is a valid step
    if (!isOutOfBounds(nextY, nextX)) {
      const nextHeight = Number(topographicMap[nextY][nextX]);

      // Check if the next step follows the gradual uphill rule
      if (nextHeight === currentHeight + 1) {
        trails += countTrails(nextY, nextX, countDistinctTrails, visited);
      }
    }
  }

  // Backtrack: Remove the current position from visited
  visited.delete(positionKey);

  return trails;
};

const getSumOfTrailheads = (countDistinctTrails = false) => {
  let sumOfTrailheads = 0;
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      if (Number(topographicMap[y][x]) === startOfTrail) {
        const trailheadsFoundForTrail = countTrails(y, x, countDistinctTrails);
        sumOfTrailheads += trailheadsFoundForTrail;
      }
    }
  }

  return sumOfTrailheads;
};

const sumOfTrailheads = getSumOfTrailheads();
console.log(`The sum of trailheads is ${sumOfTrailheads}.`);

const sumOfDistinctTrailheads = getSumOfTrailheads(true);
console.log(`The sum of distinct trailheads is ${sumOfDistinctTrailheads}.`);
