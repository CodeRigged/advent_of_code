const mainCardinalDirections = [
  { dx: 0, dy: -1 }, // north
  { dx: 1, dy: 0 }, // east
  { dx: 0, dy: 1 }, // south
  { dx: -1, dy: 0 }, // west
];

const allCardinalDirections = [
  { dx: 0, dy: -1 }, // north
  { dx: 1, dy: 0 }, // east
  { dx: 0, dy: 1 }, // south
  { dx: -1, dy: 0 }, // west
  { dx: -1, dy: -1 }, // northwest
  { dx: 1, dy: -1 }, // northeast
  { dx: -1, dy: 1 }, // southwest
  { dx: 1, dy: 1 }, // southeast
];

module.exports = { allCardinalDirections, mainCardinalDirections };
