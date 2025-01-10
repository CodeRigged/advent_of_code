const FileReader = require("../utils/FileReader");

/** Day 9 part 1 */
const computeFilesystemChecksum = (fileContent) => {
  const disk = [];
  let endBlock = [];

  const endIndex = fileContent.length - (fileContent.length % 2 === 0 ? 2 : 1);

  for (let i = 0, j = endIndex; i <= j; i++) {
    let size = fileContent[i];
    if (i % 2 === 0) {
      disk.push(...Array.from({ length: size }).fill(i / 2));
    } else {
      for (let space = 0; space < size; space++) {
        if (endBlock.length === 0) {
          endBlock.push(...Array.from({ length: fileContent[j] }).fill(j / 2));
          j -= 2;
        }
        disk.push(endBlock.pop());
      }
    }
  }

  // push the rest values, if there are any left
  disk.push(...endBlock);
  return disk.reduce(
    (checksum, block, curIndex) => checksum + block * curIndex,
    0
  );
};

/** Day 9 part 2 */
const computeFilesystemChecksumV2 = (fileContent) => {
  const fileSystem = fileContent.split("").map((curElement, index) => {
    const block = Array.from({ length: curElement });
    if (index % 2 === 0) {
      return block.fill(index / 2);
    }
    return block;
  });

  for (let i = 1; i < fileSystem.length - 1; i++) {
    const curElement = fileSystem[i];
    let indexOfUndefined = curElement.indexOf(undefined);
    if (indexOfUndefined === -1) continue;

    for (let j = fileSystem.length - 1; j > i; j--) {
      const spaceLeft = curElement.length - indexOfUndefined;
      if (spaceLeft === 0) break;

      const block = fileSystem[j];
      const blockLength = block.length;

      if (
        block.indexOf(undefined) !== -1 ||
        blockLength === 0 ||
        spaceLeft < blockLength
      )
        continue;

      curElement.splice(indexOfUndefined, blockLength, ...block);

      indexOfUndefined += blockLength;

      fileSystem.splice(j, 1, Array.from({ length: blockLength }));
    }
  }

  return fileSystem.flat().reduce((checksum, block, curIndex) => {
    if (isNaN(block)) return checksum;
    return checksum + block * curIndex;
  }, 0);
};

const fileContent = new FileReader().fileContent;
console.log(
  `The checksum for part 1 is ${computeFilesystemChecksum(fileContent)}.`
);
console.log(
  `The checksum for part 2 is ${computeFilesystemChecksumV2(fileContent)}.`
);
