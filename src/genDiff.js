import fs from 'fs';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = fs.readFileSync(pathToFirstFile);
  const secondFile = fs.readFileSync(pathToSecondFile);
  const parseFirstFile = JSON.parse(firstFile);
  const parseSecondFile = JSON.parse(secondFile);
  const keysOfFirstFile = Object.keys(parseFirstFile);
  const keysOfSecondFile = Object.keys(parseSecondFile);
  const allKeys = [...keysOfFirstFile, ...keysOfSecondFile];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const difference = uniqueKeys.reduce((acc, key) => {
    const valueBefore = parseFirstFile[key];
    const valueAfter = parseSecondFile[key];
    if (keysOfFirstFile.includes(key) && keysOfSecondFile.includes(key)) {
      if (valueBefore === valueAfter) {
        acc.push(`    ${key}: ${valueBefore}\n`);
      } else {
        acc.push(`  - ${key}: ${valueBefore}\n`);
        acc.push(`  + ${key}: ${valueAfter}\n`);
      }
    }
    if (keysOfFirstFile.includes(key) && !keysOfSecondFile.includes(key)) {
      acc.push(`  - ${key}: ${valueBefore}\n`);
    }
    if (!keysOfFirstFile.includes(key) && keysOfSecondFile.includes(key)) {
      acc.push(`  + ${key}: ${valueAfter}\n`);
    }
    return acc;
  }, []);
  const differenceToString = difference.join('');
  const result = (`{\n${differenceToString}}`);
  return result;
};
export default genDiff;
