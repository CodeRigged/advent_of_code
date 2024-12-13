const FileReader = require("../utils/FileReader");

const fileReader = new FileReader();
const lines = fileReader.asLines();

// this is for part 2
const invalidUpdates = [];

const { ruleSet, updates } = lines.reduce(
  ({ ruleSet, updates }, curLine) => {
    const isRule = curLine.indexOf("|") > -1;
    if (isRule) {
      const [before, after] = curLine.split("|").map(Number);
      const rule = ruleSet[before];
      if (rule) {
        ruleSet[before].push(after);
      } else {
        ruleSet[before] = [after];
      }
    } else {
      const update = curLine.split(",").map(Number);
      updates.push(update);
    }
    return { ruleSet, updates };
  },
  {
    ruleSet: {},
    updates: [],
  }
);

/** Day 5 part 1 */
const getSumOfMiddlePageCorrectUpdates = () => {
  const result = updates.reduce((sumOfUpdates, curUpdate) => {
    const middlePageValue = curUpdate[curUpdate.length >> 1];

    let valid = true;
    for (let i = 0; i < curUpdate.length - 1; i++) {
      const rule = ruleSet[curUpdate[i]];
      for (let j = 0; j < curUpdate.length; j++) {
        const number = curUpdate[j];
        if (rule.includes(number) && i > j) {
          valid = false;
          // this is for part 2
          invalidUpdates.push(curUpdate);
          break;
        }
      }
      if (!valid) break;
    }
    if (valid) sumOfUpdates += middlePageValue;

    return sumOfUpdates;
  }, 0);

  return result;
};

/** Day 5 part 2 */
const getSumOfMiddlePageIncorrectUpdates = () => {
  const result = invalidUpdates.reduce((sumOfUpdates, curUpdate) => {
    curUpdate.sort((a, b) => {
      const rule = ruleSet[a];
      return rule.indexOf(b);
    });
    const middlePageValue = curUpdate[curUpdate.length >> 1];
    sumOfUpdates += middlePageValue;
    return sumOfUpdates;
  }, 0);

  return result;
};

const sumOfCorrectUpdates = getSumOfMiddlePageCorrectUpdates();

console.log(
  `The sum of the middle pages correct updates is ${sumOfCorrectUpdates}.`
);

const sumOfIncorrectUpdates = getSumOfMiddlePageIncorrectUpdates();

console.log(
  `The sum of the middle pages incorrect (corrected) updates is ${sumOfIncorrectUpdates}.`
);
