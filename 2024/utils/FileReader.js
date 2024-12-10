const fs = require("fs");

const readFile = (filePath = "./input.txt") => {
  return fs.readFileSync(filePath, "utf-8");
};

class FileReader {
  fileContent = "";
  constructor(filePath = "./input.txt") {
    this.fileContent = readFile(filePath);
  }

  splitLines() {
    return this.fileContent.split("\n").map((line) => line.trim());
  }
  toGrid() {
    return this.splitLines().map((line) => line.split(""));
  }
}

module.exports = FileReader;
