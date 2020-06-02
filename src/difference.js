const difference = (firstFile, secondFile) => {
  const allKeys = [...Object.keys(firstFile), ...Object.keys(secondFile)];
  const uniqueKeys = allKeys.filter((item, index) => allKeys.indexOf(item) === index);
  const result = uniqueKeys.reduce((acc, key) => {
    const valueBefore = firstFile[key];
    const valueAfter = secondFile[key];
    if (valueBefore instanceof Object && valueAfter instanceof Object) {
      acc.push(`  ${key}:`, difference(valueBefore, valueAfter));
    }
    if (valueBefore !== undefined && valueAfter !== undefined) {
      if (valueBefore === valueAfter) {
        acc.push(`    ${key}: ${valueBefore}\n`);
      } else {
        acc.push(`  - ${key}: ${valueBefore}\n`);
        acc.push(`  + ${key}: ${valueAfter}\n`);
      }
    }
    if (valueBefore !== undefined && valueAfter === undefined) {
      acc.push(`  - ${key}: ${valueBefore}\n`);
    }
    if (valueBefore === undefined && valueAfter !== undefined) {
      acc.push(`  + ${key}: ${valueAfter}\n`);
    }
    return acc;
  }, []);
  return result;
};
export default difference;
