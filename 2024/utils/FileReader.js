const fs = require("fs");

/**
 * Reads the content of a file located at the given path
 * @param {string} filePath Path to the file to read. Defaults to "./input.txt"
 * @returns {string} The content of the file
 */
const readFile = (filePath = "./input.txt") => {
  return fs.readFileSync(filePath, "utf-8");
};

class FileReader {
  fileContent = "";
  constructor(filePath = "./input.txt") {
    this.fileContent = readFile(filePath);
  }

  /**
   * Splits the file content into an array of lines, trimming any
   * whitespace from the ends of each line.
   * @returns {string[]} An array of lines from the file.
   */
  splitLines() {
    return this.fileContent.split("\n").map((line) => line.trim());
  }
  /**
   * Splits the file content into a 2D array of characters,
   * where each inner array is a line from the file.
   * @returns {string[][]} A 2D array of characters from the file.
   */
  asGrid() {
    return this.splitLines().map((line) => line.split(""));
  }
}

module.exports = FileReader;
