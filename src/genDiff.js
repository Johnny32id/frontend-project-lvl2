const fs = require('fs');

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = fs.readFileSync(pathToFirstFile);
  const secondFile = fs.readFileSync(pathToSecondFile);
  const parseFirstFile = JSON.parse(firstFile);
  const parseSecondFile = JSON.parse(secondFile);
  const keysOfFirstFile = Object.keys(parseFirstFile);
  const keysOfSecondFile = Object.keys(parseSecondFile);
  const allKeys = [...keysOfFirstFile, ...keysOfSecondFile];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  let result = '{\n';
  for(let key of uniqueKeys) {
    const valueBefore = parseFirstFile[key];
    const valueAfter = parseSecondFile[key];
    if (keysOfFirstFile.includes(key) && keysOfSecondFile.includes(key)) {
        if (valueBefore === valueAfter) {
          result += `    ${key}: ${valueBefore}\n`;
        } else {
            result += `  - ${key}: ${valueBefore}\n`
            result += `  + ${key}: ${valueAfter}\n`
        };
    };
    if (keysOfFirstFile.includes(key) && !keysOfSecondFile.includes(key)) {
      result += `  - ${key}: ${valueBefore}\n`
    };
    if (!keysOfFirstFile.includes(key) && keysOfSecondFile.includes(key)) {
      result += `  + ${key}: ${valueAfter}\n`;
    }
  }
  return result += '\n}';
};
export default genDiff;
